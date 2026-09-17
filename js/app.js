
let currentList = [];
let currentIndex = 0;
let currentScreen = "main";
let timerInterval;
let remainingTime = 0;
let totalTime = 0;
let timerRunning = false;

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

currentList = category.data;
  currentScreen = "category";

  let html = "<h2>" + cat.toUpperCase() + "</h2>";

  currentList.forEach((e,i)=>{
   html += '<div class="card" onclick="openExercise(' + i + ')">' +
          '<span class="left">' + e.navn + '</span>' +
          '<span class="arrow">›</span>' +
        '</div>';

  });

  document.getElementById("category").innerHTML = html;
  show("category");
}



function openExercise(i, autoStart = false) {

  clearInterval(timerInterval);
  timerRunning = false;
  remainingTime = 0;
  totalTime = 0;

  keepScreenOn();

  currentIndex = i;
  currentScreen = "exercise";

  renderExercise();

  if (autoStart) {

    const exercise = currentList[currentIndex];

if (exercise.timer) {

  setTimeout(() => {
    startTimer(exercise.timer);
  }, exercise.autoStartDelay || 3000);

}

  }

}


function renderExercise() {
  let e = currentList[currentIndex];

  let html = "";

  if (e.bilde) html += '<img src="' + e.bilde + '">';

  html += "<h1>" + e.navn + "</h1>";
  html += "<h2>" + e.tid + "</h2>";
  html += "<b>Fokus:</b><ul>";
e.fokus.forEach(f => {  
  html += "<li>" + f + "</li>";
});
html += "</ul>";

if (e.sjekkpunkter) {
  html += "<b>Sjekkpunkter:</b><ul>";
  e.sjekkpunkter.forEach(s => {
    html += "<li>" + s + "</li>";
  });
  html += "</ul>";
}

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

  <button onclick="startTimer(${e.timer})">
    ▶️ Start
  </button>

  <button onclick="pauseTimer()">
    ⏸️ Pause
  </button>

  <button onclick="resetTimer(${e.timer})">
    🔄 Reset
  </button>

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
      currentIndex--;
      renderExercise();
    } else {
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
    currentIndex++;
    renderExercise();
  }
}

function goMenu() {
clearInterval(timerInterval);
timerRunning = false;
remainingTime = 0;
totalTime = 0;  
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

    timerInterval = setInterval(() => {

      remainingTime--;

      updateTimerDisplay();


     if (remainingTime <= 0) {

  remainingTime = 0;

  clearInterval(timerInterval);
  timerRunning = false;

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
}

function resetTimer(seconds) {

  clearInterval(timerInterval);

  timerRunning = false;

  remainingTime = seconds;

  updateTimerDisplay();
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
console.log(progress);

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


