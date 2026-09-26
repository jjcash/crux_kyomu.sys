import { sysAudio } from '../core/audio.js';

export function initNavigation() {
  // Theme Switcher Buttons
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sysAudio.playKeypress();
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.dataset.theme;
      if (theme === 'noir') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', theme);
      }
    });
  });

  // Sound Effects & Ambient Drone Toggles
  const ambientToggle = document.getElementById('ambient-toggle-btn');
  if (ambientToggle) {
    ambientToggle.addEventListener('click', () => {
      const isPlaying = sysAudio.toggleAmbientDrone();
      ambientToggle.textContent = isPlaying ? '🕯️ DRONE: ON' : '🕯️ DRONE: OFF';
      ambientToggle.classList.toggle('active', isPlaying);
    });
  }

  // Action Buttons
  const actionBtns = document.querySelectorAll('.action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sysAudio.playKeypress();
      const action = btn.dataset.action;
      const term = window.kyomuTerminalInstance;
      if (term && action) {
        term.execute(action);
      }
    });
  });

  // Social Link Click Sounds
  const socialLinks = document.querySelectorAll('.social-link-item');
  socialLinks.forEach(link => {
    link.addEventListener('click', () => {
      sysAudio.playKeypress();
    });
  });
}
