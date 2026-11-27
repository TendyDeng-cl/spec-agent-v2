D="node scripts/device-android.ts $R"
for i in 1 2 3 4 5 6 7 8; do f=$(adb -s RFCW2198L7B shell dumpsys window | grep mCurrentFocus); case "$f" in *LauncherActivity*) echo home; exit 0;; esac
  if $D els | grep -q "right_button"; then $D id right_button >/dev/null; else $D back >/dev/null; fi; sleep 2; done; echo "not home: $f"
