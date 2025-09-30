const audio = document.getElementById('audio');
const playlistContainer = document.getElementById('playlist');
const coverArt = document.getElementById('cover-art');
const trackInfo = document.getElementById('track-info');
const timeStamp = document.getElementById('time-stamp');
const volumeSlider = document.getElementById('volume-slider');
const playPauseBtn = document.getElementById('play-pause');

// Song list: easy to edit
const songs = [
  {
    title: 'Theme of Laura',
    artist: 'Akira Yamaoka',
    src: 'https://files.catbox.moe/h66drf.mp3',
    cover: 'https://i.imgur.com/OitkkAP.jpeg',
  },
  {
    title: 'Promise (Reprise)',
    artist: 'Akira Yamaoka',
    src: 'https://files.catbox.moe/61841p.mp3',
    cover: 'https://i.imgur.com/OitkkAP.jpeg',
  },
  {
    title: 'A Stranger',
    artist: 'A Perfect Circle',
    src: 'https://files.catbox.moe/0x6nto.mp3',
    cover: 'https://i.imgur.com/eCg5hnK.jpeg',
  },
  {
    title: 'Flying to You',
    artist: 'Ilaria Graziano',
    src: 'https://files.catbox.moe/pjabjo.mp3',
    cover: 'https://i.imgur.com/f5UFtBK.png',
  },
  {
    title: 'Valse de la Lune',
    artist: 'Ilaria Graziano',
    src: 'https://files.catbox.moe/d9226m.mp3',
    cover: 'https://i.imgur.com/zpXk9Ud.jpeg',
  },
  {
    title: 'Dogs and Angels',
    artist: 'Joyce',
    src: 'https://files.catbox.moe/0ctf0b.mp3',
    cover: 'https://i.imgur.com/zpXk9Ud.jpeg',
  },
  {
    title: 'CORAÇÃO SELVAGEM',
    artist: 'Joyce',
    src: 'https://files.catbox.moe/xc8k8m.mp3',
    cover: 'https://i.imgur.com/zpXk9Ud.jpeg',
  },
  {
    title: 'Cloud 9',
    artist: 'Maaya Sakamoto',
    src: 'https://files.catbox.moe/w8py10.mp3',
    cover: 'https://i.imgur.com/f5UFtBK.png',
  },
  {
    title: 'Tell Me What the Rain Knows',
    artist: 'Maaya Sakamoro',
    src: 'https://files.catbox.moe/fmtp5d.mp3',
    cover: 'https://i.imgur.com/f5UFtBK.png',
  },
  {
    title: 'Requiem',
    artist: 'Yoko Kanno',
    src: 'https://files.catbox.moe/f3c2ux.mp3',
    cover: 'https://i.imgur.com/zpXk9Ud.jpeg',
  },
  {
    title: 'Leaving on Red Hill',
    artist: 'Yoko Kanno',
    src: 'https://files.catbox.moe/7k5d2x.mp3',
    cover: 'https://i.imgur.com/zpXk9Ud.jpeg',
  },
  {
    title: 'Paradiso',
    artist: 'Yoko Kanno',
    src: 'https://files.catbox.moe/cerk8e.mp3',
    cover: 'https://i.imgur.com/zpXk9Ud.jpeg',
  },
  {
    title: "Heaven's Not Enough",
    artist: 'Steve Conte',
    src: 'https://files.catbox.moe/7jog7u.mp3',
    cover: 'https://i.imgur.com/f5UFtBK.png',
  },
  {
    title: "I Know I'm a Wolf",
    artist: 'Young Heretics',
    src: 'https://files.catbox.moe/6gn9k4.mp3',
    cover: 'https://i.imgur.com/VK9CIu3.jpeg',
  },
];

// Generate playlist HTML
songs.forEach((song, index) => {
  const div = document.createElement('div');
  div.classList.add('track');
  if (index === 0) div.classList.add('active');
  div.dataset.index = index;
  div.textContent = `♡  ${song.title}`; // Only show song title in playlist
  playlistContainer.appendChild(div);
});

// Initialize volume at 10%
audio.volume = 0.1;
volumeSlider.value = audio.volume;

// Play a track by index
function playTrack(index) {
  const song = songs[index];
  audio.src = song.src;
  coverArt.src = song.cover;
  trackInfo.textContent = `❤︎ ${song.title} – ${song.artist} ❤︎`;

  // Update active class
  document.querySelectorAll('.track').forEach((t) => t.classList.remove('active'));
  document.querySelector(`.track[data-index="${index}"]`).classList.add('active');

  audio.play();
}

// Track click event
document.querySelectorAll('.track').forEach((track) => {
  track.addEventListener('click', () => {
    playTrack(track.dataset.index);
  });
});

// Play/pause button
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

// Update timestamp
audio.addEventListener('timeupdate', () => {
  const formatTime = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  timeStamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
});

// Volume slider
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Auto-next track
audio.addEventListener('ended', () => {
  let currentIndex = parseInt(document.querySelector('.track.active').dataset.index);
  let nextIndex = (currentIndex + 1) % songs.length;
  playTrack(nextIndex);
});

// Start first track
playTrack(0);
