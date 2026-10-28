'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MoveHorizontal } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const images = ['/images/before-after-1.jpg', '/images/before-after-2.jpg']

function CompareSlider({
  src,
  title,
  before,
  after,
}: {
  src: string
  title: string
  before: string
  after: string
}) {
  const [pos, setPos] = useState(50)

  return (
    <figure className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative h-64 select-none md:h-80">
        <Image
          src={src}
          alt={`${title} — ${after}`}
          width={960}
          height={640}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={src}
            alt=""
            width={960}
            height={640}
            className="h-full w-full object-cover"
            style={{ filter: 'sepia(0.55) saturate(0.5) brightness(0.8) contrast(0.95)' }}
          />
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-navy-foreground">
          {before}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-navy-foreground">
          {after}
        </span>

        <div className="absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden="true">
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
          aria-label={`${before} / ${after} — ${title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="p-5 font-serif text-lg font-semibold text-navy">{title}</figcaption>
    </figure>
  )
}

export function BeforeAfter() {
  const { t } = useLanguage()

  return (
    <section id="results" className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-sky-soft px-4 py-1.5 text-xs font-medium text-navy">
          {t.beforeAfter.badge}
        </span>
        <h2 className="font-serif text-3xl font-semibold text-navy text-balance md:text-4xl">
          {t.beforeAfter.title}
        </h2>
        <p className="leading-relaxed text-muted-foreground text-pretty">{t.beforeAfter.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {t.beforeAfter.cases.map((caseTitle, i) => (
          <CompareSlider
            key={caseTitle}
            src={images[i % images.length]}
            title={caseTitle}
            before={t.beforeAfter.labels.before}
            after={t.beforeAfter.labels.after}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">{t.beforeAfter.note}</p>
    </section>
  )
}
