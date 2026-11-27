# Toolbar entry points (PowerDirector Mobile)

Extracted by `scripts/entry-points.ts` from the product team's toolbar sheet, tab 「2026/11 Auto Reframe」 (the newest dated tab),
fetched 2026-11-26: https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit?gid=366131507#gid=366131507

Each toolbar is what the editor shows for the selection (none = Global; a main-track video, PIP video, main-track
photo, PIP photo, audio or text clip). **First layer** is the toolbar button; the items under it are the second
layer it opens. Texts in brackets are the sheet's own notes (platform, release: 「4/E IOS」, 「Android沒有」).
‹cell #rrggbb› marks a coloured cell: the sheet colours new items (yellow) and items that do not show in some
states (blue; see the toolbar notes). Kept verbatim; how a tool behaves from each place is for the rows to find.

## Global Toolbar

- **Edit** (no second layer)
- **Audio**: Music · AI Music Generator · Voice-Over · Sound FX · Extract Audio · Text to speech · HQ Denoise · Denoise · Speech Enhance · AI Voice Changer · Audio Ducking
- **Text**: Add Text · Auto Captions · Text to Speech
- **Overlay**: Photo · Video
- **Effects**: Mosaic & Blur · Adjust · Filter · Effects · Effect Overlay · Body effects · Highlight · Magnifier (Android沒有)
- **Sticker** (no second layer)
- **AI Magic**: Image to Video · Text to Video · AI Art · Text to Image · Text to Speech · AI Music Generator · Talking Avatar · Cinematic Reel Creator (7/E) · Video Edit by Chat  (8/M)
- **Aspect Ratio** (no second layer)
- **Audio Mixing** (no second layer)

Notes:
- Edit: iOS: 非台灣地區才會出現 Android: 維持常駐
- Audio: 當 playhead 指到 Video，Audio 顯示 11 項 當 playhead 指到 Photo，Audio 顯示 6 項 (藍色不顯示)
- Effects: Body effect 中的 tempo effect 會需要 play head 指到 master track 上 photo 辨識是否可以套用該 effect，若不行要跳 toast (見下方PM spec) https://www.figma.com/design/rY84Bq1dj9MHLmbosgUlnT/UX-Items-Spec?node-id=1657-2347&t=HGSG8zz82GQ6WeS3-4
- AI Magic: Text to Video 2/B 加入

## Video Toolbar

- **Split** (no second layer)
- **Quick Actions (4/E IOS)** (no second layer)
- **Volume**: Volume · Mute · Audio Mixing · Fade in · Fade out
- **Audio Tools**: Voice-Over · Extract Audio · Denoise · HQ Denoise · Speech Enhancer · AI Voice Changer · Audio Ducking · Beats Marker
- **AI Remove (4/E IOS)** (no second layer)
- **Speed**: Standard Speed · Speed Curve · Super Slow Motion
- **Auto Reframe (iOS 11/M; And 12/E)** ‹cell #ffff00› (no second layer)
- **Transform**: Crop&Rotate · Pan&Zoom · Fill · Fit · Flip · Transform Keyframe
- **Effects**: Filter · Effects · Effect Overlay · Body effects · Auto Mosaic · AI Anime Video · Video Edit by Chat  (8/M)
- **Adjust**: AI Color · Brightness · Contrast · Saturation · HSL (android only) · Hue · Temp · Tint · Sharpness
- **Opacity (Andorid 沒有)** (no second layer)
- **Background**: Add Background · Cutout (原Remove Background) · Replace Background (原Change Background) · Chroma Key
- **Transition** (no second layer)
- **Enhance**: Video Enhance · Fix Shake · AI Color · Video Upscaler
- **Tools**: Replace · Reverse · Freeze Frame · Auto Captions · Cutout
- **Duplicate** (no second layer)
- **Mask** (no second layer)
- **Portrait**: Face Smoother(Android沒有) · Skin Smoother (only Android) · Body Reshape(Android沒有) · Face Reshape(Android沒有) · Body Effects · People Background

## PIP Video Toolbar

