/**
 * Darkcore & Sadcore Canvas Visuals:
 * - Melancholic Falling Digital Rain / Tears
 * - Floating Ember Particles
 * - Faint Ethereal Crux Cruciform Matrix
 */
export function initBackgroundFX(canvasId = 'bg-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Kanji & Sadcore Glyphs
  const chars = '虚無孤独崩壊死心悲傷†‡†01';
  const fontSize = 13;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  // Floating ambient embers
  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.5,
    speedY: Math.random() * 0.4 + 0.1,
    speedX: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.6 + 0.2
  }));

  function draw() {
    ctx.fillStyle = 'rgba(3, 3, 6, 0.12)';
    ctx.fillRect(0, 0, width, height);

    // 1. Digital Tear Fall
    ctx.fillStyle = 'rgba(153, 0, 43, 0.45)';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (i % 4 === 0) {
        ctx.fillStyle = 'rgba(86, 143, 153, 0.35)'; // ghostly cyan
      } else {
        ctx.fillStyle = 'rgba(153, 0, 43, 0.35)'; // crimson blood
      }

      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    // 2. Floating dust / sorrow motes
    for (let p of particles) {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.fillStyle = `rgba(220, 214, 205, ${p.alpha * 0.3})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}
