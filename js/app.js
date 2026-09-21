/* ===================================================
		APP STATE
=================================================== */

let currentList = [];
let currentIndex = 0;
let currentScreen = "main";
let activeStrengthFilter = "Alle";

let timerInterval;
let remainingTime = 0;
let totalTime = 0;
let timerRunning = false;

let wakeLock = null;


/* ===================================================
		CONFIG
=================================================== */

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



/* =============*==================================*==
		HELPERS
====================*============================== */

const $ = id => document.getElementById(id);

function resetTimerState() {
  clearInterval(timerInterval);
  timerRunning = false;
  remainingTime = 0;
  totalTime = 0;
}

function show(id) {

	["main", "category", "exercise"]
	  .forEach(screen => { 
	    $(screen).classList.remove("active");
  	});

      $(id).classList.add("active");
}

function vibrate(pattern = [300, 200, 300]) {

  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }

}

function testVibration() {

  console.log("Testing vibration...");

  if ("vibrate" in navigator) {

    navigator.vibrate(1000);

    console.log("✅ Vibrate supported");

  } else {

    console.log("❌ Vibrate NOT supported");

    alert("Vibration not supported on this device/browser");

  }

}


/* ===================================================
		CARD COMPONENTS
=================================================== */


function createExerciseCard(name, index) {
  return `
    <div class="card" onclick="openExercise(${index})">
      <span class="left">${name}</span>
      <span class="arrow">›</span>
    </div>
  `;
}

function renderExerciseCards(exercises) {

  let html = "";

  exercises.forEach((e, i) => {
    html += createExerciseCard(e.navn, i);
  });

  return html;

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


/* ===================================================
		STRENGTH FILTERS
=================================================== */


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


/* ===================================================
		PAGE RENDERERS
=================================================== */


function renderStrengthPage(exercises) {

  let html = "<h2>STYRKE</h2>";

  html += createStrengthFilters();

  html += renderExerciseCards(exercises);

  return html;

}


function renderCategoryPage(cat, exercises) {

  let html = `<h2>${cat.toUpperCase()}</h2>`;

  if (cat === "oppvarming") {

    const totalSeconds = oppvarming.reduce(
      (sum, exercise) =>
        sum + (exercise.timer || 0),
      0
    );

    const totalMinutes =
      Math.floor(totalSeconds / 60);

    html += `
      <button
        class="start-workout-btn"
        onclick="startOppvarming()">

        🔥 Start Oppvarming (${totalMinutes} min)

      </button>
    `;
  }

  if (cat === "styrke") {
    html += createStrengthFilters();
  }

  html += renderExerciseCards(exercises);

  return html;
}


function renderExercise() {
  const e = currentList[currentIndex];

 const html = `
  ${renderMedia(e)}
  ${renderProgress()}
  ${renderExerciseHeader(e)}
  ${renderRepetition(e)}
  ${renderExerciseDetails(e)}
  ${renderFremgang(e)}
  ${renderTags(e)}
  ${renderTimer(e)}
  ${renderVideoButton(e)}
`;


  $("exercise").innerHTML = html;
  show("exercise");
}


/* ===================================================
		MENU & CATEGORIES
=================================================== */


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

  $("menu").innerHTML = html;
}


function openCategory(cat) {

  const category =
    categories.find(c => c.id === cat);

  activeStrengthFilter = "Alle";

  currentList = category.data;

  currentScreen = "category";

  $("category").innerHTML =
    renderCategoryPage(
      cat,
      currentList
    );

  show("category");

}


function filterStrength(tag) {

  activeStrengthFilter = tag;

  const exercises =
    tag === "Alle"
      ? styrke
      : styrke.filter(exercise =>
          exercise.styrkeTag.includes(tag)
        );

  currentList = exercises;

  $("category").innerHTML =
    renderStrengthPage(exercises);

}


function startOppvarming() {

  openExercise(0, true);

}


/* ===================================================
		EXERCISE COMPONENTS
=================================================== */

