const playlist = [
  {
    title: "Dreams",
    artist: "Lost Sky",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "On & On",
    artist: "Cartoon ft. Daniel Levi",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "images/cover2.jpg"
  },
  {
    title: "Fearless",
    artist: "Lost Sky",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "images/cover3.jpg"
  },
  {
    title: "Sky High",
    artist: "Elektronomia",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "images/cover4.jpg"
  },
  {
    title: "Nekozilla",
    artist: "Different Heaven",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "images/cover5.jpg"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playlistContainer = document.getElementById("playlist");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const libraryList = document.getElementById("libraryList");
const emptyLibrary = document.getElementById("emptyLibrary");

const volumeSlider = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Navigation
const navHome = document.getElementById("nav-home");
const navSearch = document.getElementById("nav-search");
const navLibrary = document.getElementById("nav-library");
const mainContent = document.getElementById("main-content");
const searchContent = document.getElementById("search-content");
const libraryContent = document.getElementById("library-content");

// ---- State ----
const SAVED_KEY = "soundwave_saved_indices";
let savedSet = new Set(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]").map(Number));

let currentQueue = playlist.map((_, i) => i); // array of base indices
let currentIdxInQueue = 0;                    // position inside currentQueue
let isPlaying = false;
let isShuffle = false;
let isRepeatOne = false;
let isSeeking = false;

// ---- Helpers ----
function saveSaved() {
  localStorage.setItem(SAVED_KEY, JSON.stringify([...savedSet]));
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function setActiveNav(target) {
  [navHome, navSearch, navLibrary].forEach(el => el.classList.remove("active"));
  target.classList.add("active");
}
function showSection(section) {
  mainContent.classList.toggle("hidden", section !== "home");
  searchContent.classList.toggle("hidden", section !== "search");
  libraryContent.classList.toggle("hidden", section !== "library");
}

navHome.addEventListener("click", () => { setActiveNav(navHome); showSection("home"); });
navSearch.addEventListener("click", () => { setActiveNav(navSearch); showSection("search"); });
navLibrary.addEventListener("click", () => { setActiveNav(navLibrary); showSection("library"); });

// Build queues for lists
const fullQueue = () => playlist.map((_, i) => i);
const libraryQueue = () => [...savedSet].filter(i => playlist[i]); // ensure exists

// Renderers
function makeSongRow(baseIndex, queueForThisList) {
  const song = playlist[baseIndex];
  const row = document.createElement("div");
  row.className = "song";
  row.dataset.index = String(baseIndex);
  row.innerHTML = `
    <img src="${song.cover}" alt="cover">
    <div class="meta">
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
    </div>
    <div class="actions">
      <button class="like-btn ${savedSet.has(baseIndex) ? "liked" : ""}" title="Like">♥</button>
    </div>
  `;

  // Play on row click with queue context
  row.addEventListener("click", () => {
    startQueue(queueForThisList, baseIndex);
  });

  // Like/unlike
  const likeBtn = row.querySelector(".like-btn");
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (savedSet.has(baseIndex)) {
      savedSet.delete(baseIndex);
      likeBtn.classList.remove("liked");
    } else {
      savedSet.add(baseIndex);
      likeBtn.classList.add("liked");
    }
    saveSaved();
    renderLibrary(); // keep library in sync
  });

  return row;
}

function displayList(container, indices) {
  container.innerHTML = "";
  indices.forEach(idx => container.appendChild(makeSongRow(idx, indices)));
  updateActiveHighlight(); // keep highlight in sync after re-render
}

function renderHome() {
  displayList(playlistContainer, fullQueue());
}

function renderSearch(query = "") {
  const q = query.trim().toLowerCase();
  const indices = fullQueue().filter(i => {
    const s = playlist[i];
    return s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
  });
  displayList(searchResults, indices);
}

function renderLibrary() {
  const indices = libraryQueue();
  displayList(libraryList, indices);
  emptyLibrary.style.display = indices.length ? "none" : "block";
}

function updateActiveHighlight() {
  const allRows = document.querySelectorAll(".song");
  const currentBaseIndex = currentQueue[currentIdxInQueue];
  allRows.forEach(el => {
    const isCurrent = Number(el.dataset.index) === currentBaseIndex;
    el.classList.toggle("playing", isCurrent);
  });
}

// ---- Playback ----
function loadBaseIndex(baseIndex, playNow = false) {
  const song = playlist[baseIndex];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;

  if (playNow) playSong();

  // Preload duration when metadata is ready
  audio.onloadedmetadata = () => {
    durationEl.textContent = formatTime(audio.duration || 0);
  };

  updateActiveHighlight();
}

function startQueue(queue, startBaseIndex) {
  currentQueue = queue.slice();
  currentIdxInQueue = Math.max(0, currentQueue.indexOf(startBaseIndex));
  loadBaseIndex(currentQueue[currentIdxInQueue], true);
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
  updateActiveHighlight();
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶";
}

function nextInQueue() {
  if (!currentQueue.length) return;
  if (isShuffle && !isRepeatOne) {
    // pick a random different index
    let next = currentIdxInQueue;
    if (currentQueue.length > 1) {
      while (next === currentIdxInQueue) {
        next = Math.floor(Math.random() * currentQueue.length);
      }
    }
    currentIdxInQueue = next;
  } else if (!isRepeatOne) {
    currentIdxInQueue = (currentIdxInQueue + 1) % currentQueue.length;
  }
  // if repeatOne is on, we don't advance
  loadBaseIndex(currentQueue[currentIdxInQueue], true);
}

function prevInQueue() {
  if (!currentQueue.length) return;
  currentIdxInQueue = (currentIdxInQueue - 1 + currentQueue.length) % currentQueue.length;
  loadBaseIndex(currentQueue[currentIdxInQueue], true);
}

// Initial renders
renderHome();
renderSearch("");
renderLibrary();

// Load first song with full queue
startQueue(fullQueue(), 0);

// ---- Events ----
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextInQueue);
prevBtn.addEventListener("click", prevInQueue);

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  // toggle repeat one
  isRepeatOne = !isRepeatOne;
  repeatBtn.classList.toggle("active", isRepeatOne);
});

