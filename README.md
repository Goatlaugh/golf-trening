# Golf Training App

A lightweight Progressive Web App (PWA) for golf training, practice sessions, and physical preparation.

## Features

- Oppvarming
- Range
- Chipping
- Bunker
- Putting
- Styrke
- Exercise timers
- Auto-start workouts
- Auto-next exercises
- Strength filtering
- Progress tracking
- Scorecard system
- Personal Best tracking
- Statistics and score history
- Local data storage
- Offline installation support

---

# Project Structure

```text
data/
├── oppvarming.js
├── range.js
├── chipping.js
├── bunker.js
├── putting.js
├── styrke.js
└── categories.js

images/
├── exercises/
├── gifs/
├── videos/
└── icons/

css/
└── style.css

js/
└── app.js

manifest.json
index.html
```

---

# Adding A New Exercise

## Step 1

Open the correct category file.

Examples:

```text
data/oppvarming.js
data/chipping.js
data/styrke.js
```

---

## Step 2

Add a new exercise object.

Example:

```js
{
  navn: "Bekkentilt"
}
```

---

# Exercise Properties

## Required

```js
{
  navn: "Exercise Name"
}
```

---

## Optional

### Image

```js
{
  navn: "Bekkentilt",
  bilde: "images/exercises/bekkentilt.jpg"
}
```

Store images in:

```text
images/exercises/
```

---

### GIF

```js
{
  navn: "Bekkentilt",
  bilde: "images/gifs/bekkentilt.gif"
}
```

Store GIF files in:

```text
images/gifs/
```

---

### Video File (Recommended)

```js
{
  navn: "Bekkentilt",
  videoFile: "images/videos/bekkentilt.mp4"
}
```

Store video files in:

```text
images/videos/
```

---

### External Video Link

```js
{
  navn: "Bekkentilt",
  video: "https://youtube.com/..."
}
```

---

### Timer

```js
{
  navn: "Bekkentilt",
  timer: 120
}
```

Timer value is specified in seconds.

---

### Repetitions

```js
{
  navn: "Bekkentilt",
  repetisjon: "2 x 10"
}
```

---

### Muscle Groups

```js
{
  muskelgruppe: [
    "Rygg",
    "Mage"
  ]
}
```

---

### Equipment

```js
{
  utstyr: [
    "Golfkølle"
  ]
}
```

---

### Focus

```js
{
  fokus: [
    "Balanse",
    "Rotasjon"
  ]
}
```

---

### Checkpoints

```js
{
  sjekkpunkter: [
    "Hold ryggen rett"
  ]
}
```

---

### Instructions

```js
{
  fremgang: [
    "Steg 1: Startposisjon",
    "Steg 2: Utfør bevegelsen"
  ]
}
```

---

### Strength Tags

Used for filtering inside the Styrke category.

```js
{
  styrkeTag: [
    "Rygg",
    "Ben"
  ]
}
```

Available tags:

```text
Armer og skuldre
Kjernemuskulatur
Rygg
Ben
Mage
```

---

### Auto Start Timer

Automatically starts the timer after the exercise loads.

```js
{
  timer: 60,
  autoStartDelay: 3000
}
```

Delay value is specified in milliseconds.

---

### Auto Next Exercise

Automatically opens the next exercise after timer completion.

```js
{
  timer: 60,
  autoNext: 3000
}
```

Delay value is specified in milliseconds.

---

# Adding A New Category

## Step 1

Create a new file in:

```text
data/
```

Example:

```text
data/mobility.js
```

---

## Step 2

Create the category data.

Example:

```js
const mobility = [

  {
    navn: "Example Exercise"
  }

];
```

---

## Step 3

Load the file in `index.html`.

Example:

```html
<script src="data/mobility.js"> </script>
```

### Important

The file must be loaded before:

```html
<script src="data/categories.js"> </script>
<script src="js/app.js"> </script>
```


---

## Step 4

Open:

```text
data/categories.js
```

Add the new category.

Example:

```js
{
  id: "mobility",
  navn: "Mobility",
  data: mobility
}
```

### Important

- Variable name must match the data file.
- Category IDs must be unique.
- The last item in the categories array should not end with a trailing comma.

---

# Scorecard System

The application includes a built-in scorecard system.

## Current Implementation

- Sko Leken

## Features

- Save score
- Undo last score
- Clear history
- Personal Best tracking
- Last 5 attempts
- Average score
- Attempt count
- Score comparisons
- New Personal Best celebration
- Confetti animation

## Data Storage