function renderMedia(e) {

	if (e.videoFile) {

 	 return `
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
	if (e.bilde) {

	return `<img src="${e.bilde}">`;
	}
	return "";
}


function renderRepetition(e) {

  if (!e.repetisjon) {
    return "";
  }

  return `
    <b>Repetisjon:</b>
    <div class="exercise-repetisjon">
      ${e.repetisjon}
    </div>
  `;
}


function renderTags(e) {

  if (!e.styrkeTag) {
    return "";
  }

  let html = '<div class="tag-container">';

  e.styrkeTag.forEach(tag => {

    html += `
      <span class="exercise-tag">
        ${tag}
      </span>
    `;

  });

  html += "</div>";

  return html;

}

function renderFremgang(e) {

  if (!e.fremgang) {
    return "";
  }

  let html = "<b>Fremgangsmåte:</b>";

  e.fremgang.forEach(f => {

    if (f.startsWith("Steg")) {

      const deler = f.split(":");
      const steg = deler[0] + ":";
      const tekst = deler.slice(1).join(":");

      html += `
        <div class="fremgang-linje">
          <strong>${steg}</strong>
          ${tekst}
        </div>
      `;

    } else {

      html += `
        <div class="fremgang-linje">
          ${f}
        </div>
      `;

    }

  });

  return html;

}


function renderTimer(e) {

  if (!e.timer) {
    return "";
  }

const circumference =
2 * Math.PI * CONFIG.TIMER.RING_RADIUS;

  return `
    <div style="display:flex;justify-content:center;margin:20px 0;">

      <svg width="160" height="160">

        <circle
          cx="80"
          cy="80"
          r="${CONFIG.TIMER.RING_RADIUS}"
          stroke="${CONFIG.TIMER.COLORS.BACKGROUND}"
          stroke-width="10"
          fill="none"
        />

        <circle
          id="progressRing"
          cx="80"
          cy="80"
          r="${CONFIG.TIMER.RING_RADIUS}"
          stroke="${CONFIG.TIMER.COLORS.NORMAL}"
          stroke-width="10"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="${circumference}"
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
    <button onclick="startTimer(${e.timer})">
      ▶️ Start
    </button>
    <button onclick="resetTimer(${e.timer})">
      🔄 Reset
    </button>
  </div>

  <button onclick="testVibration()">
    📳 Test Vibrasjon
  </button>

</div>
  `;
}


function renderVideoButton(e) {

  if (!e.video) {
    return "";
  }

  return `
    <button onclick="window.open('${e.video}')">
      ▶ Se video
    </button>
  `;
}

function renderExerciseDetails(e) {

  return (
    renderList("Muskelgruppe:", e.muskelgruppe) +
    renderList("Utstyr:", e.utstyr) +
    renderList("Fokus:", e.fokus) +
    renderList("Sjekkpunkter:", e.sjekkpunkter)
  );

}

function renderProgress() {

  return `
    <div class="progress-bar">
      ${getProgressBar()}
    </div>
  `;

}


function renderExerciseHeader(e) {

  let html = `<h1>${e.navn}</h1>`;

  if (e.tid) {
    html += `<h2>${e.tid}</h2>`;
  }

  return html;

}

/* ===================================================
		EXERCISE NAVIGATION
=================================================== */


function openExercise(i, autoStart = false) {

  resetTimerState();

  keepScreenOn();

  currentIndex = i;
  currentScreen = "exercise";

const exercise = $("exercise");

if (exercise) {
  exercise.style.opacity = "0";
}

  setTimeout(() => {

  renderExercise();

  const exercise = $("exercise");

  if (exercise) {
    exercise.style.opacity = "1";
  }


if (autoStart) {

    const exercise = currentList[currentIndex];


if (exercise.timer) {

  const video = $("exerciseVideo");


if (video) {

  video.addEventListener("loadedmetadata", () => {

  setTimeout(() => {
    startTimer(exercise.timer);
  }, exercise.autoStartDelay ||
	CONFIG.AUTO_START_DELAY);
}, 
	{ once: true });

  } else {

    setTimeout(() => {
      startTimer(exercise.timer);
    }, exercise.autoStartDelay ||
	CONFIG.AUTO_START_DELAY);

  	    }

	   }

  	  }


	 }, CONFIG.EXERCISE_FADE_DELAY);

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



/* ===================================================
		TIMER MODULE
=================================================== */


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

$("timerDisplay").innerHTML = "✅ Ferdig!";

  vibrate([500, 200, 500]);


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

  $("timerDisplay").innerHTML =
    minutes + ":" + String(seconds).padStart(2, "0");

  const ring = $("progressRing");

if (ring) {
  ring.style.transition = "stroke-dashoffset 1s linear";
}

  if (ring && totalTime > 0) {

    const radius =
	CONFIG.TIMER.RING_RADIUS;
    const circumference = 2 * Math.PI * CONFIG.TIMER.RING_RADIUS;

    const progress = remainingTime / totalTime;


    ring.style.strokeDasharray =
  circumference + " " + circumference;

    ring.style.strokeDashoffset =
      circumference * (1 - progress);
if (remainingTime <= CONFIG.TIMER.RED_WARNING) 
{
  ring.style.stroke = CONFIG.TIMER.COLORS.DANGER;
}
else if ( remainingTime <= CONFIG.TIMER.ORANGE_WARNING) 
{
  ring.style.stroke = CONFIG.TIMER.COLORS.WARNING;
}
else {
  ring.style.stroke = CONFIG.TIMER.COLORS.NORMAL;
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

  $("timerButtons").innerHTML = html;
}




/* ===================================================
		PROGRESS MODULE
=================================================== */

function getProgressBar() {

  const total = currentList.length;
  const current = currentIndex + 1;

  const percentage = Math.round((current / total) * 100);

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



/* ===================================================
		WAKE LOCK MODULE
=================================================== */


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

// Fallback for iOS
function preventSleepiOS() {
  setInterval(() => {
    // Liten usynlig scroll som holder skjermen aktiv
    window.scrollBy(0, 1);
    window.scrollBy(0, -1);
  }, CONFIG.IOS_SLEEP_PREVENTION);
}





/* ===================================================
		APP STARTUP
=================================================== */


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

preventSleepiOS();






