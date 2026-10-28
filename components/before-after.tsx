'use client'

import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const SRC = '/images/before-after-composite.png'

export function BeforeAfter() {
  const { t } = useLanguage()
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(96, Math.max(4, p)))
  }, [])

  return (
    <section id="results" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-background px-4 py-1.5 text-xs font-medium text-navy">{t.beforeAfter.badge}</span>
          <h2 className="font-serif text-3xl font-semibold text-navy text-balance md:text-4xl">{t.beforeAfter.title}</h2>
          <p className="leading-relaxed text-muted-foreground text-pretty">{t.beforeAfter.subtitle}</p>
        </div>
        <figure className="overflow-hidden rounded-3xl border border-border bg-card">
          <div
            ref={containerRef}
            className="relative aspect-[3/2] w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              dragging.current = true
              updateFromClientX(e.clientX)
            }}
            onPointerMove={(e) => {
              if (dragging.current) updateFromClientX(e.clientX)
            }}
            onPointerUp={() => {
              dragging.current = false
            }}
            onPointerCancel={() => {
              dragging.current = false
            }}
          >
            <img src={SRC} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: 'inset(0 0 0 50%)' }} />
            <img src={SRC} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: 'inset(0 ' + (100 - pos) + '% 0 0)' }} />
            <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-navy-foreground">{t.beforeAfter.labels.before}</span>
            <span className="absolute right-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-navy-foreground">{t.beforeAfter.labels.after}</span>
            <div className="absolute inset-y-0" style={{ left: pos + '%' }} aria-hidden="true">
              <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow" />
              <div className="absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg">
                <MoveHorizontal className="size-5" />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={t.beforeAfter.labels.before + ' / ' + t.beforeAfter.labels.after}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <figcaption className="px-6 py-4 text-center text-sm text-muted-foreground">{t.beforeAfter.note}</figcaption>
        </figure>
      </div>
    </section>
  )
}
