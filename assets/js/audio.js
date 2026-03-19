// Audio starts muted by default. Only play on explicit user toggle.
function toggleAudio() {
  const audio = document.getElementById('sparrow-audio');
  const icon = document.getElementById('audio-icon');
  const label = document.getElementById('audio-label');
  const btn = document.getElementById('audio-toggle');

  if (!audio) return;

  if (audio.paused) {
    audio.volume = 0.3;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (icon) icon.className = 'bx bx-volume-full';
        if (label) label.textContent = 'Mute';
        if (btn) btn.classList.add('playing');
      }).catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  } else {
    audio.pause();
    if (icon) icon.className = 'bx bx-volume-mute';
    if (label) label.textContent = '🐦 Listen';
    if (btn) btn.classList.remove('playing');
  }
}

