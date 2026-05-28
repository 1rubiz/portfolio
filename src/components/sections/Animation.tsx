import React, { useEffect, useRef } from 'react';

// Particle system for data flow
class Particle {
  x: number;
  y: number;
  z: number;
  w: number;
  vw: number;
  life: number;
  maxLife: number;
  hue: number;

  constructor() {
    this.x = (Math.random() - 0.5) * 150;
    this.y = (Math.random() - 0.5) * 150;
    this.z = (Math.random() - 0.5) * 150;
    this.w = -200;
    this.vw = 2 + Math.random() * 2;
    this.life = 0;
    this.maxLife = 100;
    this.hue = Math.random() > 0.5 ? 180 : 300;
  }

  update() {
    this.w += this.vw;
    this.life++;

    if (this.w > 200 || this.life > this.maxLife) {
      this.x = (Math.random() - 0.5) * 150;
      this.y = (Math.random() - 0.5) * 150;
      this.z = (Math.random() - 0.5) * 150;
      this.w = -200;
      this.life = 0;
      this.hue = Math.random() > 0.5 ? 180 : 300;
    }
  }
}

const TesseractHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref is null');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2d context');
      return;
    }

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let rotation = 0;
    let rotation4D = 0;

    const particles: Particle[] = [];
    for (let i = 0; i < 200; i++) {
      particles.push(new Particle());
    }

    console.log('Animation initialized with', particles.length, 'particles');

    // 4D rotation matrices
    const rotate4D = (x: number, y: number, z: number, w: number, angle: number) => {
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // XW rotation
      const x1 = x * cosA - w * sinA;
      const w1 = x * sinA + w * cosA;

      // YZ rotation
      const y1 = y * cosA - z * sinA;
      const z1 = y * sinA + z * cosA;

      return { x: x1, y: y1, z: z1, w: w1 };
    };

    const project = (x: number, y: number, z: number, w: number, centerX: number, centerY: number) => {
      const distance = 400;
      const w1 = 1 / (distance - w);
      const z1 = 1 / (distance - z);

      return {
        x: x * w1 * z1 * 200 + centerX,
        y: y * w1 * z1 * 200 + centerY,
        scale: w1 * z1
      };
    };

    // Tesseract vertices (4D hypercube)
    const vertices: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices.push([
        (i & 1) ? 100 : -100,
        (i & 2) ? 100 : -100,
        (i & 4) ? 100 : -100,
        (i & 8) ? 100 : -100
      ]);
    }

    // Edges connecting vertices
    const edges: number[][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices[i][k] !== vertices[j][k]) diff++;
        }
        if (diff === 1) edges.push([i, j]);
      }
    }

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Very light fade for trail effect - makes animation visible
      ctx.fillStyle = 'rgba(5, 8, 22, 0.05)';
      ctx.fillRect(0, 0, width, height);

      rotation += 0.003;
      rotation4D += 0.005;

      const rotatedVertices = vertices.map(v => {
        const r = rotate4D(v[0], v[1], v[2], v[3], rotation4D);
        const r2 = rotate4D(r.x, r.y, r.z, r.w, rotation);
        return project(r2.x, r2.y, r2.z, r2.w, centerX, centerY);
      });

      // Draw tesseract edges with BRIGHT colors
      edges.forEach(edge => {
        const v1 = rotatedVertices[edge[0]];
        const v2 = rotatedVertices[edge[1]];

        const gradient = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${v1.scale * 0.9})`);
        gradient.addColorStop(1, `rgba(255, 0, 255, ${v2.scale * 0.9})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = (v1.scale + v2.scale) * 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      });

      ctx.shadowBlur = 0;

      // Draw vertices with GLOW
      rotatedVertices.forEach((v, i) => {
        const size = v.scale * 6;
        const isBackend = vertices[i][3] > 0;

        // Outer glow
        ctx.beginPath();
        ctx.arc(v.x, v.y, size * 2, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, size * 2);
        glowGradient.addColorStop(0, isBackend
          ? `rgba(255, 0, 255, ${v.scale * 0.6})`
          : `rgba(0, 255, 255, ${v.scale * 0.6})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(v.x, v.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isBackend
          ? `rgba(255, 50, 255, ${v.scale})`
          : `rgba(50, 255, 255, ${v.scale})`;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Update and draw particles with BRIGHT colors
      particles.forEach(p => {
        p.update();

        const r = rotate4D(p.x, p.y, p.z, p.w, rotation4D);
        const r2 = rotate4D(r.x, r.y, r.z, r.w, rotation);
        const proj = project(r2.x, r2.y, r2.z, r2.w, centerX, centerY);

        const alpha = Math.max(0.3, (1 - p.life / p.maxLife)) * proj.scale * 1.5;
        const size = proj.scale * 3;

        // Outer glow for particles
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size * 3, 0, Math.PI * 2);

        const outerGradient = ctx.createRadialGradient(
          proj.x, proj.y, 0,
          proj.x, proj.y, size * 3
        );
        outerGradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha * 0.4})`);
        outerGradient.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = outerGradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          proj.x, proj.y, 0,
          proj.x, proj.y, size
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 80%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 60%, ${alpha * 0.5})`);

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050816] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"

      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
            DIMENSIONAL
          </h1>
          <p className="text-xl md:text-2xl text-cyan-200 font-light tracking-wider">
            Data flows through infinite dimensions
          </p>
          <div className="flex gap-4 justify-center items-center text-sm text-cyan-300/80 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></span>
              FRONTEND
            </span>
            <span>→</span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pink-400 rounded-full animate-pulse shadow-lg shadow-pink-400/50"></span>
              BACKEND
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400/60 text-xs font-mono">
        4D HYPERCUBE PROJECTION
      </div>
    </div>
  );
};

export default TesseractHero;