import { initBackgroundFX } from './core/background-fx.js';
import { KyomuTerminal } from './core/terminal.js';
import { initDiagnostics } from './modules/diagnostic.js';
import { initLogs } from './modules/logs.js';
import { initNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize darkcore background FX
  initBackgroundFX('bg-canvas');

  // Initialize terminal
  const terminal = new KyomuTerminal('terminal-output', 'terminal-cmd-input');
  window.kyomuTerminalInstance = terminal;

  // Initialize real-time diagnostics
  initDiagnostics();

  // Initialize live system logs
  initLogs();

  // Initialize navigation & control buttons
  initNavigation();

  // Live system clock updater
  const clockEl = document.getElementById('sys-clock');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      clockEl.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' utc [dec-void]';
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  console.log('%c[CRUX_KYOMU.SYS] darkcore/sadcore kernel initialized. entropy: 99.88%', 'color: #ff1a53; font-weight: bold; background: #030306; padding: 4px;');
});
