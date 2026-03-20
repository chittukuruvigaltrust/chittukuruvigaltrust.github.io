// Audio is unmuted by default; user can click the toggle to mute.
function initAudio() {
  const audio = document.getElementById('sparrow-audio');
  const icon = document.getElementById('audio-icon');
  const label = document.getElementById('audio-label');
  const btn = document.getElementById('audio-toggle');

  if (!audio) return;

  // Ensure audio is unmuted and has a consistent starting volume.
  audio.muted = false;
  audio.volume = 0.3;

  // Update UI immediately to reflect the "unmuted" state.
  if (icon) icon.className = 'bx bx-volume-full';
  if (label) label.textContent = 'Mute';

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        if (btn) btn.classList.add('playing');
      })
      .catch((error) => {
        // Autoplay can be blocked by the browser; keep UI as unmuted,
        // but stop the "playing" animation until the user clicks.
        if (btn) btn.classList.remove('playing');
        console.error('Audio playback failed:', error);
      });
  }
}

function toggleAudio() {
  const audio = document.getElementById('sparrow-audio');
  const icon = document.getElementById('audio-icon');
  const label = document.getElementById('audio-label');
  const btn = document.getElementById('audio-toggle');

  if (!audio) return;

  // If it's currently unmuted, the toggle should mute it (and stop playback).
  if (!audio.muted) {
    audio.muted = true;
    audio.pause();
    if (icon) icon.className = 'bx bx-volume-mute';
    if (label) label.textContent = '🐦 Listen';
    if (btn) btn.classList.remove('playing');
    return;
  }

  // Otherwise, unmute and try to play.
  audio.muted = false;
  audio.volume = 0.3;
  if (icon) icon.className = 'bx bx-volume-full';
  if (label) label.textContent = 'Mute';

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        if (btn) btn.classList.add('playing');
      })
      .catch(error => {
        // Autoplay restrictions can block playback even after unmuting.
        if (btn) btn.classList.remove('playing');
        console.error('Audio playback failed:', error);
      });
  }
}

// Script tag is included at the end of the page, so we can init immediately.
initAudio();

