# OCR images with the Windows built-in OCR (Windows.Media.Ocr), the Windows twin of ocr-images.swift / ocr-tiles.swift
# (user, 2026-11-25: the casebook runs on Windows too). Called by scripts/lib/ocr.ts, not by hand.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/ocr-windows.ps1 <job.json> <out.json>
#   job.json: { "paths": ["<image>", ...], "langs": ["zh-Hant-TW", "en-US", "ja"] }
#   out.json: { "<image>": { w, h, results: [{ lang, lines: [{ words: [{ text, x, y, w, h }] }] }] } } (pixels, top-left
#   origin); an image that cannot be read maps to null. Words are returned, not line text: the Chinese and Japanese
#   engines put a space between every character, so lib/ocr.ts joins the words itself.
param([string]$Job, [string]$Out)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime]
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
function Await($op, [Type]$type) { $t = $asTask.MakeGenericMethod($type).Invoke($null, @($op)); $t.Wait(-1) | Out-Null; $t.Result }

$spec = Get-Content -Raw -Encoding UTF8 $Job | ConvertFrom-Json
$engines = @()
foreach ($tag in $spec.langs) {
  $lang = New-Object Windows.Globalization.Language $tag
  if ([Windows.Media.Ocr.OcrEngine]::IsLanguageSupported($lang)) { $engines += @{ tag = $tag; engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang) } }
}
if (-not $engines.Count) { Write-Error 'No OCR language installed for the requested languages'; exit 3 }
$max = [Windows.Media.Ocr.OcrEngine]::MaxImageDimension
$result = @{}
foreach ($p in $spec.paths) {
  try {
    $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Resolve-Path $p).Path)) ([Windows.Storage.StorageFile])
    $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $W = [int]$decoder.PixelWidth; $H = [int]$decoder.PixelHeight
    if ($W -gt $max -or $H -gt $max) { $result[$p] = @{ w = $W; h = $H; error = "larger than $max px"; results = @() }; $stream.Dispose(); continue }
    $bmp = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $res = @()
    foreach ($e in $engines) {
      $ocr = Await ($e.engine.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
      $lines = @(foreach ($l in $ocr.Lines) { @{ words = @(foreach ($wd in $l.Words) { $r = $wd.BoundingRect; @{ text = $wd.Text; x = $r.X; y = $r.Y; w = $r.Width; h = $r.Height } }) } })
      $res += @{ lang = $e.tag; lines = $lines }
    }
    $result[$p] = @{ w = $W; h = $H; results = $res }
    $stream.Dispose()
  } catch { $result[$p] = $null; [Console]::Error.WriteLine("$p : $($_.Exception.Message)") }
}
[System.IO.File]::WriteAllText($Out, ($result | ConvertTo-Json -Depth 8 -Compress), (New-Object System.Text.UTF8Encoding $false))
