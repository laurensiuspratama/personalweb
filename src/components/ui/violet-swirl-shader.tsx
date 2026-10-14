"use client"

import * as React from "react"

export interface VioletSwirlShaderProps {
  /** Kecepatan putaran animasi shader (default: 0.65) */
  speed?: number
  /** Intensitas kilau pusaran ungu (0.2 - 1.5, default: 1.0) */
  intensity?: number
  /** Aktifkan interaksi terhadap gerakan mouse (default: true) */
  interactive?: boolean
  /** Class tambahan untuk wrapper */
  className?: string
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;

  mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse - 0.5) * 0.65;

    // Jarak ke pusat + bias interaksi kursor
    vec2 p = uv - mouse * 0.35;
    float r = length(p);

    // Efek pusaran spiral (Swirl distortion)
    float swirlAngle = (1.15 / (r + 0.42)) + u_time * 0.28;
    p *= rot(swirlAngle * 0.55);

    // Iterative Domain Warping untuk lipatan cairan sutra (Fluid folds)
    vec2 warp = p * 2.4;
    for (float i = 1.0; i < 6.0; i++) {
      warp.x += 0.42 / i * sin(i * 2.2 * warp.y + u_time * 0.75 + i * 1.1);
      warp.y += 0.42 / i * cos(i * 2.0 * warp.x + u_time * 0.65 + i * 1.7);
    }

    // Pola gelombang utama
    float wave = 0.5 + 0.5 * sin(warp.x * 1.6 + warp.y * 1.6 + u_time * 0.4);
    float ridge = pow(max(0.0, sin(length(warp) * 1.8 - u_time * 0.5)), 2.4);

    // Palet Warna Violet Swirl (Obsidian -> Deep Indigo -> Amethyst -> Electric Violet -> Orchid)
    vec3 colVoid = vec3(0.03, 0.015, 0.06);      // #08040f
    vec3 colDeepViolet = vec3(0.18, 0.05, 0.38); // #2e0d61
    vec3 colAmethyst = vec3(0.48, 0.13, 0.81);   // #7a21cf
    vec3 colOrchid = vec3(0.78, 0.24, 0.92);     // #c73deb
    vec3 colGlow = vec3(0.95, 0.82, 1.0);        // Soft Lavender Specular

    vec3 color = mix(colVoid, colDeepViolet, smoothstep(0.05, 0.75, wave));
    color = mix(color, colAmethyst, smoothstep(0.35, 0.92, wave * 1.15));
    color += colOrchid * ridge * 0.48 * u_intensity;
    color += colGlow * pow(ridge, 4.0) * 0.25 * u_intensity;

    // Vignette lembut agar teks dan kartu di atasnya tetap kontras dan tajam
    float vignette = smoothstep(1.45, 0.15, length(uv));
    color *= mix(0.35, 1.05, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function VioletSwirlShader({
  speed = 0.65,
  intensity = 1.0,
  interactive = true,
  className = "",
}: VioletSwirlShaderProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    })
    if (!gl) return

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Fullscreen quad buffer
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const posLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const resLoc = gl.getUniformLocation(program, "u_resolution")
    const timeLoc = gl.getUniformLocation(program, "u_time")
    const mouseLoc = gl.getUniformLocation(program, "u_mouse")
    const intensityLoc = gl.getUniformLocation(program, "u_intensity")

    let raf = 0
    let width = 1
    let height = 1
    let targetMouseX = 0.5
    let targetMouseY = 0.5
    let currentMouseX = 0.5
    let currentMouseY = 0.5
    const startTime = performance.now()
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return
      targetMouseX = e.clientX / Math.max(1, window.innerWidth)
      targetMouseY = 1.0 - e.clientY / Math.max(1, window.innerHeight)
    }

    const render = (now: number) => {
      currentMouseX += (targetMouseX - currentMouseX) * 0.05
      currentMouseY += (targetMouseY - currentMouseY) * 0.05

      const elapsed = reducedMotion ? 2.5 : ((now - startTime) * 0.001) * speed

      gl.uniform2f(resLoc, width, height)
      gl.uniform1f(timeLoc, elapsed)
      gl.uniform2f(mouseLoc, currentMouseX, currentMouseY)
      gl.uniform1f(intensityLoc, intensity)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      if (!reducedMotion) {
        raf = requestAnimationFrame(render)
      }
    }

    resize()
    raf = requestAnimationFrame(render)

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [speed, intensity, interactive])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#08040f] ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full block opacity-90"
      />
      {/* Lapisan gradien halus agar kontras teks tetap terjaga di seluruh layar */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />
    </div>
  )
}