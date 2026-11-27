# Observations — Q1 (Cinematic Reel Creator, Android, 16.9.0 build 2611231)

- **O-1** (closest case TC-078). The Cinematic Reel Creator credit pill reads 「--」 when the app was launched offline,
  and stays 「--」 after Wi-Fi comes back: also after leaving the page to the Launcher and opening it again, and 20 s
  later. Only a relaunch of the app (force-stop + launch, online) shows the balance again (「29801」). Not this feature's
  spec (credit pill is shared with the other AI tools); left for the user to decide whether to file.
  Evidence: screenshots/tc078-02-crc-offline.png, screenshots/o1-credit-dashes-online.png.
  Log (TC-078 window): at the offline launch every `CreditSystemManager` init call fails with `java.io.IOException`
  (getMemberAuthServerKey, getFeatureList, checkFeatureCredit…); no retry is logged when Wi-Fi returns, and the next
  online launch reads `totalRemain=29801`.
