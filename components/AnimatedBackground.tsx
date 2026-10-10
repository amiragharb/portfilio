import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frameId = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.min(128, Math.max(48, Math.round((width * height) / 13200)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.45 + 0.55,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number, still = false) => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (!still) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.phase += 0.012;

          if (particle.x < -12) particle.x = width + 12;
          if (particle.x > width + 12) particle.x = -12;
          if (particle.y < -12) particle.y = height + 12;
          if (particle.y > height + 12) particle.y = -12;
        }
      }

      const linkDistance = width < 600 ? 125 : 168;
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const neighbor = particles[j];
          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const distance = Math.hypot(dx, dy);
          if (distance >= linkDistance) continue;

          const alpha = (1 - distance / linkDistance) * 0.2;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.strokeStyle = `rgba(150, 104, 178, ${alpha})`;
          context.lineWidth = 0.7;
          context.stroke();
        }

        const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
        const nearPointer = pointerDistance < 220;
        const pulse = 0.55 + Math.sin(particle.phase + time * 0.0005) * 0.2;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + (nearPointer ? 0.5 : 0), 0, Math.PI * 2);
        context.fillStyle = nearPointer
          ? `rgba(208, 157, 239, ${Math.min(0.95, pulse + 0.25)})`
          : `rgba(185, 148, 205, ${pulse * 0.68})`;
        context.fill();

        if (nearPointer) {
          context.beginPath();
          context.arc(particle.x, particle.y, 5 + pulse * 3, 0, Math.PI * 2);
          context.strokeStyle = `rgba(201, 145, 234, ${0.16 + pulse * 0.08})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      }

      if (!still) frameId = window.requestAnimationFrame((nextTime) => draw(nextTime));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    const onMotionPreferenceChange = () => {
      window.cancelAnimationFrame(frameId);
      if (reducedMotion.matches) draw(0, true);
      else frameId = window.requestAnimationFrame((time) => draw(time));
    };

    resize();
    if (reducedMotion.matches) draw(0, true);
    else frameId = window.requestAnimationFrame((time) => draw(time));
    const onResize = () => {
      window.cancelAnimationFrame(frameId);
      resize();
      if (reducedMotion.matches) draw(0, true);
      else frameId = window.requestAnimationFrame((time) => draw(time));
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-glow ambient-glow-one" />
      <div className="ambient-glow ambient-glow-two" />
      <div className="ambient-starfield" />
      <div className="ambient-grid" />
      <div className="ambient-orbit orbit-large-one" />
      <div className="ambient-orbit orbit-large-two" />
      <div className="ambient-orbit orbit-wide" />
      <div className="ambient-beam beam-one" />
      <div className="ambient-beam beam-two" />
      <canvas ref={canvasRef} className="ambient-network" />
      <span className="ambient-cross cross-one">+</span>
      <span className="ambient-cross cross-two">+</span>
      <span className="ambient-cross cross-three">+</span>
      <span className="ambient-cross cross-four">+</span>
      <span className="ambient-cross cross-five">+</span>
    </div>
  );
};

export default AnimatedBackground;
