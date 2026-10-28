'use client'

import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const SRC = 'https://i.pinimg.com/736x/7d/2d/7b/7d2d7b002ec164b6f66227d259805c43.jpg'

export function BeforeAfter() {
  const { t } = useLanguage()
  const [pos, setPos] = useState(50)

  return (
    <section id="results" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-background px-4 py-1.5 text-xs font-medium text-navy">
            {t.beforeAfter.badge}
          </span>
          <h2 className="font-serif text-3xl font-semibold text-navy text-balance md:text-4xl">
            {t.beforeAfter.title}
          </h2>
          <p className="leading-relaxed text-muted-foreground text-pretty">{t.beforeAfter.subtitle}</p>
        </div>

        <figure className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative aspect-[3/2] w-full cursor-ew-resize select-none overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={SRC}
                alt={`${t.beforeAfter.title} — ${t.beforeAfter.labels.before} / ${t.beforeAfter.labels.after}`}
                draggable={false}
                className="pointer-events-none absolute left-0 top-1/2 h-auto w-[200%] max-w-none -translate-y-1/2"
              />
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              aria-hidden="true"
            >
              <img
                src={SRC}
                alt=""
                draggable={false}
                className="pointer-events-none absolute right-0 top-1/2 h-auto w-[200%] max-w-none -translate-y-1/2"
              />
            </div>

            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-navy-foreground">
              {t.beforeAfter.labels.before}
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-navy-foreground">
              {t.beforeAfter.labels.after}
            </span>

            <div
              className="pointer-events-none absolute inset-y-0"
              style={{ left: `${pos}%` }}
              aria-hidden="true"
            >
              <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow" />
              <div className="absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg">
                <MoveHorizontal className="size-5" />
              </div>
            </div>

            <input
              type="range"
              min={4}
              max={96}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={`${t.beforeAfter.labels.before} / ${t.beforeAfter.labels.after}`}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </figure>

        <p className="mt-6 text-center text-xs text-muted-foreground">{t.beforeAfter.note}</p>
      </div>
    </section>
  )
}