All score data is stored locally using:

```js
localStorage
```

---

# Scorecard Integration

Current implementation displays the scorecard automatically when:

```js
e.navn === "Sko Leken"
```

Example:

```js
{
  navn: "Sko Leken"
}
```

### Future Recommendation

Future scorecards should use a dedicated property rather than exercise name checks.

Example:

```js
{
  navn: "Sko Leken",
  scorecard: true
}
```

---

# Modal System

The application contains a reusable modal system.

## Functions

```js
openModal(content);
```

```js
closeModal();
```

```js
openConfirmModal(
  title,
  message,
  callback
);
```

## Current Uses

- Scorecards
- Confirmation dialogs
- Delete confirmations
- Undo confirmations
- Future popup content

---

# Configuration (CONFIG)

Global application settings are stored inside:

```text
js/app.js
```

Example:

```js
const CONFIG = {

  EXERCISE_FADE_DELAY: 150,

  AUTO_START_DELAY: 3000,

  TIMER: {

    RED_WARNING: 5,

    ORANGE_WARNING: 10,

    RING_RADIUS: 65,

    COLORS: {

      BACKGROUND: "#333",

      NORMAL: "#1fa463",

      WARNING: "#ff9900",

      DANGER: "#ff3333"

    }

  },

  IOS_SLEEP_PREVENTION: 20000

};
```

## Rules

- Add reusable settings to `CONFIG`.
- Avoid hardcoded values where possible.
- Reuse existing configuration before creating new settings.

---

# app.js Architecture

When adding functionality, place code inside the correct module.

```text
APP STATE

CONFIG

HELPERS

CARD COMPONENTS

STRENGTH FILTERS

PAGE RENDERERS

MENU & CATEGORIES

EXERCISE COMPONENTS

EXERCISE NAVIGATION

MODAL MODULE

CONFIRMATION MODAL

SCORE CARD MODULE

TIMER MODULE

PROGRESS MODULE

WAKE LOCK MODULE

APP STARTUP
```

---

# style.css Architecture

When adding styles, place CSS inside the correct module.

```text
ROOT THEME

GLOBAL LAYOUT

TYPOGRAPHY

MEDIA

LISTS & TEXT CONTENT

CARDS

BUTTONS

NAVIGATION

HERO

TIMER

PROGRESS BAR

EXERCISE COMPONENTS

STRENGTH FILTERS

SCORECARD BUTTON

MODAL

CONFIRM MODAL

PAGE TRANSITIONS

ANIMATIONS

RESPONSIVE
```

---

# CSS Design System

All styling should use CSS variables defined inside:

```css
:root
```

Example variables:

```css
--primary-color
--background-color
--radius-large
--button-padding
--screen-padding
--progress-fill-start
```

## Rules

- Do not hardcode colors if a variable already exists.
- Do not hardcode border radius values if a variable already exists.
- Reuse spacing variables whenever possible.
- Reuse shadow variables whenever possible.
- Reuse typography variables whenever possible.
- Add new design tokens inside the **ROOT THEME** section.

---

# Media Locations

## Images

```text
images/exercises/
```

## GIFs

```text
images/gifs/
```

## Videos

```text
images/videos/
```

## Icons

```text
images/icons/
```

---

# Local Storage

The application stores user progress locally.

## Current Storage Keys

```text
Sko Leken
Sko Leken History
```

## Used For

- Personal Best tracking
- Score history
- Last 5 attempts
- Statistics
- Score recovery

No external database is required.

---

# Wake Lock Support

The application prevents the device screen from sleeping during workouts.

## Methods

- Screen Wake Lock API (supported browsers)
- iOS fallback sleep prevention

Configuration is controlled through:

```js
CONFIG.IOS_SLEEP_PREVENTION
```

---

# Developer Guidelines

Before adding anything new:

1. Check whether similar functionality already exists.
2. Place new JavaScript inside the correct module.
3. Place new CSS inside the correct module.
4. Reuse existing CSS variables whenever possible.
5. Store exercise data inside `/data`.
6. Store media files inside `/images`.
7. Register all categories inside `data/categories.js`.
8. Store reusable settings inside `CONFIG`.
9. Use the modal system instead of creating duplicate dialog solutions.
10. Follow the CSS Design System before creating new visual styles.
11. Keep scorecard logic inside the Score Card Module.
12. Keep app-wide settings centralized in CONFIG.
13. Rebuild UI using existing helper functions before creating new render functions.

Following these guidelines keeps the project clean, scalable, maintainable, and consistent.
