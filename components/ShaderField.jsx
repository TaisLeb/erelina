"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A soft, slowly-flowing warm gradient rendered in WebGL (Three.js).
 * Fills its relatively-positioned parent. Skipped on coarse pointers and
 * when reduced motion is requested. Pauses when off-screen / tab hidden.
 */
export default function ShaderField({ className = "", intensity = 1 }) {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uIntensity: { value: intensity },
      // warm organic palette
      uC1: { value: new THREE.Color("#ece4d7") },
      uC2: { value: new THREE.Color("#d8b48c") },
      uC3: { value: new THREE.Color("#b9c0a3") },
      uC4: { value: new THREE.Color("#a78f78") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime; uniform vec2 uRes; uniform float uIntensity;
        uniform vec3 uC1, uC2, uC3, uC4;

        vec2 hash(vec2 p){
          p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)));
          return -1.0 + 2.0*fract(sin(p)*43758.5453123);
        }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(dot(hash(i+vec2(0.0,0.0)), f-vec2(0.0,0.0)),
                         dot(hash(i+vec2(1.0,0.0)), f-vec2(1.0,0.0)), u.x),
                     mix(dot(hash(i+vec2(0.0,1.0)), f-vec2(0.0,1.0)),
                         dot(hash(i+vec2(1.0,1.0)), f-vec2(1.0,1.0)), u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0; float a = 0.5;
          for(int i=0;i<5;i++){ v += a*noise(p); p*=2.0; a*=0.5; }
          return v;
        }
        void main(){
          vec2 uv = vUv;
          float ar = uRes.x/uRes.y;
          vec2 p = vec2(uv.x*ar, uv.y);
          float t = uTime*0.04;
          float n1 = fbm(p*1.6 + vec2(t, t*0.6));
          float n2 = fbm(p*2.4 - vec2(t*0.8, t*0.4) + n1);
          float m = smoothstep(-0.6, 0.8, n1);
          float m2 = smoothstep(-0.4, 0.9, n2);
          vec3 col = mix(uC1, uC2, m);
          col = mix(col, uC3, m2*0.55);
          col = mix(col, uC4, smoothstep(0.5,1.0,n2)*0.35);
          // film grain
          float g = fract(sin(dot(uv*uRes, vec2(12.9898,78.233)))*43758.5453);
          col += (g-0.5)*0.04;
          float alpha = uIntensity;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => (visible = e.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);

    const clock = new THREE.Clock();
    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [intensity]);

  return <div className={`shader-field ${className}`} ref={mount} aria-hidden="true" />;
}
