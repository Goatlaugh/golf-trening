
let currentList = [];
let currentIndex = 0;
let currentScreen = "main";
let activeStrengthFilter = "Alle";
let timerInterval;
let remainingTime = 0;
let totalTime = 0;
let timerRunning = false;
function resetTimerState() {
  clearInterval(timerInterval);
  timerRunning = false;
  remainingTime = 0;
  totalTime = 0;
}
function createExerciseCard(name, index) {
  return `
    <div class="card" onclick="openExercise(${index})">
      <span class="left">${name}</span>
      <span class="arrow">›</span>
    </div>
  `;
}


function createStrengthFilters() {

  return `

    <div class="strength-all">

      <button
        class="${activeStrengthFilter === 'Alle' ? 'active-filter' : ''}"
        onclick="filterStrength('Alle')">
        Alle Øvelser
      </button>

    </div>

    <div class="strength-filters">

      <button
        class="${activeStrengthFilter === 'Armer og skuldre' ? 'active-filter' : ''}"
        onclick="filterStrength('Armer og skuldre')">
        💪 Armer
      </button>

      <button
        class="${activeStrengthFilter === 'Kjernemuskulatur' ? 'active-filter' : ''}"
        onclick="filterStrength('Kjernemuskulatur')">
        🧠 Kjerne
      </button>

      <button
        class="${activeStrengthFilter === 'Rygg' ? 'active-filter' : ''}"
        onclick="filterStrength('Rygg')">
        🏋️ Rygg
      </button>

      <button
        class="${activeStrengthFilter === 'Ben' ? 'active-filter' : ''}"
        onclick="filterStrength('Ben')">
        🦵 Ben
      </button>

      <button
        class="${activeStrengthFilter === 'Mage' ? 'active-filter' : ''}"
        onclick="filterStrength('Mage')">
        🔥 Mage
      </button>

    </div>

  `;
}


function renderList(title, items) {

  if (!items) {
    return "";
  }

  let html = `<b>${title}</b><ul>`;

  items.forEach(item => {
    html += `<li>${item}</li>`;
  });

  html += "</ul>";

  return html;
}




function createMenu() {

  let html = "";

  categories.forEach(cat => {

    html += `
      <div class="card" onclick="openCategory('${cat.id}')">
        <span class="left">${cat.navn}</span>
        <span class="arrow">›</span>
      </div>
    `;

  });

  document.getElementById("menu").innerHTML = html;
}

function openCategory(cat) {
  const category = categories.find(c => c.id === cat);

activeStrengthFilter = "Alle";
currentList = category.data;
  currentScreen = "category";


  let html = "<h2>" + cat.toUpperCase() + "</h2>";

if (cat === "oppvarming") {

  const totalSeconds = oppvarming.reduce(
    (sum, exercise) => sum + (exercise.timer || 0),
    0
  );

  const totalMinutes = Math.floor(totalSeconds / 60);

  html += `
  <button class="start-workout-btn"
          onclick="startOppvarming()">
    🔥 Start Oppvarming (${totalMinutes} min)
  </button>
`;
}


if (cat === "styrke") {

  html += createStrengthFilters();

}



  currentList.forEach((e, i) => {
  html += createExerciseCard(e.navn, i);
});

  document.getElementById("category").innerHTML = html;
  show("category");
}


function filterStrength(tag) {

  activeStrengthFilter = tag;

  let exercises;

  if (tag === "Alle") {

    exercises = styrke;

  } else {

    exercises = styrke.filter(exercise =>
      exercise.styrkeTag.includes(tag)
    );

  }

  currentList = exercises;

  let html = "<h2>STYRKE</h2>";

  html += createStrengthFilters();

  exercises.forEach((e, i) => {
  html += createExerciseCard(e.navn, i);
});


  document.getElementById("category").innerHTML = html;

}

function startOppvarming() {

  openExercise(0, true);

}

