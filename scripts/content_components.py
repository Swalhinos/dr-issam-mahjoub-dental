# -*- coding: utf-8 -*-
"""Full replacement contents for the new and rewritten components.

Used by scripts/rebrand.py: social icons (header/footer), social section,
implants section and the rewritten before/after slider. The slider shows the
two halves of ONE composite image via clip-path, never two unrelated photos.
"""

SOCIAL_ICONS_TSX = r'''import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/brand-icons'

const links = [
  { label: 'Facebook', url: 'https://www.facebook.com/docsam1979', Icon: FacebookIcon },
  { label: 'Instagram', url: 'https://www.instagram.com/dr.issam.mahjoub', Icon: InstagramIcon },
  { label: 'TikTok', url: 'https://www.tiktok.com/search?q=Issam%20Mahjoub%20dentiste', Icon: TikTokIcon },
]

export function SocialIcons({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const linkClass =
    tone === 'dark'
      ? 'text-navy-foreground/70 transition-colors hover:bg-navy-foreground/10 hover:text-primary'
      : 'text-muted-foreground transition-colors hover:bg-primary/10 hover:text-navy'
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map(({ label, url, Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`flex size-9 items-center justify-center rounded-full ${linkClass}`}
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  )
}
'''

SOCIAL_TSX = r'''\'use client\'

import { BadgeCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/brand-icons'

const FACEBOOK_URL = 'https://www.facebook.com/docsam1979'
const INSTAGRAM_URL = 'https://www.instagram.com/dr.issam.mahjoub'
const TIKTOK_PLACEHOLDER_URL = 'https://www.tiktok.com/search?q=Issam%20Mahjoub%20dentiste'

export function SocialSection() {
  const { t } = useLanguage()
  const cards = [
    { name: 'Facebook', handle: 'Issam Mahjoub', url: FACEBOOK_URL, desc: t.social.facebookDesc, Icon: FacebookIcon, verified: true },
    { name: 'Instagram', handle: '@dr.issam.mahjoub', url: INSTAGRAM_URL, desc: t.social.instagramDesc, Icon: InstagramIcon, verified: true },
    { name: 'TikTok', handle: 'TikTok', url: TIKTOK_PLACEHOLDER_URL, desc: t.social.tiktokDesc, Icon: TikTokIcon, verified: false },
  ]
  return (
    <section id="social" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-background px-4 py-1.5 text-xs font-medium text-navy">{t.social.badge}</span>
          <h2 className="font-serif text-3xl font-semibold text-navy text-balance md:text-4xl">{t.social.title}</h2>
          <p className="leading-relaxed text-muted-foreground text-pretty">{t.social.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ name, handle, url, desc, Icon, verified }) => (
            <article key={name} className="flex flex-col items-start gap-3 rounded-3xl border border-border bg-card p-6">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-navy">
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-navy">{name}</h3>
                <p className="text-sm text-muted-foreground">{handle}</p>
              </div>
              <p className="flex-1 leading-relaxed text-muted-foreground">{desc}</p>
              {verified ? (
                <span className="flex items-center gap-1.5 text-sm font-medium text-navy">
                  <BadgeCheck className="size-4" />
                  {t.social.verified}
                </span>
              ) : (
                <p className="text-sm font-medium text-amber-700">{t.social.tiktokNote}</p>
              )}
              <a href={url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground transition-colors hover:bg-navy/90">
                {t.social.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
'''

IMPLANTS_TSX = r'''use-client-marker

import { Anchor, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { CLINIC } from '@/lib/translations'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

export function ImplantsSection() {
  const { t } = useLanguage()
  return (
    <section id="implants" className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-6">
        <div className="flex flex-col items-start gap-4">
          <span className="rounded-full bg-background px-4 py-1.5 text-xs font-medium text-navy">{t.implants.badge}</span>
          <h2 className="font-serif text-3xl font-semibold text-navy text-balance md:text-4xl">{t.implants.title}</h2>
          <p className="leading-relaxed text-muted-foreground text-pretty">{t.implants.subtitle}</p>
          <ul className="flex flex-col gap-3">
            {t.implants.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-navy">
                  <Check className="size-4" />
                </span>
                <span className="leading-relaxed text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="bg-[#25D366] text-white hover:bg-[#1fb457]" render={<a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" />}>
            <WhatsAppIcon className="size-4" />
            {t.implants.cta}
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex size-56 items-center justify-center rounded-full bg-primary/10 md:size-72">
            <Anchor className="size-28 text-navy md:size-36" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
'''

BEFORE_AFTER_TSX = r'''use-client-marker

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
'''