- **Split** (no second layer)
- **Quick Actions (4/E IOS)** (no second layer)
- **Volume**: Volume · Mute · Audio Mixing · Fade in · Fade out
- **Audio Tools**: Voice-Over · Extract Audio · Denoise · HQ Denoise · Speech Enhancer · AI Voice Changer · Audio Ducking
- **AI Remove (4/E IOS)** (no second layer)
- **Speed**: Standard Speed · Speed Curve · Super Slow Motion
- **Auto Reframe (iOS 11/M; And 12/E)** ‹cell #ffff00› (no second layer)
- **Transform**: Crop&Rotate · Pan&Zoom · Fill · Fit · Flip · Transform Keyframe · Border & Shadow
- **Effects**: Filter · Effects · Effect Overlay · Body effects · Auto Mosaic · AI Anime Video · Video Edit by Chat  (7/E)
- **Motion** (no second layer)
- **Adjust** (no second layer)
- **Opacity** (no second layer)
- **Background**: Cutout (原Remove Background) · Chroma Key
- **Enhance**: Video Enhance · Fix Shake · AI Color · Video Upscaler
- **Tools**: Replace · Reverse · Freeze Frame · Auto Captions · Cutout · Motion Tracking
- **Duplicate** (no second layer)
- **Mask** (no second layer)
- **Blending**: Portrait>Body Effects>呈現 Body Effects/Tempo Effects/Background
- **Portrait**: Face Smoother · Skin Smoother (only Android) · Body Reshape · Face Reshape · Body Effects · People Background

Notes:
- Audio Tools: Beats Marker

## Photo Toolbar

- **Split** (no second layer)
- **Duration** (no second layer)
- **Transform**: Crop&Rotate · Pan&Zoom · Fill · Fit · Flip · Transform keyframe
- **Effects**: Mosaic · Filter · Effects · Effect Overlay · Body effects · Cinematic Reel Creator (7/E)
- **Adjust**: AI Color · Brightness · Contrast · Saturation · Hue · Temp · Tint · Sharpness
- **Opacity** (no second layer)
- **Background**: Add Background · Cutout (原Remove Background) · Replace Background (原Change Background) · Chroma Key
- **Enhance**: Photo Enhance · AI Color
- **Transition** (no second layer)
- **Tools**: Replace · Cutout · Text to Image
- **Duplicate** (no second layer)
- **Mask** (no second layer)
- **Portrait**: Face Smoother · Skin Smoother (only Android) · Body Reshape · Face Reshape · Body Effects · People Background · AI Style Transfer
- **(Promeo App only for free user) Templates** (no second layer)

Notes:
- Effects: (iOS) Body effect 中的 tempo effects 不顯示 (Android) Body effect 中的 tempo effect 會需要 play head 指到 master track 上 photo 辨識是否可以套用該 effect，若不行要跳 toast (見下方PM spec) https://www.figma.com/design/rY84Bq1dj9MHLmbosgUlnT/UX-Items-Spec?node-id=1657-2347&t=HGSG8zz82GQ6WeS3-4

## PIP Photo Toolbar

- **Split** (no second layer)
- **Duration** (no second layer)
- **Transform**: Crop&Rotate · Pan&Zoom · Fill · Fit · Flip · Transform keyframe · Border shadow
- **Effects**: Mosaic · Filter · Effects · Effect Overlay · Body effects · Cinematic Reel Creator (7/E)
- **Motion** (no second layer)
- **Adjust**: AI Color · Brightness · Contrast · Saturation · Hue · Temp · Tint · Sharpness
- **Opacity** (no second layer)
- **Background**: Cutout (原Remove Background) · Chroma Key
- **Enhance**: Photo Enhance · AI Color
- **Tools**: Replace · Cutout · AI Text to Image · Motion Tracking
- **Duplicate** (no second layer)
- **Mask** (no second layer)
- **Blending** (no second layer)
- **Portrait**: Face Smoother · Skin Smoother (only Android) · Body Reshape · Face Reshape · Body Effects · People Background · AI Style Transfer
- **(Promeo App only for free user) Templates** (no second layer)

Notes:
- Effects: (iOS) Body effect 中的 tempo effects 不顯示 (Android) Body effect 中的 tempo effect 會需要 play head 指到 master track 上 photo 辨識是否可以套用該 effect，若不行要跳 toast (見下方PM spec) https://www.figma.com/design/rY84Bq1dj9MHLmbosgUlnT/UX-Items-Spec?node-id=1657-2347&t=HGSG8zz82GQ6WeS3-4