function openExercise(i, autoStart = false) {

  resetTimerState();

  keepScreenOn();

  currentIndex = i;
  currentScreen = "exercise";

const exercise = document.getElementById("exercise");

if (exercise) {
  exercise.style.opacity = "0";
}

  setTimeout(() => {

  renderExercise();

  const exercise =
    document.getElementById("exercise");

  if (exercise) {
    exercise.style.opacity = "1";
  }


if (autoStart) {

    const exercise = currentList[currentIndex];


if (exercise.timer) {

  const video = document.getElementById("exerciseVideo");


if (video) {

  video.addEventListener("loadedmetadata", () => {

  setTimeout(() => {
    startTimer(exercise.timer);
  }, exercise.autoStartDelay || 3000);

}, { once: true });

  } else {

    setTimeout(() => {
      startTimer(exercise.timer);
    }, exercise.autoStartDelay || 3000);

  	    }

	   }

  	  }


	 }, 150);

	}

function renderExercise() {
  let e = currentList[currentIndex];

  let html = "";

  if (e.videoFile) {

  html += `
    <video
      id="exerciseVideo"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
      class="exercise-video">

      <source
        src="${e.videoFile}"
        type="video/mp4">

    </video>
 
  `;

}
else if (e.bilde) {

  html += `<img src="${e.bilde}">`;



}

  html += '<div class="progress-bar">' +
          getProgressBar() +
        '</div>';

html += "<h1>" + e.navn + "</h1>";
  if (e.tid) {
  html += "<h2>" + e.tid + "</h2>";
}

if (e.styrkeTag) {

  html += '<div class="tag-container">';

  e.styrkeTag.forEach(tag => {

    html += `
      <span class="exercise-tag">
        ${tag}
      </span>
    `;

  });

  html += "</div>";

}


html += renderList(
  "Muskelgruppe:",
  e.muskelgruppe
);

if (e.repetisjon) {

  html += "<b>Repetisjon:</b>";

  html += "<div>" + e.repetisjon + "</div>";

}

html += renderList(
  "Utstyr:",
  e.utstyr
);



html += renderList(
  "Fokus:",
  e.fokus
);


html += renderList(
  "Sjekkpunkter:",
  e.sjekkpunkter
);


if (e.fremgang) {
  html += "<b>Fremgangsmåte:</b>";

  e.fremgang.forEach(f => {

    if (f.startsWith("Steg")) {

  let deler = f.split(":");
  let steg = deler[0] + ":";
  let tekst = deler.slice(1).join(":");

  html += "<div class='fremgang-linje'><strong>" + steg + "</strong>" + tekst + "</div>";

} else {
  html += "<div class='fremgang-linje'>" + f + "</div>";
}

  });
}

if (e.timer) {
  html += `
    <div style="display:flex;justify-content:center;margin:20px 0;">

      <svg width="160" height="160">

<circle
  cx="80"
  cy="80"
  r="65"
  stroke="#333"
  stroke-width="10"
  fill="none"
/>

<circle
  id="progressRing"
  cx="80"
  cy="80"
  r="65"
  stroke="#1fa463"
  stroke-width="10"
  fill="none"
  stroke-linecap="round"
  stroke-dasharray="408"
  transform="rotate(-90 80 80)"
/>

        <text
          id="timerDisplay"
          x="80"
          y="88"
          text-anchor="middle"
          fill="white"
          font-size="28"
          font-weight="bold">
          ${Math.floor(e.timer / 60)}:00
        </text>

      </svg>

    </div>

   <div class="timer-controls">

  <div id="timerButtons" class="timer-buttons">
  <button onclick="startTimer(${e.timer})">▶️ Start</button>
  <button onclick="resetTimer(${e.timer})">🔄 Reset</button>
</div>

  `;
}

  if (e.video) {
    html += '<button onclick="window.open(\'' + e.video + '\')">▶ Se video</button>';
  }

  document.getElementById("exercise").innerHTML = html;
  show("exercise");
}

function goBack() {
  if (currentScreen === "exercise") {
    if (currentIndex > 0) {
  openExercise(currentIndex - 1);
} 
else {
      show("category");
      currentScreen = "category";
    }
  } else if (currentScreen === "category") {
    show("main");
    currentScreen = "main";
  }
}

function goNext() {
  if (currentScreen === "exercise" && currentIndex < currentList.length - 1) {
    openExercise(currentIndex + 1);
  }
}