// Auto play next when song ends (respect repeat one)
audio.addEventListener("ended", () => {
  if (isRepeatOne) {
    audio.currentTime = 0;
    playSong();
  } else {
    nextInQueue();
  }
});

// Progress Bar + time
audio.addEventListener("timeupdate", () => {
  if (isSeeking) return; // don't fight with dragging
  const { duration, currentTime } = audio;
  if (!isNaN(duration) && duration > 0) {
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  }
});

// Click + drag seek
function seekByClientX(clientX) {
  const rect = progressContainer.getBoundingClientRect();
  const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  audio.currentTime = ratio * (audio.duration || 0);
}

progressContainer.addEventListener("mousedown", (e) => {
  isSeeking = true;
  seekByClientX(e.clientX);
});

window.addEventListener("mousemove", (e) => {
  if (isSeeking) seekByClientX(e.clientX);
});
window.addEventListener("mouseup", () => {
  isSeeking = false;
});

// Volume Control
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Search
searchInput?.addEventListener("input", (e) => {
  renderSearch(e.target.value);
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  const tag = (e.target && e.target.tagName) || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  if (e.code === "Space") {
    e.preventDefault();
    isPlaying ? pauseSong() : playSong();
  } else if (e.code === "ArrowRight") {
    audio.currentTime = Math.min((audio.currentTime || 0) + 5, audio.duration || 0);
  } else if (e.code === "ArrowLeft") {
    audio.currentTime = Math.max((audio.currentTime || 0) - 5, 0);
  } else if (e.code === "ArrowUp") {
    e.preventDefault();
    audio.volume = Math.min(1, (audio.volume || 0) + 0.1);
    volumeSlider.value = String(audio.volume);
  } else if (e.code === "ArrowDown") {
    e.preventDefault();
    audio.volume = Math.max(0, (audio.volume || 0) - 0.1);
    volumeSlider.value = String(audio.volume);
  }
});
