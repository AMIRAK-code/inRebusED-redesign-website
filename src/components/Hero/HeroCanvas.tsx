import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

interface Dot {
  x: number; y: number
  vx: number; vy: number
  r: number
  baseAlpha: number
  // 0 = white, 1 = orange, 2 = spicy
  colorIdx: number
}

// RGB triples for the three tones
const PALETTE = [
  [255, 255, 255],   // white
  [245, 130,  32],   // orange
  [232,  69,  26],   // spicy
] as const

const DOT_COUNT    = 88
const LINK_DIST    = 160   // px — max distance to draw a connecting line
const SPEED        = 0.28  // max velocity component

function makeDot(w: number, h: number): Dot {
  // 70 % white, 22 % orange, 8 % spicy
  const roll = Math.random()
  const colorIdx = roll < 0.70 ? 0 : roll < 0.92 ? 1 : 2
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * SPEED * 2,
    vy: (Math.random() - 0.5) * SPEED * 2,
    r: Math.random() * 1.6 + 0.6,
    baseAlpha: colorIdx === 0
      ? Math.random() * 0.28 + 0.12   // white: faint
      : Math.random() * 0.45 + 0.30,  // orange/spicy: brighter
    colorIdx,
  }
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    let dots: Dot[] = []

    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas
      canvas.width  = w
      canvas.height = h
      // rebuild dots on significant resize so they fill the new size
      dots = Array.from({ length: DOT_COUNT }, () => makeDot(w, h))
    }

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)

      // ── move & bounce ──────────────────────────────────────
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0)  { d.x = 0; d.vx =  Math.abs(d.vx) }
        if (d.x > w)  { d.x = w; d.vx = -Math.abs(d.vx) }
        if (d.y < 0)  { d.y = 0; d.vy =  Math.abs(d.vy) }
        if (d.y > h)  { d.y = h; d.vy = -Math.abs(d.vy) }
      }

      // ── connecting lines (O n²; 88 dots → ~3 800 checks/frame) ──
      for (let i = 0; i < dots.length - 1; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist >= LINK_DIST) continue

          const t = 1 - dist / LINK_DIST          // 0 → 1 as dots approach
          const alpha = t * t * 0.18              // quadratic fade, max 18 %

          // Line colour: mix toward orange when either dot is coloured
          const usedColor = (a.colorIdx > 0 || b.colorIdx > 0)
            ? PALETTE[1]   // orange tint
            : PALETTE[0]   // white
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${usedColor[0]},${usedColor[1]},${usedColor[2]},${alpha})`
          ctx.lineWidth   = 0.8
          ctx.stroke()
        }
      }

      // ── dots ─────────────────────────────────────────────
      for (const d of dots) {
        const [r, g, b] = PALETTE[d.colorIdx]
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${d.baseAlpha})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.heroBgCanvas} aria-hidden="true" />
}
