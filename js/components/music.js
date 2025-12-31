// DOM element references
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const volume = document.getElementById('volume');
const volumeContainer = document.getElementById('volume-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const collapseBtn = document.getElementById('collapse-btn');  // ADD THIS LINE

// Song playlist
const songs = [
  {
    name: 'pyrefly_forest',
    title: "Pyrefly Forest - Cat's Cradle",
    cover: 'pyrefly_forest.jpg'
  },
  {
    name: 'come_back',
    title: 'возвращайся - angel vox',
    cover: 'come_back.jpg'
  },
  {
    name: 'too_much',
    title: 'too much - otuka',
    cover: 'too_much.jpg'
  }
];

// Autoplay when page loads
window.addEventListener('load', () => {
  playSong();
});

// Track current song
let songIndex = 0;
loadSong(songs[songIndex]);

// Load song details into player
function loadSong(song) {
  title.textContent = song.title;
  audio.src = `assets/music/audio/${song.name}.mp3`;
  cover.src = `assets/music/covers/${song.cover}`;
}

// Play current song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// Pause current song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

// Go to previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Go to next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar as song plays
function updateProgress({ target }) {
  const { duration } = target;
  const { currentTime } = target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Seek to position when progress bar is clicked
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audio;
  audio.currentTime = (clickX / width) * duration;
}

// Set volume when volume bar is clicked
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.volume = clickX / width;
  volume.style.width = `${(clickX / width) * 100}%`;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Collapse/expand functionality
collapseBtn.addEventListener('click', () => {
  musicContainer.classList.toggle('collapsed');
  const icon = collapseBtn.querySelector('i');
  
  if (musicContainer.classList.contains('collapsed')) {
    icon.classList.remove('fa-chevron-left');
    icon.classList.add('fa-chevron-right');
  } else {
    icon.classList.remove('fa-chevron-right');
    icon.classList.add('fa-chevron-left');
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeContainer.addEventListener('click', setVolume);
audio.addEventListener('ended', nextSong);

// Set initial volume
audio.volume = 0.4;
volume.style.width = '40%';
