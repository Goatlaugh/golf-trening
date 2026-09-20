# Golf Training App

A lightweight golf training app containing:

- Oppvarming
- Range
- Chipping
- Bunker
- Putting
- Styrke

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

images/
├── exercises/
├── gifs/
└── videos/

index.html
category.js
app.js
style.css
```

---

# Adding A New Exercise

## Step 1

Open the correct category file.

Examples:

```text
data/oppvarming.js
```

```text
data/chipping.js
```

```text
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

Store image in:

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

Store GIF in:

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

Store video in:

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

Timer value is in seconds.

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

Starts timer automatically after exercise loads.

```js
{
  timer: 60,
  autoStartDelay: 3000
}
```

Delay is in milliseconds.

---

### Auto Next Exercise

Automatically moves to the next exercise after timer completion.

```js
{
  timer: 60,
  autoNext: 3000
}
```

Delay is in milliseconds.

---

# Adding A New Category

## Step 1

Create a new file inside:

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

Load the file in index.html

Example:

```html
data/mobility.jsscript>
```

IMPORTANT:

The script must be loaded before:

```html
<script src="category.js"></script>
<script src="app.js"></script>
```

Example:

```html
data/mobility.jsscript>

<script src="category.js"></script>

<script src="app.js"></script>
```

---

## Step 4

Open:

```text
category.js
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

Important:

- Variable name must match the data file.
- Last category in the array should not end with a comma.

---

# app.js Architecture

When adding new functionality, place functions inside the correct module.

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

TIMER MODULE

PROGRESS MODULE

WAKE LOCK MODULE

APP STARTUP
```

---

# style.css Architecture

When adding styles, place them inside the correct module.

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

PAGE TRANSITIONS

ANIMATIONS

RESPONSIVE
```

---

# Media Locations

Images:

```text
images/exercises/
```

GIFs:

```text
images/gifs/
```

Videos:

```text
images/videos/
```

---

# Developer Guidelines

Before adding anything new:

1. Check if a similar function already exists.
2. Place new JavaScript in the correct module.
3. Place new CSS in the correct module.
4. Reuse existing CSS variables when possible.
5. Keep exercise data inside `/data`.
6. Keep media files inside `/images`.
7. Keep categories registered in `category.js`.

Following these guidelines keeps the project clean, maintainable, and consistent.
