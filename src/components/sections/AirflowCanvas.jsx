import { useEffect, useRef } from 'react';

const WARM = [244, 90, 10];
const COOL = [7, 133, 214];
const SOFT = [217, 228, 238];

/**
 * Lightweight flow-field canvas: warm and cool particles drifting along
 * curved airflow paths. Pure 2D canvas, DPR aware, pauses off-screen and
 * renders a single static frame for reduced-motion visitors.
 */
export default function AirflowCanvas({
  className = '',
  density = 24000,
  minParticles = 36,
  maxParticles = 120,
  speed = 0.55,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let raf = 0;
    let running = false;
    let time = 0;

    const makeParticle = (seedAnywhere = true) => {
      const warm = Math.random() < 0.5;
      const palette = Math.random() < 0.82 ? (warm ? WARM : COOL) : SOFT;
      return {
        x: seedAnywhere ? Math.random() * width : Math.random() * width * 0.15,
        y: seedAnywhere ? Math.random() * height : Math.random() * height,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 260 + Math.random() * 320,
        color: palette,
        alpha: 0.14 + Math.random() * 0.4,
        width: 0.6 + Math.random() * 1.1,
      };
    };

    const seed = () => {
      const count = Math.round(
        Math.min(maxParticles, Math.max(minParticles, (width * height) / density)),
      );
      particles = Array.from({ length: count }, () => makeParticle());
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) drawFrame(true);
    };

    const flowAt = (x, y) => {
      const nx = x / Math.max(width, 1);
      const ny = y / Math.max(height, 1);
      return (
        Math.sin(nx * 3.1 + time * 0.35) * 0.9 +
        Math.cos(ny * 2.4 - time * 0.22) * 0.8 +
        Math.sin((nx + ny) * 2.0 + time * 0.15) * 0.5 -
        0.25
      );
    };

    const drawFrame = (staticFrame = false) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const previousX = p.x;
        const previousY = p.y;
        const angle = flowAt(p.x, p.y);
        const targetVx = Math.cos(angle) * speed;
        const targetVy = Math.sin(angle) * speed * 0.45;

        p.vx += (targetVx - p.vx) * 0.06;
        p.vy += (targetVy - p.vy) * 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        const fade = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.strokeStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${
          p.alpha * fade
        })`;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(previousX, previousY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (staticFrame) continue;

        if (p.life > p.maxLife || p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
          Object.assign(p, makeParticle(false));
          if (Math.random() < 0.5) p.x = width + 20;
        }
      }
    };

    const loop = () => {
      if (!running) return;
      time += 0.016;
      drawFrame();
      raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) start();
              else stop();
            },
            { threshold: 0.05 },
          )
        : null;

    resize();
    if (reduced) drawFrame(true);
    else {
      observer?.observe(canvas);
      start();
    }

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [density, maxParticles, minParticles, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
