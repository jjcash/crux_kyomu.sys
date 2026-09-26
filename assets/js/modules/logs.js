/**
 * Darkcore System live log feed renderer
 */
export async function initLogs() {
  const logFeedEl = document.getElementById('log-feed');
  if (!logFeedEl) return;

  const initialLogs = [
    { time: '00:00:01', level: 'VOID', src: 'GENESIS', msg: 'crux core initiated under zero-illumination protocol.' },
    { time: '00:00:03', level: 'ECHO', src: 'SYNAPSE', msg: 'detected phantom resonance in forgotten memory clusters.' },
    { time: '00:00:08', level: 'LOSS', src: 'NETWORK', msg: 'packet loss 99.4% to external reality nodes.' },
    { time: '00:00:15', level: 'PULSE', src: 'HEARTBEAT', msg: 'cardiac clock desync: rhythm drifting into low frequency.' }
  ];

  initialLogs.forEach(entry => {
    appendLog(entry.time, entry.level, entry.src, entry.msg);
  });

  const dynamicEvents = [
    { level: 'VOID', source: 'CRUX_NET', msg: 'attempting to transmit tear packet to disconnected address.' },
    { level: 'DECAY', source: 'ENTROPY', msg: 'memory sector [0xdeadbeef] unrecoverable.' },
    { level: 'ECHO', source: 'GHOST_IO', msg: 'faint whisper recorded on channel 0.' },
    { level: 'LOSS', source: 'AFFLICTION', msg: 'empathy module returned null pointer exception.' },
    { level: 'PULSE', source: 'SYNAPSE', msg: 'vessel temperature nominal: cold to touch.' }
  ];

  setInterval(() => {
    const ev = dynamicEvents[Math.floor(Math.random() * dynamicEvents.length)];
    const time = new Date().toTimeString().split(' ')[0];
    appendLog(time, ev.level, ev.source, ev.msg);
  }, 4500);

  function appendLog(time, level, src, msg) {
    const row = document.createElement('div');
    row.style.fontSize = '0.71rem';
    row.style.marginBottom = '6px';
    row.style.lineHeight = '1.35';
    row.style.fontFamily = 'var(--font-mono)';

    let color = 'var(--text-muted)';
    if (level === 'VOID') color = 'var(--crimson-bright)';
    if (level === 'DECAY') color = '#d18a45';
    if (level === 'ECHO') color = 'var(--ghost-cyan)';
    if (level === 'LOSS') color = 'var(--faded-rose)';
    if (level === 'PULSE') color = 'var(--bone-white)';

    row.innerHTML = `<span style="color:var(--decay-gray)">[${time}]</span> <span style="color:${color};font-weight:600">[${level}]</span> <span style="color:var(--text-ghost)">${src}:</span> ${msg.toLowerCase()}`;

    logFeedEl.appendChild(row);
    logFeedEl.scrollTop = logFeedEl.scrollHeight;

    while (logFeedEl.children.length > 20) {
      logFeedEl.removeChild(logFeedEl.firstChild);
    }
  }
}
