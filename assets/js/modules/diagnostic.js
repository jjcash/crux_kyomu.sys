/**
 * Darkcore & Sadcore Diagnostic telemetry & sorrow hex memory stream
 */
export function initDiagnostics() {
  const hexContainer = document.getElementById('hex-stream');
  const sorrowIndexEl = document.getElementById('val-sorrow-index');
  const decayRateEl = document.getElementById('val-decay-rate');
  const pulseEl = document.getElementById('val-pulse');

  const sadcoreHexTokens = ['00', '1a', 'de', 'ad', '66', '6f', '07', 'ff', '8b', '44', '00', 'b1', 'ee', 'd0'];

  function generateDarkHex() {
    const addr = '0x' + (0x7f0000 + Math.floor(Math.random() * 0xffff)).toString(16).toLowerCase();
    let bytes = [];
    for (let i = 0; i < 8; i++) {
      bytes.push(sadcoreHexTokens[Math.floor(Math.random() * sadcoreHexTokens.length)]);
    }
    return `${addr}  ${bytes.slice(0, 4).join(' ')}  ${bytes.slice(4).join(' ')}`;
  }

  // Update Hex Stream
  if (hexContainer) {
    setInterval(() => {
      const lines = [];
      for (let i = 0; i < 6; i++) {
        lines.push(generateDarkHex());
      }
      hexContainer.innerHTML = lines.join('<br>');
    }, 150);
  }

  // Live telemetry pulse
  setInterval(() => {
    if (sorrowIndexEl) {
      const sorrow = (92 + Math.random() * 6).toFixed(1);
      sorrowIndexEl.textContent = `${sorrow}%`;
    }
    if (decayRateEl) {
      const decay = (0.04 + Math.random() * 0.03).toFixed(3);
      decayRateEl.textContent = `${decay} Δ/s`;
    }
    if (pulseEl) {
      const bpm = Math.floor(52 + Math.random() * 16);
      pulseEl.textContent = `${bpm} bpm`;
    }
  }, 2000);
}
