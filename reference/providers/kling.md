---
description: "Kling AI models on Picsart — 13 audio/image/video model(s) including Kling T2A, Kling V2A, Kling 3.0 Image. CLI + MCP examples, parameters, and official docs."
---

# Kling

**Modes:** video · image · audio · **Models:** 13

**Vendor:** [Kling (Kuaishou)](https://klingai.com/global/dev) · **Official API docs:** [Kling API](https://app.klingai.com/global/dev/document-api/quickStart/productIntroduction/overview)

Kling (by Kuaishou) is a video-first model family with text-to-video, image-to-video, start/end-frame control, motion control, talking avatars, and native audio. **Kling V3** is the flagship: the only version with multi-shot storyboards and native 4K (3–15s). The lineup also spans image generation and a TTS / video-to-audio side.

## Models

| id | Name | Input type |
|---|---|---|
| `kling-v3` | Kling V3 | `t2v` |
| `kling-v3-omni` | Kling V3 Omni | `t2v` |
| `kling-v2-6` | Kling V2.6 | `t2v` |
| `kling-video-o1` | Kling Video O1 | `t2v` |
| `kling-video-effects` | Kling Video Effects | `i2v` |
| `kling-motion-control-v3` | Kling Motion Control V3 | `i2v` |
| `kling-motion-control` | Kling Motion Control 2.6 | `i2v` |
| `kling-avatar` | Kling Avatar | `i2v` |
| `kling-3.0-image` | Kling 3.0 Image | `t2i` |
| `kling-o1-image` | Kling O1 Image | `t2i` |
| `kling-v2-new-image` | Kling V2 New Image | `t2i` |
| `kling-t2a` | Kling T2A | `t2a` |
| `kling-v2a` | Kling V2A | `v2a` |

## CLI

```bash
# text-to-video with native audio
gen-ai generate -m kling-v3 \
  -p "a designer opening Picsart on a sunlit desk, cinematic, shallow depth of field" \
  --ar 16:9 -d 5 --audio-gen

# image-to-video from a start frame
gen-ai generate -m kling-v3 -p "camera slowly pushes in, she smiles" --start-frame ./hero.jpg

# image generation
gen-ai generate -m kling-3.0-image -p "a neon koi pond at dusk, ultra detailed" --ar 1:1

# text-to-audio
gen-ai generate -m kling-t2a -p "warm narrator voice reading a product tagline"
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "kling-v3",
    "prompt": "a designer opening Picsart on a sunlit desk, cinematic",
    "aspectRatio": "16:9",
    "duration": 5,
    "generateAudio": true
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "kling-3.0-image",
    "prompt": "a neon koi pond at dusk, ultra detailed",
    "aspectRatio": "1:1"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `kling-video-o1` — Kling Video O1

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` (default `16:9`) |
| `duration` | `-d` | enum | `5` · `10` (default `5`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `renderingSpeed` | `--speed` | enum | `std` (Standard) · `pro` (Pro) (default `std`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |

### `kling-video-effects` — Kling Video Effects

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `style` | `--style` | enum | `korean_baseball` (Korean Baseball) · `pet_skateboard` (Pet Skateboard) · `daily_ootd` (Daily Ootd) · `tiny_beast_printer` (Tiny Beast Printer) · `landmark_reveal` (Landmark Reveal) · `winter_charm` (Winter Charm) · `flash_ride` (Flash Ride) · `maestro_of_magic` (Maestro Of Magic) · `magic_carpet_ride` (Magic Carpet Ride) · `good_luck_spirit` (Good Luck Spirit) · `shooting_star` (Shooting Star) · `sparkler_wand` (Sparkler Wand) · `sovereign_scepter` (Sovereign Scepter) · `dirt_rush` (Dirt Rush) · `return_of_the_king` (Return Of The King) · `dance_with_dragon` (Dance With Dragon) · `minimalist_light` (Minimalist Light) · `martial_meow` (Martial Meow) · `sassy_shake` (Sassy Shake) · `knock_at_a_door_revenge` (Knock At A Door Revenge) · `palm_sized_figure_pro` (Palm Sized Figure Pro) · `prank_box` (Prank Box) · `perler_beads` (Perler Beads) · `spring_bloom` (Spring Bloom) · `toss_run` (Toss Run) · `switch_to_silk` (Switch To Silk) · `get_rich_quick` (Get Rich Quick) · `make_it_rain` (Make It Rain) · `twist_shake` (Twist Shake) · `the_hip_sway` (The Hip Sway) · `send_my_love` (Send My Love) · `funky_martian` (Funky Martian) · `wealth_drive` (Wealth Drive) · `the_high_kick` (The High Kick) · `the_exercise` (The Exercise) · `lucky_veggie` (Lucky Veggie) · `studio_look` (Studio Look) · `flash_drive` (Flash Drive) · `shush_my_dreams` (Shush My Dreams) · `french_elegance` (French Elegance) · `finger_swipe` (Finger Swipe) · `advent_of_flora` (Advent Of Flora) · `smooth_transition` (Smooth Transition) · `kiss_pro` (Kiss Pro) · `raid_check` (Raid Check) · `snow_night_kiss` (Snow Night Kiss) · `eternal_kiss` (Eternal Kiss) · `fortune_in_motion` (Fortune In Motion) · `chinese_trend` (Chinese Trend) · `sedan_chair_dance` (Sedan Chair Dance) · `skyfall` (Skyfall) · `good_luck_dance` (Good Luck Dance) · `laicai_dance` (Laicai Dance) · `yangge_dance` (Yangge Dance) · `color_mixing` (Color Mixing) · `palm_sized_figure` (Palm Sized Figure) · `lantern_festival_cuju` (Lantern Festival Cuju) · `unique_firework` (Unique Firework) · `unique_spring_couplets` (Unique Spring Couplets) · `horse_mask` (Horse Mask) · `fortune_knocks_cartoon` (Fortune Knocks Cartoon) · `tangyuan_to_animal` (Tangyuan To Animal) · `hot_feet_dance` (Hot Feet Dance) · `swag_dance` (Swag Dance) · `pigeon_dance` (Pigeon Dance) · `bloodline_dance` (Bloodline Dance) · `chanel_dance` (Chanel Dance) · `cute_dance` (Cute Dance) · `love_theme_song` (Love Theme Song) · `pumpitup_dance` (Pumpitup Dance) · `city_to_village` (City To Village) · `fortune_god_transform` (Fortune God Transform) · `new_year_feast` (New Year Feast) · `ring_in_new` (Ring In New) · `horse_year_firework` (Horse Year Firework) · `pet_vlogger` (Pet Vlogger) · `crystal_horse` (Crystal Horse) · `lateral_shift_transition` (Lateral Shift Transition) · `drunk_dance` (Drunk Dance) · `drunk_dance_pet` (Drunk Dance Pet) · `daoma_dance` (Daoma Dance) · `bouncy_dance` (Bouncy Dance) · `smooth_sailing_dance` (Smooth Sailing Dance) · `new_year_greeting` (New Year Greeting) · `lion_dance` (Lion Dance) · `prosperity` (Prosperity) · `great_success` (Great Success) · `golden_horse_fortune` (Golden Horse Fortune) · `red_packet_box` (Red Packet Box) · `lucky_horse_year` (Lucky Horse Year) · `lucky_red_packet` (Lucky Red Packet) · `lucky_money_come` (Lucky Money Come) · `lion_dance_pet` (Lion Dance Pet) · `dumpling_making_pet` (Dumpling Making Pet) · `fish_making_pet` (Fish Making Pet) · `pet_red_packet` (Pet Red Packet) · `lantern_glow` (Lantern Glow) · `expression_challenge` (Expression Challenge) · `overdrive` (Overdrive) · `heart_gesture_dance` (Heart Gesture Dance) · `poping` (Poping) · `martial_arts` (Martial Arts) · `running` (Running) · `nezha` (Nezha) · `motorcycle_dance` (Motorcycle Dance) · `subject_3_dance` (Subject 3 Dance) · `ghost_step_dance` (Ghost Step Dance) · `phantom_jewel` (Phantom Jewel) · `zoom_out` (Zoom Out) · `cheers_2026` (Cheers 2026) · `fight_pro` (Fight Pro) · `hug_pro` (Hug Pro) · `heart_gesture_pro` (Heart Gesture Pro) · `dollar_rain_pro` (Dollar Rain Pro) · `pet_bee_pro` (Pet Bee Pro) · `countdown_teleport` (Countdown Teleport) · `santa_random_surprise` (Santa Random Surprise) · `magic_match_tree` (Magic Match Tree) · `bullet_time_360` (Bullet Time 360) · `happy_birthday` (Happy Birthday) · `birthday_star` (Birthday Star) · `thumbs_up_pro` (Thumbs Up Pro) · `tiger_hug_pro` (Tiger Hug Pro) · `pet_lion_pro` (Pet Lion Pro) · `surprise_bouquet` (Surprise Bouquet) · `bouquet_drop` (Bouquet Drop) · `3d_cartoon_1_pro` (3d Cartoon 1 Pro) · `firework_2026` (Firework 2026) · `glamour_photo_shoot` (Glamour Photo Shoot) · `box_of_joy` (Box Of Joy) · `first_toast_of_the_year` (First Toast Of The Year) · `my_santa_pic` (My Santa Pic) · `santa_gift` (Santa Gift) · `steampunk_christmas` (Steampunk Christmas) · `snowglobe` (Snowglobe) · `christmas_photo_shoot` (Christmas Photo Shoot) · `ornament_crash` (Ornament Crash) · `santa_express` (Santa Express) · `instant_christmas` (Instant Christmas) · `particle_santa_surround` (Particle Santa Surround) · `coronation_of_frost` (Coronation Of Frost) · `building_sweater` (Building Sweater) · `spark_in_the_snow` (Spark In The Snow) · `scarlet_and_snow` (Scarlet And Snow) · `cozy_toon_wrap` (Cozy Toon Wrap) · `bullet_time_lite` (Bullet Time Lite) · `magic_cloak` (Magic Cloak) · `balloon_parade` (Balloon Parade) · `jumping_ginger_joy` (Jumping Ginger Joy) · `bullet_time` (Bullet Time) · `c4d_cartoon_pro` (C4d Cartoon Pro) · `pure_white_wings` (Pure White Wings) · `black_wings` (Black Wings) · `golden_wing` (Golden Wing) · `pink_pink_wings` (Pink Pink Wings) · `venomous_spider` (Venomous Spider) · `throne_of_king` (Throne Of King) · `luminous_elf` (Luminous Elf) · `woodland_elf` (Woodland Elf) · `japanese_anime_1` (Japanese Anime 1) · `american_comics` (American Comics) · `guardian_spirit` (Guardian Spirit) · `swish_swish` (Swish Swish) · `snowboarding` (Snowboarding) · `witch_transform` (Witch Transform) · `vampire_transform` (Vampire Transform) · `pumpkin_head_transform` (Pumpkin Head Transform) · `demon_transform` (Demon Transform) · `mummy_transform` (Mummy Transform) · `zombie_transform` (Zombie Transform) · `cute_pumpkin_transform` (Cute Pumpkin Transform) · `cute_ghost_transform` (Cute Ghost Transform) · `knock_knock_halloween` (Knock Knock Halloween) · `halloween_escape` (Halloween Escape) · `baseball` (Baseball) · `inner_voice` (Inner Voice) · `a_list_look` (A List Look) · `memory_alive` (Memory Alive) · `trampoline` (Trampoline) · `trampoline_night` (Trampoline Night) · `pucker_up` (Pucker Up) · `guess_what` (Guess What) · `feed_mooncake` (Feed Mooncake) · `rampage_ape` (Rampage Ape) · `flyer` (Flyer) · `dishwasher` (Dishwasher) · `pet_chinese_opera` (Pet Chinese Opera) · `magic_fireball` (Magic Fireball) · `gallery_ring` (Gallery Ring) · `pet_moto_rider` (Pet Moto Rider) · `muscle_pet` (Muscle Pet) · `squeeze_scream` (Squeeze Scream) · `pet_delivery` (Pet Delivery) · `running_man` (Running Man) · `disappear` (Disappear) · `mythic_style` (Mythic Style) · `steampunk` (Steampunk) · `3d_cartoon_2` (3d Cartoon 2) · `eagle_snatch` (Eagle Snatch) · `hug_from_past` (Hug From Past) · `firework` (Firework) · `media_interview` (Media Interview) · `pet_chef` (Pet Chef) · `santa_gifts` (Santa Gifts) · `santa_hug` (Santa Hug) · `heart_gesture_1` (Heart Gesture 1) · `pet_wizard` (Pet Wizard) · `smoke_smoke` (Smoke Smoke) · `instant_kid` (Instant Kid) · `dollar_rain` (Dollar Rain) · `cry_cry` (Cry Cry) · `building_collapse` (Building Collapse) · `gun_shot` (Gun Shot) · `mushroom` (Mushroom) · `double_gun` (Double Gun) · `pet_warrior` (Pet Warrior) · `lightning_power` (Lightning Power) · `jesus_hug` (Jesus Hug) · `shark_alert` (Shark Alert) · `long_hair` (Long Hair) · `lie_flat` (Lie Flat) · `polar_bear_hug` (Polar Bear Hug) · `brown_bear_hug` (Brown Bear Hug) · `jazz_jazz` (Jazz Jazz) · `office_escape_plow` (Office Escape Plow) · `fly_fly` (Fly Fly) · `watermelon_bomb` (Watermelon Bomb) · `pet_dance` (Pet Dance) · `boss_coming` (Boss Coming) · `wool_curly` (Wool Curly) · `pet_bee` (Pet Bee) · `marry_me` (Marry Me) · `swing_swing` (Swing Swing) · `day_to_night` (Day To Night) · `piggy_morph` (Piggy Morph) · `wig_out` (Wig Out) · `car_explosion` (Car Explosion) · `ski_ski` (Ski Ski) · `siblings` (Siblings) · `construction_worker` (Construction Worker) · `let's_ride` (Let's Ride) · `snatched` (Snatched) · `magic_broom` (Magic Broom) · `felt_felt` (Felt Felt) · `jumpdrop` (Jumpdrop) · `surfsurf` (Surfsurf) · `fairy_wing` (Fairy Wing) · `angel_wing` (Angel Wing) · `dark_wing` (Dark Wing) · `skateskate` (Skateskate) · `plushcut` (Plushcut) · `jelly_press` (Jelly Press) · `jelly_slice` (Jelly Slice) · `jelly_squish` (Jelly Squish) · `jelly_jiggle` (Jelly Jiggle) · `pixelpixel` (Pixelpixel) · `yearbook` (Yearbook) · `instant_film` (Instant Film) · `anime_figure` (Anime Figure) · `rocketrocket` (Rocketrocket) · `bloombloom` (Bloombloom) · `dizzydizzy` (Dizzydizzy) · `fuzzyfuzzy` (Fuzzyfuzzy) · `squish` (Squish) · `expansion` (Expansion) · `emoji` (Emoji) (default `korean_baseball`) |
| `imageUrls` | `-i` | file | **required** image (up to 2) |

### `kling-v3` — Kling V3

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` (default `16:9`) |
| `duration` | `-d` | enum | `3` · `5` · `8` · `10` · `12` · `15` (default `5`) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |
| `negativePrompt` | `--neg` | text | free text |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `multiShot` | `--multi-shot` | boolean | `true` · `false` (default `false`) |
| `shotType` | `--shot-type` | enum | `customize` (Customize) · `intelligence` (AI Auto) (default `customize`) |
| `multiPrompt` | `--multi-prompt` | object[] | up to 6 `{index, prompt, duration}` |
| `voiceList` | `--voice-list` | object[] | up to 2 `{voice_id}` |
| `elementList` | `--element-list` | object[] | up to 3 `{element_id}` |
| `staticMask` | `--static-mask` | file | image |
| `renderingSpeed` | `--speed` | enum | `std` (Standard) · `pro` (Pro) · `4k` (4K) (default `std`) |

### `kling-motion-control-v3` — Kling Motion Control V3

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text (≤2500 chars) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `renderingSpeed` | `--speed` | enum | `std` (Standard) · `pro` (Pro) (default `std`) |
| `characterOrientation` | `--orientation` | enum | `image` (Match Image (≤10s ref video)) · `video` (Match Video (≤30s ref video)) (default `video`) |
| `keepOriginalSound` | `--keep-audio` | enum | `yes` (Yes) · `no` (No) (default `yes`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `videoUrl` | `--video` | file | **required** video |

### `kling-motion-control` — Kling Motion Control 2.6

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text (≤2500 chars) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `renderingSpeed` | `--speed` | enum | `std` (Standard) · `pro` (Pro) (default `std`) |
| `characterOrientation` | `--orientation` | enum | `image` (Match Image (≤10s ref video)) · `video` (Match Video (≤30s ref video)) (default `video`) |
| `keepOriginalSound` | `--keep-audio` | enum | `yes` (Yes) · `no` (No) (default `yes`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `videoUrl` | `--video` | file | **required** video |

### `kling-v2-6` — Kling V2.6

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` (default `16:9`) |
| `duration` | `-d` | enum | `5` · `10` (default `5`) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |
| `negativePrompt` | `--neg` | text | free text |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `cfgScale` | `--cfg` | number | `0`–`1`, step 0.1, default `0.5` |
| `renderingSpeed` | `--speed` | enum | `std` (Standard) · `pro` (Pro) (default `std`) |

### `kling-v3-omni` — Kling V3 Omni

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` (default `16:9`) |
| `duration` | `-d` | enum | `3` · `5` · `8` · `10` · `12` · `15` (default `5`) |
| `resolution` | `-r` | enum | `720p` · `1080p` · `4k` (default `720p`) |
| `renderingSpeed` | `--speed` | enum | `std` (Standard) · `pro` (Pro) (default `std`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `multiShot` | `--multi-shot` | boolean | `true` · `false` (default `false`) |
| `shotType` | `--shot-type` | enum | `customize` (Customize) (default `customize`) |
| `multiPrompt` | `--multi-prompt` | object[] | up to 6 `{index, prompt, duration}` |
| `omniImageList` | `--omni-image-list` | object[] | up to 10 `{image_url, type}` |
| `omniVideoList` | `--omni-video-list` | object[] | up to 1 `{video_url, refer_type, keep_original_sound}` |
| `elementList` | `--element-list` | object[] | up to 3 `{element_id}` |

### `kling-avatar` — Kling Avatar

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text (≤2500 chars) |
| `renderingSpeed` | `--speed` | enum | `std` (Standard) · `pro` (Pro) (default `std`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `audioUrl` | `-a` | file | **required** audio |
| `audioId` | `--audio-id` | text | free text |

### `kling-3.0-image` — Kling 3.0 Image

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `21:9` · `4:3` · `3:2` · `2:3` · `3:4` (default `16:9`) |
| `resolution` | `-r` | enum | `1k` · `2k` · `4k` (default `1k`) |
| `count` | `-n` | enum | `1` · `2` · `3` · `4` · `5` · `6` · `7` · `8` · `9` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 10) |

### `kling-o1-image` — Kling O1 Image

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `21:9` · `4:3` · `3:2` · `2:3` · `3:4` (default `16:9`) |
| `resolution` | `-r` | enum | `1k` · `2k` (default `1k`) |
| `count` | `-n` | enum | `1` · `2` · `3` · `4` · `5` · `6` · `7` · `8` · `9` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 10) |

### `kling-v2-new-image` — Kling V2 New Image

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `21:9` · `4:3` · `3:2` · `2:3` · `3:4` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `3` · `4` · `5` · `6` · `7` · `8` · `9` (default `1`) |
| `negativePrompt` | `--neg` | text | free text |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `imageReference` | `--image-reference` | enum | `subject` (Subject) · `face` (Face) (default `subject`) |
| `imageWeight` | `--weight` | integer | `0`–`100`, step 5, default `50` |
| `humanFidelity` | `--fidelity` | number | `0`–`1`, step 0.05, default `0.45` |

### `kling-t2a` — Kling T2A

Input type: `t2a`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `duration` | `-d` | number | `3`–`10`, step 0.5, default `5` |

### `kling-v2a` — Kling V2A

Input type: `v2a`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |

> **Notes:** Multi-shot is incompatible with start/end-frame images; native 4K (`renderingSpeed: 4k`) is V3-only.

## Pricing

```bash
gen-ai pricing kling-v3 -d 5 --rendering-speed pro
```

Cost scales with **duration**, **rendering speed / resolution** (`std` 720p · `pro` 1080p · `4k`), and **audio**.
