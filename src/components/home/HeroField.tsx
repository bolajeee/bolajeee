"use client";

import { useEffect, useRef } from "react";

// Particles drift as loose "signals" and settle onto a grid near the pointer
// and as the hero scrolls away: messy input resolving into structure.

const VERTEX = `
attribute vec2 a_home;
attribute vec3 a_seed;
uniform float u_time;
uniform float u_order;
uniform vec2 u_pointer;
uniform float u_aspect;
uniform float u_dpr;
varying float v_mix;

void main() {
  float t = u_time * (0.05 + a_seed.z * 0.07);
  vec2 wild = vec2(
    sin(a_seed.x * 6.2831 + t) * 0.85 + sin(t * 1.7 + a_seed.y * 9.0) * 0.18,
    cos(a_seed.y * 6.2831 + t * 0.8) * 0.85 + cos(t * 1.3 + a_seed.x * 7.0) * 0.18
  );
  vec2 d = (a_home - u_pointer) * vec2(u_aspect, 1.0);
  float near = 1.0 - smoothstep(0.08, 0.42, length(d));
  float m = clamp(max(near, u_order), 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  v_mix = m;
  vec2 pos = mix(wild, a_home, m);
  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = mix(2.4, 3.6, m) * u_dpr;
}`;

const FRAGMENT = `
precision mediump float;
uniform vec3 u_ink;
uniform vec3 u_accent;
varying float v_mix;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  if (dot(c, c) > 0.25) discard;
  vec3 color = mix(u_ink, u_accent, smoothstep(0.55, 1.0, v_mix));
  float alpha = mix(0.5, 1.0, v_mix);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

function hexToRgb(value: string, fallback: [number, number, number]): [number, number, number] {
  const hex = value.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 800px)").matches;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Grid homes, slightly jittered so the structure reads as organic, not a spreadsheet.
    const cols = small ? 30 : 64;
    const rows = small ? 34 : 36;
    const count = cols * rows;
    const homes = new Float32Array(count * 2);
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const cx = i % cols;
      const cy = Math.floor(i / cols);
      homes[i * 2] = -0.96 + (cx / (cols - 1)) * 1.92 + (Math.random() - 0.5) * 0.004;
      homes[i * 2 + 1] = -0.94 + (cy / (rows - 1)) * 1.88 + (Math.random() - 0.5) * 0.004;
      seeds[i * 3] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
    }

    const bind = (data: Float32Array, name: string, size: number) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const location = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    };
    bind(homes, "a_home", 2);
    bind(seeds, "a_seed", 3);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uTime = u("u_time"), uOrder = u("u_order"), uPointer = u("u_pointer");
    const uAspect = u("u_aspect"), uDpr = u("u_dpr"), uInk = u("u_ink"), uAccent = u("u_accent");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const applyTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      gl.uniform3fv(uInk, hexToRgb(styles.getPropertyValue("--ink"), [0.09, 0.1, 0.11]));
      gl.uniform3fv(uAccent, hexToRgb(styles.getPropertyValue("--field-accent"), [0.45, 0.62, 0.18]));
    };
    applyTheme();
    const themeObserver = new MutationObserver(() => { applyTheme(); if (reduceMotion) draw(0); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, width / Math.max(height, 1));
      gl.uniform1f(uDpr, dpr);
    };
    resize();
    const resizeObserver = new ResizeObserver(() => { resize(); if (reduceMotion) draw(0); });
    resizeObserver.observe(canvas);

    // Pointer starts off-canvas so the field opens loose, then follows with easing.
    const target = { x: 0.55, y: -2 };
    const pointer = { x: 0.55, y: -2 };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const scrollOrder = () => {
      const rect = canvas.getBoundingClientRect();
      return Math.min(1, Math.max(0, -rect.top / (rect.height * 0.7)));
    };

    function draw(time: number) {
      pointer.x += (target.x - pointer.x) * 0.08;
      pointer.y += (target.y - pointer.y) * 0.08;
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(uTime, time / 1000);
      gl!.uniform1f(uOrder, reduceMotion ? 0.5 : scrollOrder());
      gl!.uniform2f(uPointer, pointer.x, pointer.y);
      gl!.drawArrays(gl!.POINTS, 0, count);
    }

    let frame = 0;
    let visible = true;
    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };

    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); });
    const onVisibility = () => (document.hidden ? stop() : start());

    if (reduceMotion) {
      draw(0);
    } else {
      visibility.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />;
}