function goMenu() {

  resetTimerState();

  show("main");
  currentScreen = "main";
}

function show(id) {
  document.getElementById("main").classList.remove("active");
  document.getElementById("category").classList.remove("active");
  document.getElementById("exercise").classList.remove("active");

  document.getElementById(id).classList.add("active");
}

function startTimer(seconds) {

  if (!timerRunning) {

    if (remainingTime === 0) {
      remainingTime = seconds;
totalTime = seconds;
    }

    timerRunning = true;

updateTimerButtons(seconds);

    timerInterval = setInterval(() => {

      remainingTime--;

      updateTimerDisplay();


     if (remainingTime <= 0) {

  remainingTime = 0;

  clearInterval(timerInterval);

  timerRunning = false;

updateTimerButtons(totalTime);

document.getElementById("timerDisplay").innerHTML =
  "✅ Ferdig!";


  const currentExercise = currentList[currentIndex];

  if (currentExercise && currentExercise.autoNext) {

    setTimeout(() => {

      if (currentIndex < currentList.length - 1) {

  openExercise(currentIndex + 1, true);

}

    }, currentExercise.autoNext);

  }

}

    }, 1000);
  }
}

function pauseTimer() {

  clearInterval(timerInterval);

  timerRunning = false;

  updateTimerButtons(remainingTime);

}

function resetTimer(seconds) {

  resetTimerState();

  remainingTime = seconds;
  totalTime = seconds;

  updateTimerDisplay();
  updateTimerButtons(seconds);

}


function updateTimerDisplay() {

  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;

  document.getElementById("timerDisplay").innerHTML =
    minutes + ":" + String(seconds).padStart(2, "0");

  const ring = document.getElementById("progressRing");

if (ring) {
  ring.style.transition = "stroke-dashoffset 0.9s linear";
}

  if (ring && totalTime > 0) {

    const radius = 65;
    const circumference = 2 * Math.PI * radius;

    const progress = remainingTime / totalTime;


    ring.style.strokeDasharray =
  circumference + " " + circumference;

    ring.style.strokeDashoffset =
      circumference * (1 - progress);
if (remainingTime <= 5) {
  ring.style.stroke = "#ff3333";
}
else if (remainingTime <= 10) {
  ring.style.stroke = "#ff9900";
}
else {
  ring.style.stroke = "#1fa463";
}

  }
}

function updateTimerButtons(seconds) {

  let html = "";

  if (timerRunning) {

    html = `
      <button onclick="pauseTimer()">⏸️ Pause</button>
      <button onclick="resetTimer(totalTime)">🔄 Reset</button>
    `;

  } else {

    html = `
      <button onclick="startTimer(${seconds})">▶️ Start</button>
      <button onclick="resetTimer(totalTime)">🔄 Reset</button>
    `;

  }

  document.getElementById("timerButtons").innerHTML = html;
}


function getProgressBar() {

  let total = currentList.length;
  let current = currentIndex + 1;

  let percentage = Math.round((current / total) * 100);

  return `
    <div class="progress-title">Progress</div>

    <div class="progress-track">
      <div
        class="progress-fill"
        style="width:${percentage}%"
      ></div>
    </div>

    <div class="progress-text">
  Øvelse ${current} av ${total} • ${percentage}%
</div>
  `;
}


let wakeLock = null;

async function keepScreenOn() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('✅ Skjerm holdes våken');

    wakeLock.addEventListener('release', () => {
      console.log('❌ Wake Lock ble deaktivert');
    });
  } catch (err) {
    console.log('Feil:', err);
  }
}

// Aktiver når siden lastes
document.addEventListener("DOMContentLoaded", () => {
  createMenu();
  keepScreenOn();
});

// Re-aktiver hvis bruker går tilbake til siden
document.addEventListener("visibilitychange", () => {
  if (wakeLock !== null && document.visibilityState === "visible") {
    keepScreenOn();
  }
});



// Fallback for iOS
function preventSleepiOS() {
  setInterval(() => {
    // Liten usynlig scroll som holder skjermen aktiv
    window.scrollBy(0, 1);
    window.scrollBy(0, -1);
  }, 20000); // hvert 20. sekund
}

preventSleepiOS();


