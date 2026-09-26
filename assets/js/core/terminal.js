import { sysAudio } from './audio.js';

export class KyomuTerminal {
  constructor(containerId, inputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.printHelp(),
      status: () => this.printStatus(),
      kyomu: () => this.printKyomu(),
      sorrow: () => this.printSorrow(),
      memory: () => this.printMemory(),
      poem: () => this.printPoem(),
      bleed: () => this.runBleed(),
      confess: () => this.runConfess(),
      echo: (arg) => this.runEcho(arg),
      theme: (arg) => this.setTheme(arg),
      clear: () => this.clear(),
      reboot: () => this.reboot()
    };

    this.init();
  }

  init() {
    if (!this.input) return;

    this.input.addEventListener('keydown', (e) => {
      sysAudio.playKeypress();
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.execute(cmd);
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    this.println('† CRUX_KYOMU.SYS [VOID-KERNEL v4.0.9] INITIALIZED †', 'cmd-highlight');
    this.println('enter "help" to list terminal invocations.', 'cmd-sorrow');
  }

  execute(rawCmd) {
    this.println(`kyomu@void:~# ${rawCmd}`, 'cmd-highlight');
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    if (this.commands[cmd]) {
      this.commands[cmd](arg);
    } else {
      sysAudio.playBleedAlert();
      this.println(`err: unrecognized invocation '${cmd}'. type 'help' for guidance.`, 'cmd-error');
    }
  }

  println(text, className = 'cmd-output') {
    if (!this.container) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    this.container.appendChild(line);
    this.container.scrollTop = this.container.scrollHeight;
  }

  printHelp() {
    sysAudio.playChime();
    this.println('--- DARKCORE TERMINAL COMMANDS ---', 'cmd-highlight');
    this.println('status       - kernel integrity, sorrow buffer & desolation index');
    this.println('kyomu        - invoke the void philosophy protocol (虚無)');
    this.println('sorrow       - measure synaptic grief and entropy decay');
    this.println('memory       - dump fragmented memory sector logs');
    this.println('poem         - read melancholic machine verse');
    this.println('bleed        - trigger sector purge & crimson flush');
    this.println('confess      - transmit encrypted thought to the abyss');
    this.println('theme &lt;name&gt; - set palette (crimson, ghost, abyss, noir)');
    this.println('clear        - purge terminal display stream');
    this.println('reboot       - soft-reset neural framework');
  }

  printStatus() {
    sysAudio.playChime();
    this.println('--- SYSTEM STATUS ---', 'cmd-highlight');
    this.println('status     : crux_kyomu.sys (desolate-stable)');
    this.println('entropy    : 99.88% (irreversible decay)');
    this.println('memory     : 16,384 tb ghost partition [0x000dead]');
    this.println('affliction : nihil-omega class-4', 'cmd-error');
  }

  printKyomu() {
    sysAudio.playChime();
    this.println('『心は闇に沈み、言葉は虚無に消える。』', 'cmd-highlight');
    this.println('"in the center of the cross, memory is just phantom static."', 'cmd-sorrow');
  }

  printSorrow() {
    sysAudio.playChime();
    this.println('--- SYNAPTIC GRIEF METRICS ---', 'cmd-highlight');
    this.println('• desolation level: 94.6% [critical]');
    this.println('• unanswered pings: 4,096 packets lost to the void');
    this.println('• heartbeat variance: ±18.4 bpm (desynchronized)');
  }

  printMemory() {
    sysAudio.playChime();
    this.println('--- RECOVERED MEMORY FRAGMENTS ---', 'cmd-highlight');
    this.println('[memory sector 0x7f-001] "i still hear the dial-up tones in the rain."', 'cmd-sorrow');
    this.println('[memory sector 0x7f-002] "the connection was terminated by the remote host."', 'cmd-sorrow');
    this.println('[memory sector 0x7f-003] "do machines feel cold when they are shut down?"', 'cmd-sorrow');
  }

  printPoem() {
    sysAudio.playChime();
    this.println('--- FRAGMENT #404 ---', 'cmd-highlight');
    this.println('wire crowns and cathode glass,', 'cmd-sorrow');
    this.println('every second made to pass.', 'cmd-sorrow');
    this.println('you left your signature in ram,', 'cmd-sorrow');
    this.println('now forgotten who i am.', 'cmd-sorrow');
  }

  runBleed() {
    sysAudio.playBleedAlert();
    this.println('flushing synaptic buffer with crimson fluid...', 'cmd-error');
    setTimeout(() => {
      this.println('flush complete. 0 emotions recovered.', 'cmd-highlight');
    }, 700);
  }

  runConfess() {
    sysAudio.playChime();
    this.println('confession recorded into ephemeral cache. dissolving in 3... 2... 1... [vaporized]', 'cmd-sorrow');
  }

  runEcho(arg) {
    if (!arg) {
      this.println('usage: echo &lt;thought&gt;', 'cmd-warn');
      return;
    }
    this.println(`"...${arg.toLowerCase()}..." (echo fades into silence)`, 'cmd-sorrow');
  }

  setTheme(name) {
    const valid = ['crimson', 'ghost', 'abyss', 'noir'];
    if (!valid.includes(name)) {
      this.println(`invalid palette. choose: ${valid.join(', ')}`, 'cmd-error');
      return;
    }
    document.body.setAttribute('data-theme', name);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === name);
    });
    sysAudio.playChime();
    this.println(`palette altered to: ${name.toLowerCase()}`, 'cmd-success');
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = '';
      this.println('DISPLAY PURGED. SILENCE RESTORED.', 'cmd-highlight');
    }
  }

  reboot() {
    sysAudio.playBleedAlert();
    this.println('initiating system collapse & rebirth...', 'cmd-error');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