## Audio Toolbar

- **Split** (no second layer)
- **Volume**: Volume · Mute · Audio Mixing · Fade in · Fade out
- **Audio Tools**: Denoise · HQ Denoise · Speech Enhancer · AI Voice Changer · Voice-Over
- **Audio Mixing** (no second layer)
- **Speed**: Keep Pitch
- **Duplicate** (no second layer)
- **Beats Marker** (no second layer)
- **Auto Captions** (no second layer)
- **Talking Avatar** (no second layer)
- **Audio Ducking** (no second layer)
- **Range** (no second layer)
- **Replace** (no second layer)

## Text Toolbar

- **Edit Text** (no second layer)
- **Add Text** (no second layer)
- **Split** (no second layer)
- **Duplicate** (no second layer)
- **Animation** (no second layer)
- **Template** (no second layer)
- **Style** (no second layer)
- **Font** (no second layer)
- **Text to Speech** (no second layer)
- **Motion Tracking** (no second layer)
- **Backdrop** (no second layer)
- **Blending** (no second layer)
- **Mask (Android 沒有)** (no second layer)
- **Transform Keyframe** (no second layer)

## Where each tool appears

Tools reached from more than one place are listed first.

- **Add Background** (2): Video Toolbar › Background › Add Background · Photo Toolbar › Background › Add Background
- **Add Text** (2): Global Toolbar › Text › Add Text · Text Toolbar › Add Text (first layer)
- **Adjust** (5): Global Toolbar › Effects › Adjust · Video Toolbar › Adjust (first layer) · PIP Video Toolbar › Adjust (first layer) · Photo Toolbar › Adjust (first layer) · PIP Photo Toolbar › Adjust (first layer)
- **AI Anime Video** (2): Video Toolbar › Effects › AI Anime Video · PIP Video Toolbar › Effects › AI Anime Video
- **AI Color** (7): Video Toolbar › Adjust › AI Color · Video Toolbar › Enhance › AI Color · PIP Video Toolbar › Enhance › AI Color · Photo Toolbar › Adjust › AI Color · Photo Toolbar › Enhance › AI Color · PIP Photo Toolbar › Adjust › AI Color · PIP Photo Toolbar › Enhance › AI Color
- **AI Music Generator** (2): Global Toolbar › Audio › AI Music Generator · Global Toolbar › AI Magic › AI Music Generator
- **AI Remove** (2): Video Toolbar › AI Remove (4/E IOS) (first layer) · PIP Video Toolbar › AI Remove (4/E IOS) (first layer)
- **AI Style Transfer** (2): Photo Toolbar › Portrait › AI Style Transfer · PIP Photo Toolbar › Portrait › AI Style Transfer
- **AI Voice Changer** (4): Global Toolbar › Audio › AI Voice Changer · Video Toolbar › Audio Tools › AI Voice Changer · PIP Video Toolbar › Audio Tools › AI Voice Changer · Audio Toolbar › Audio Tools › AI Voice Changer
- **Audio Ducking** (4): Global Toolbar › Audio › Audio Ducking · Video Toolbar › Audio Tools › Audio Ducking · PIP Video Toolbar › Audio Tools › Audio Ducking · Audio Toolbar › Audio Ducking (first layer)
- **Audio Mixing** (5): Global Toolbar › Audio Mixing (first layer) · Video Toolbar › Volume › Audio Mixing · PIP Video Toolbar › Volume › Audio Mixing · Audio Toolbar › Volume › Audio Mixing · Audio Toolbar › Audio Mixing (first layer)
- **Audio Tools** (3): Video Toolbar › Audio Tools (first layer) · PIP Video Toolbar › Audio Tools (first layer) · Audio Toolbar › Audio Tools (first layer)
- **Auto Captions** (4): Global Toolbar › Text › Auto Captions · Video Toolbar › Tools › Auto Captions · PIP Video Toolbar › Tools › Auto Captions · Audio Toolbar › Auto Captions (first layer)
- **Auto Mosaic** (2): Video Toolbar › Effects › Auto Mosaic · PIP Video Toolbar › Effects › Auto Mosaic
- **Auto Reframe** (2): Video Toolbar › Auto Reframe (iOS 11/M; And 12/E) (first layer) · PIP Video Toolbar › Auto Reframe (iOS 11/M; And 12/E) (first layer)
- **Background** (4): Video Toolbar › Background (first layer) · PIP Video Toolbar › Background (first layer) · Photo Toolbar › Background (first layer) · PIP Photo Toolbar › Background (first layer)
- **Beats Marker** (2): Video Toolbar › Audio Tools › Beats Marker · Audio Toolbar › Beats Marker (first layer)
- **Blending** (3): PIP Video Toolbar › Blending (first layer) · PIP Photo Toolbar › Blending (first layer) · Text Toolbar › Blending (first layer)
- **Body effects** (9): Global Toolbar › Effects › Body effects · Video Toolbar › Effects › Body effects · Video Toolbar › Portrait › Body Effects · PIP Video Toolbar › Effects › Body effects · PIP Video Toolbar › Portrait › Body Effects · Photo Toolbar › Effects › Body effects · Photo Toolbar › Portrait › Body Effects · PIP Photo Toolbar › Effects › Body effects · PIP Photo Toolbar › Portrait › Body Effects
- **Body Reshape** (4): Video Toolbar › Portrait › Body Reshape(Android沒有) · PIP Video Toolbar › Portrait › Body Reshape · Photo Toolbar › Portrait › Body Reshape · PIP Photo Toolbar › Portrait › Body Reshape
- **Brightness** (3): Video Toolbar › Adjust › Brightness · Photo Toolbar › Adjust › Brightness · PIP Photo Toolbar › Adjust › Brightness
- **Chroma Key** (4): Video Toolbar › Background › Chroma Key · PIP Video Toolbar › Background › Chroma Key · Photo Toolbar › Background › Chroma Key · PIP Photo Toolbar › Background › Chroma Key
- **Cinematic Reel Creator** (3): Global Toolbar › AI Magic › Cinematic Reel Creator (7/E) · Photo Toolbar › Effects › Cinematic Reel Creator (7/E) · PIP Photo Toolbar › Effects › Cinematic Reel Creator (7/E)
- **Contrast** (3): Video Toolbar › Adjust › Contrast · Photo Toolbar › Adjust › Contrast · PIP Photo Toolbar › Adjust › Contrast
- **Crop&Rotate** (4): Video Toolbar › Transform › Crop&Rotate · PIP Video Toolbar › Transform › Crop&Rotate · Photo Toolbar › Transform › Crop&Rotate · PIP Photo Toolbar › Transform › Crop&Rotate
- **Cutout** (8): Video Toolbar › Background › Cutout (原Remove Background) · Video Toolbar › Tools › Cutout · PIP Video Toolbar › Background › Cutout (原Remove Background) · PIP Video Toolbar › Tools › Cutout · Photo Toolbar › Background › Cutout (原Remove Background) · Photo Toolbar › Tools › Cutout · PIP Photo Toolbar › Background › Cutout (原Remove Background) · PIP Photo Toolbar › Tools › Cutout
- **Denoise** (4): Global Toolbar › Audio › Denoise · Video Toolbar › Audio Tools › Denoise · PIP Video Toolbar › Audio Tools › Denoise · Audio Toolbar › Audio Tools › Denoise
- **Duplicate** (6): Video Toolbar › Duplicate (first layer) · PIP Video Toolbar › Duplicate (first layer) · Photo Toolbar › Duplicate (first layer) · PIP Photo Toolbar › Duplicate (first layer) · Audio Toolbar › Duplicate (first layer) · Text Toolbar › Duplicate (first layer)
- **Duration** (2): Photo Toolbar › Duration (first layer) · PIP Photo Toolbar › Duration (first layer)
- **Effect Overlay** (5): Global Toolbar › Effects › Effect Overlay · Video Toolbar › Effects › Effect Overlay · PIP Video Toolbar › Effects › Effect Overlay · Photo Toolbar › Effects › Effect Overlay · PIP Photo Toolbar › Effects › Effect Overlay
- **Effects** (10): Global Toolbar › Effects (first layer) · Global Toolbar › Effects › Effects · Video Toolbar › Effects (first layer) · Video Toolbar › Effects › Effects · PIP Video Toolbar › Effects (first layer) · PIP Video Toolbar › Effects › Effects · Photo Toolbar › Effects (first layer) · Photo Toolbar › Effects › Effects · PIP Photo Toolbar › Effects (first layer) · PIP Photo Toolbar › Effects › Effects
- **Enhance** (4): Video Toolbar › Enhance (first layer) · PIP Video Toolbar › Enhance (first layer) · Photo Toolbar › Enhance (first layer) · PIP Photo Toolbar › Enhance (first layer)
- **Extract Audio** (3): Global Toolbar › Audio › Extract Audio · Video Toolbar › Audio Tools › Extract Audio · PIP Video Toolbar › Audio Tools › Extract Audio
- **Face Reshape** (4): Video Toolbar › Portrait › Face Reshape(Android沒有) · PIP Video Toolbar › Portrait › Face Reshape · Photo Toolbar › Portrait › Face Reshape · PIP Photo Toolbar › Portrait › Face Reshape
- **Face Smoother** (4): Video Toolbar › Portrait › Face Smoother(Android沒有) · PIP Video Toolbar › Portrait › Face Smoother · Photo Toolbar › Portrait › Face Smoother · PIP Photo Toolbar › Portrait › Face Smoother
- **Fade in** (3): Video Toolbar › Volume › Fade in · PIP Video Toolbar › Volume › Fade in · Audio Toolbar › Volume › Fade in
- **Fade out** (3): Video Toolbar › Volume › Fade out · PIP Video Toolbar › Volume › Fade out · Audio Toolbar › Volume › Fade out
- **Fill** (4): Video Toolbar › Transform › Fill · PIP Video Toolbar › Transform › Fill · Photo Toolbar › Transform › Fill · PIP Photo Toolbar › Transform › Fill
- **Filter** (5): Global Toolbar › Effects › Filter · Video Toolbar › Effects › Filter · PIP Video Toolbar › Effects › Filter · Photo Toolbar › Effects › Filter · PIP Photo Toolbar › Effects › Filter
- **Fit** (4): Video Toolbar › Transform › Fit · PIP Video Toolbar › Transform › Fit · Photo Toolbar › Transform › Fit · PIP Photo Toolbar › Transform › Fit
- **Fix Shake** (2): Video Toolbar › Enhance › Fix Shake · PIP Video Toolbar › Enhance › Fix Shake
- **Flip** (4): Video Toolbar › Transform › Flip · PIP Video Toolbar › Transform › Flip · Photo Toolbar › Transform › Flip · PIP Photo Toolbar › Transform › Flip
- **Freeze Frame** (2): Video Toolbar › Tools › Freeze Frame · PIP Video Toolbar › Tools › Freeze Frame
- **HQ Denoise** (4): Global Toolbar › Audio › HQ Denoise · Video Toolbar › Audio Tools › HQ Denoise · PIP Video Toolbar › Audio Tools › HQ Denoise · Audio Toolbar › Audio Tools › HQ Denoise
- **Hue** (3): Video Toolbar › Adjust › Hue · Photo Toolbar › Adjust › Hue · PIP Photo Toolbar › Adjust › Hue
- **Mask** (5): Video Toolbar › Mask (first layer) · PIP Video Toolbar › Mask (first layer) · Photo Toolbar › Mask (first layer) · PIP Photo Toolbar › Mask (first layer) · Text Toolbar › Mask (Android 沒有) (first layer)
- **Mosaic** (2): Photo Toolbar › Effects › Mosaic · PIP Photo Toolbar › Effects › Mosaic
- **Motion** (2): PIP Video Toolbar › Motion (first layer) · PIP Photo Toolbar › Motion (first layer)
- **Motion Tracking** (3): PIP Video Toolbar › Tools › Motion Tracking · PIP Photo Toolbar › Tools › Motion Tracking · Text Toolbar › Motion Tracking (first layer)
- **Mute** (3): Video Toolbar › Volume › Mute · PIP Video Toolbar › Volume › Mute · Audio Toolbar › Volume › Mute
- **Opacity** (4): Video Toolbar › Opacity (Andorid 沒有) (first layer) · PIP Video Toolbar › Opacity (first layer) · Photo Toolbar › Opacity (first layer) · PIP Photo Toolbar › Opacity (first layer)
- **Pan&Zoom** (4): Video Toolbar › Transform › Pan&Zoom · PIP Video Toolbar › Transform › Pan&Zoom · Photo Toolbar › Transform › Pan&Zoom · PIP Photo Toolbar › Transform › Pan&Zoom
- **People Background** (4): Video Toolbar › Portrait › People Background · PIP Video Toolbar › Portrait › People Background · Photo Toolbar › Portrait › People Background · PIP Photo Toolbar › Portrait › People Background
- **Photo Enhance** (2): Photo Toolbar › Enhance › Photo Enhance · PIP Photo Toolbar › Enhance › Photo Enhance
- **Portrait** (4): Video Toolbar › Portrait (first layer) · PIP Video Toolbar › Portrait (first layer) · Photo Toolbar › Portrait (first layer) · PIP Photo Toolbar › Portrait (first layer)
- **Quick Actions** (2): Video Toolbar › Quick Actions (4/E IOS) (first layer) · PIP Video Toolbar › Quick Actions (4/E IOS) (first layer)
- **Replace** (5): Video Toolbar › Tools › Replace · PIP Video Toolbar › Tools › Replace · Photo Toolbar › Tools › Replace · PIP Photo Toolbar › Tools › Replace · Audio Toolbar › Replace (first layer)
- **Replace Background** (2): Video Toolbar › Background › Replace Background (原Change Background) · Photo Toolbar › Background › Replace Background (原Change Background)
- **Reverse** (2): Video Toolbar › Tools › Reverse · PIP Video Toolbar › Tools › Reverse
- **Saturation** (3): Video Toolbar › Adjust › Saturation · Photo Toolbar › Adjust › Saturation · PIP Photo Toolbar › Adjust › Saturation
- **Sharpness** (3): Video Toolbar › Adjust › Sharpness · Photo Toolbar › Adjust › Sharpness · PIP Photo Toolbar › Adjust › Sharpness
- **Skin Smoother** (4): Video Toolbar › Portrait › Skin Smoother (only Android) · PIP Video Toolbar › Portrait › Skin Smoother (only Android) · Photo Toolbar › Portrait › Skin Smoother (only Android) · PIP Photo Toolbar › Portrait › Skin Smoother (only Android)
- **Speech Enhancer** (3): Video Toolbar › Audio Tools › Speech Enhancer · PIP Video Toolbar › Audio Tools › Speech Enhancer · Audio Toolbar › Audio Tools › Speech Enhancer
- **Speed** (3): Video Toolbar › Speed (first layer) · PIP Video Toolbar › Speed (first layer) · Audio Toolbar › Speed (first layer)
- **Speed Curve** (2): Video Toolbar › Speed › Speed Curve · PIP Video Toolbar › Speed › Speed Curve
- **Split** (6): Video Toolbar › Split (first layer) · PIP Video Toolbar › Split (first layer) · Photo Toolbar › Split (first layer) · PIP Photo Toolbar › Split (first layer) · Audio Toolbar › Split (first layer) · Text Toolbar › Split (first layer)
- **Standard Speed** (2): Video Toolbar › Speed › Standard Speed · PIP Video Toolbar › Speed › Standard Speed
- **Super Slow Motion** (2): Video Toolbar › Speed › Super Slow Motion · PIP Video Toolbar › Speed › Super Slow Motion
- **Talking Avatar** (2): Global Toolbar › AI Magic › Talking Avatar · Audio Toolbar › Talking Avatar (first layer)
- **Temp** (3): Video Toolbar › Adjust › Temp · Photo Toolbar › Adjust › Temp · PIP Photo Toolbar › Adjust › Temp
- **Templates** (2): Photo Toolbar › (Promeo App only for free user) Templates (first layer) · PIP Photo Toolbar › (Promeo App only for free user) Templates (first layer)
- **Text to Image** (2): Global Toolbar › AI Magic › Text to Image · Photo Toolbar › Tools › Text to Image
- **Text to speech** (4): Global Toolbar › Audio › Text to speech · Global Toolbar › Text › Text to Speech · Global Toolbar › AI Magic › Text to Speech · Text Toolbar › Text to Speech (first layer)
- **Tint** (3): Video Toolbar › Adjust › Tint · Photo Toolbar › Adjust › Tint · PIP Photo Toolbar › Adjust › Tint
- **Tools** (4): Video Toolbar › Tools (first layer) · PIP Video Toolbar › Tools (first layer) · Photo Toolbar › Tools (first layer) · PIP Photo Toolbar › Tools (first layer)
- **Transform** (4): Video Toolbar › Transform (first layer) · PIP Video Toolbar › Transform (first layer) · Photo Toolbar › Transform (first layer) · PIP Photo Toolbar › Transform (first layer)
- **Transform Keyframe** (5): Video Toolbar › Transform › Transform Keyframe · PIP Video Toolbar › Transform › Transform Keyframe · Photo Toolbar › Transform › Transform keyframe · PIP Photo Toolbar › Transform › Transform keyframe · Text Toolbar › Transform Keyframe (first layer)
- **Transition** (2): Video Toolbar › Transition (first layer) · Photo Toolbar › Transition (first layer)
- **Video Edit by Chat** (3): Global Toolbar › AI Magic › Video Edit by Chat  (8/M) · Video Toolbar › Effects › Video Edit by Chat  (8/M) · PIP Video Toolbar › Effects › Video Edit by Chat  (7/E)
- **Video Enhance** (2): Video Toolbar › Enhance › Video Enhance · PIP Video Toolbar › Enhance › Video Enhance
- **Video Upscaler** (2): Video Toolbar › Enhance › Video Upscaler · PIP Video Toolbar › Enhance › Video Upscaler
- **Voice-Over** (4): Global Toolbar › Audio › Voice-Over · Video Toolbar › Audio Tools › Voice-Over · PIP Video Toolbar › Audio Tools › Voice-Over · Audio Toolbar › Audio Tools › Voice-Over
- **Volume** (6): Video Toolbar › Volume (first layer) · Video Toolbar › Volume › Volume · PIP Video Toolbar › Volume (first layer) · PIP Video Toolbar › Volume › Volume · Audio Toolbar › Volume (first layer) · Audio Toolbar › Volume › Volume
- **AI Art** (1): Global Toolbar › AI Magic › AI Art
- **AI Magic** (1): Global Toolbar › AI Magic (first layer)
- **AI Text to Image** (1): PIP Photo Toolbar › Tools › AI Text to Image
- **Animation** (1): Text Toolbar › Animation (first layer)
- **Aspect Ratio** (1): Global Toolbar › Aspect Ratio (first layer)
- **Audio** (1): Global Toolbar › Audio (first layer)
- **Backdrop** (1): Text Toolbar › Backdrop (first layer)
- **Border & Shadow** (1): PIP Video Toolbar › Transform › Border & Shadow
- **Border shadow** (1): PIP Photo Toolbar › Transform › Border shadow
- **Edit** (1): Global Toolbar › Edit (first layer)
- **Edit Text** (1): Text Toolbar › Edit Text (first layer)
- **Font** (1): Text Toolbar › Font (first layer)
- **Highlight** (1): Global Toolbar › Effects › Highlight
- **HSL** (1): Video Toolbar › Adjust › HSL (android only)
- **Image to Video** (1): Global Toolbar › AI Magic › Image to Video
- **Keep Pitch** (1): Audio Toolbar › Speed › Keep Pitch
- **Magnifier** (1): Global Toolbar › Effects › Magnifier (Android沒有)
- **Mosaic & Blur** (1): Global Toolbar › Effects › Mosaic & Blur
- **Music** (1): Global Toolbar › Audio › Music
- **Overlay** (1): Global Toolbar › Overlay (first layer)
- **Photo** (1): Global Toolbar › Overlay › Photo
- **Portrait>Body Effects>呈現 Body Effects/Tempo Effects/Background** (1): PIP Video Toolbar › Blending › Portrait>Body Effects>呈現 Body Effects/Tempo Effects/Background
- **Range** (1): Audio Toolbar › Range (first layer)
- **Sound FX** (1): Global Toolbar › Audio › Sound FX
- **Speech Enhance** (1): Global Toolbar › Audio › Speech Enhance
- **Sticker** (1): Global Toolbar › Sticker (first layer)
- **Style** (1): Text Toolbar › Style (first layer)
- **Template** (1): Text Toolbar › Template (first layer)
- **Text** (1): Global Toolbar › Text (first layer)
- **Text to Video** (1): Global Toolbar › AI Magic › Text to Video
- **Video** (1): Global Toolbar › Overlay › Video
