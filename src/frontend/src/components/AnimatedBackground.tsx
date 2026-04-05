import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface Props {
  intensity?: "full" | "subtle";
}

export default function AnimatedBackground({ intensity = "full" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    // Config based on intensity
    const isSubtle = intensity === "subtle";
    const PARTICLE_COUNT = isSubtle ? 45 : 80;
    const CONNECTION_DISTANCE = isSubtle ? 100 : 140;
    const MOUSE_REPEL_DIST = isSubtle ? 80 : 100;
    const OPACITY_MIN = isSubtle ? 0.08 : 0.15;
    const OPACITY_RANGE = isSubtle ? 0.14 : 0.4;
    const LINE_ALPHA_MULT = isSubtle ? 0.12 : 0.22;
    const ORB_PULSE_BASE = isSubtle ? 0.025 : 0.06;
    const ORB_PULSE_AMP = isSubtle ? 0.012 : 0.03;

    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Spawn particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * OPACITY_RANGE + OPACITY_MIN,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      for (const p of particles) {
        // Gentle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) {
          p.vx = (p.vx / speed) * 1.2;
          p.vy = (p.vy / speed) * 1.2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.75 0.115 75 / ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);

          if (d < CONNECTION_DISTANCE) {
            const alpha = (1 - d / CONNECTION_DISTANCE) * LINE_ALPHA_MULT;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `oklch(0.65 0.085 200 / ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw glowing orbs in the background
      const time = Date.now() * 0.0006;
      const orbs = [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 180, hue: 207 },
        { x: canvas.width * 0.82, y: canvas.height * 0.65, r: 220, hue: 28 },
        { x: canvas.width * 0.5, y: canvas.height * 0.85, r: 150, hue: 75 },
      ];

      for (const orb of orbs) {
        const pulse = ORB_PULSE_BASE + Math.sin(time + orb.hue) * ORB_PULSE_AMP;
        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r,
        );
        grad.addColorStop(0, `oklch(0.55 0.12 ${orb.hue} / ${pulse})`);
        grad.addColorStop(1, `oklch(0.55 0.12 ${orb.hue} / 0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [intensity]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: intensity === "subtle" ? 0.7 : 0.9 }}
      />
    </div>
  );
}
