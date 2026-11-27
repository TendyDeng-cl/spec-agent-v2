# Update plan — pdr/cinematic-reel-recommendation / android: approved v1 → draft 20261125-115636

REQ-006: make sure everything TR261019-014 and TR260923-022 list is tested, reading every tab of the sheets they link.
Rows are built by `build-draft.ts` from the sheets saved in `specs/2026-11-25/extracted/` (rebuild: `node build-draft.ts`).

## Spec files
- Unchanged: specs/2026-11-23 (Jira PDRA-661, Design 107:2283, Cinestory CMS › Recommendation).
- New: specs/2026-11-25. Both TRs' text and rulings, plus every tab of both sheets:
  - **I2V Recommendation** (TR261019-014), 7 tabs: Temp_QA, Recommend/Avoid_Final, Recommendation_Page (CMS), Template, FAQ, samples, Localization.
  - **Cinestory CMS** (both TRs), 9 tabs: CMS columns, Order, Template Name Localization, Template Description Localization, Template Style id, CMS Data, Thumbnail Size, action id, Recommendation.

## What each TR lists, and where it is tested

| TR item | Sheet › tab | Rows |
|---|---|---|
| TR261019-014 Add New Recommendation #54–67 (14 Cinestory items, incl. #67 People in Frame for Horror Movie) | I2V › Recommendation_Page (CMS) | TC-001 – TC-006 (each template's items, English; all 14 already matched in R1) |
| TR261019-014 Thumbnail | Cinestory › Recommendation › Pic Link | **TC-022 (new)**, TC-009 |
| TR261019-014 Localization | I2V › Localization (14 items × 28 languages) | **TC-017, TC-018 (modified), 25 new tips rows** |
| TR260923-022 Add Recommendation (Cinestory template + recommendation info) | Cinestory › Recommendation, Order, Template Name / Description Localization | TC-001 – TC-006, **28 new card rows** |

## Requirement changes

| Requirement | Change | Before | After |
|---|---|---|---|
| R-012 | source added | Cinestory CMS › Recommendation | + I2V › Recommendation_Page (CMS) #54–67 |
| R-013 | clarified | Fast Cut has its own picture | + item #56; its caption is 「Rich Visual Details」 (your ruling) |
| R-015 | widened | name follows ENU/CHT/JPN | name follows the app language in all 28 languages |
| R-029 | new | — | card order by app language: 繁中/简中/日本語/한국어 swap Time Lapse and Handheld Camera (your ruling) |
| R-030 | new | — | card names per language (Template Name Localization) |
| R-031 | new | — | card descriptions per language (Template Description Localization rows 2–7; rows 17–21 are greyed out, old) |
| R-032 | new | — | every caption per language (I2V › Localization) |
| R-033 | new, not testable | — | CMS item records (GUID, version, category) are server data |
| R-034 | new | — | each picture matches the sheet's Pic Link picture |
| Q-2 | partly answered | are captions translated? | captions and names: yes (sheets); chip and sentence: still open (DRA262611P0290) |

## Case changes
- New (54):
  - TC-022 (R-034, R-013): English; open all six templates and compare each picture with the sheet's.
  - 28 card rows (R-029 – R-031), one per language with English first: card order, then each card's name and description.
  - 25 tips rows (R-015, R-032, R-012), one per language except English, 繁中 and 日本語: all six sheets, the template name in the sentence and the five captions.
- Modified (2):
  - TC-017 (繁體中文) and TC-018 (日本語) now read all six templates' captions word for word instead of Micro Cinema only.
- Removed: 0
- Unchanged: 19

Placement: the Language section is ordered by language, each language's card row and then its tips row, so a run switches
language once per pair. TC-022 follows TC-009 (pictures).

## Found by the analysis
- R1 already matched: the English items for all six templates; Micro Cinema's 繁中 and 日本語 captions (both equal the Localization tab); the English card order (Global).
- The CMS Data tab still has the old English description for Micro Cinema. The Description tab's current row and the app's 繁中 text both differ from it, so the Description tab is followed.

## Not added (value check)
- Template previews, sample photos, model, ratio, duration and action IDs: out of these TRs (your ruling: card text only).
- I2V tabs Temp_QA, Recommend/Avoid_Final (outside its CineStory block), Template, FAQ and samples: Image to Video templates, not this feature.
- iOS: both TRs are PDRA (Android). The iOS table can take the same rows on request.

## Run cost
- 28 language switches, about 2 rows each, reading text only. No credits are used.
- If a language is missing from the app's language list, its two rows are recorded Blocked (test-data).

## Questions for PM
- Q-2 (unchanged in part): are the chip and the sheet's first sentence translated? No sheet gives them in other languages.
