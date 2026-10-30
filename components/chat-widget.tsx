'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ChevronRight, Send, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { CLINIC, type Lang } from '@/lib/translations'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

type ChatMessage = { role: 'user' | 'assistant'; text: string; local?: boolean; whatsapp?: boolean }

const STRINGS: Record<
  Lang,
  { title: string; subtitle: string; greeting: string; placeholder: string; send: string; open: string; whatsappCta: string; error: string; typing: string; tapHint: string; bookWhatsapp: string }
> = {
  fr: {
    title: 'Assistant du cabinet',
    subtitle: 'Réponses immédiates, 24h/24',
    greeting:
      'Bonjour et bienvenue au cabinet du Dr Issam Mahjoub ! Je peux vous renseigner sur nos services, les implants, ou la prise de rendez-vous. Comment puis-je vous aider ?',
    placeholder: 'Écrivez votre question…',
    send: 'Envoyer',
    open: 'Discuter avec notre assistant',
    whatsappCta: 'Ou réservez directement sur WhatsApp',
    error:
      "Je n'ai pas pu répondre pour le moment. Contactez le cabinet sur WhatsApp au +216 98 800 749, nous vous répondrons rapidement.",
    typing: "L'assistant écrit",
    tapHint: 'Réservez en un clic',
    bookWhatsapp: 'Réserver sur WhatsApp',
  },
  ar: {
    title: 'مساعد العيادة',
    subtitle: 'ردود فورية، على مدار الساعة',
    greeting:
      'مرحباً بكم في عيادة الدكتور عصام محجوب! يمكنني إخباركم بخدماتنا، زراعة الأسنان، أو كيفية حجز موعد. كيف يمكنني مساعدتكم؟',
    placeholder: 'اكتب سؤالك…',
    send: 'إرسال',
    open: 'تحدث مع مساعدنا',
    whatsappCta: 'أو احجز مباشرة عبر واتساب',
    error:
      'لم أتمكن من الرد في الوقت الحالي. تواصل مع العيادة عبر واتساب على ‎+216 98 800 749‎ وسنرد عليك بسرعة.',
    typing: 'المساعد يكتب الآن',
    tapHint: 'احجز بنقرة واحدة',
    bookWhatsapp: 'احجز عبر واتساب',
  },
  en: {
    title: 'Clinic assistant',
    subtitle: 'Instant answers, 24/7',
    greeting:
      "Hello and welcome to Dr Issam Mahjoub's clinic! I can tell you about our services, dental implants, or how to book an appointment. How can I help you?",
    placeholder: 'Type your question…',
    send: 'Send',
    open: 'Chat with our assistant',
    whatsappCta: 'Or book directly on WhatsApp',
    error:
      'I could not answer just now. Contact the clinic on WhatsApp at +216 98 800 749 and we will reply quickly.',
    typing: 'Assistant is typing',
    tapHint: 'Book in one tap',
    bookWhatsapp: 'Book on WhatsApp',
  },
}

export function ChatWidget() {
  const { lang } = useLanguage()
  const s = STRINGS[lang] ?? STRINGS.fr
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', text: s.greeting, local: true }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open ])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending, open])

  async function send() {
    const text = input.trim()
    if (!text || sending) return
    const next: ChatMessage[] = [...messages, { role: 'user', text }]
    setMessages(next)
    setInput('')
    setSending(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The static greeting stays local so it never anchors the model's language.
        // If the visitor typed Arabic script, ask for Arabic so even a fallback
        // reply comes back in the visitor's language.
        body: JSON.stringify({
          messages: next.filter((m) => !m.local),
          lang: /[\u0600-\u06FF]/.test(text) ? 'ar' : lang,
        }),
      })
      const data = await res.json().catch(() => null)
      const reply = data && typeof data.reply === 'string' && data.reply.trim() ? data.reply : s.error
      setMessages([...next, { role: 'assistant', text: reply, whatsapp: data?.whatsapp === true }])
    } catch {
      setMessages([...next, { role: 'assistant', text: s.error }])
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(70vh,540px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl shadow-black/25">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#14273D] via-navy to-[#2E6E9E] px-4 py-3 text-navy-foreground">
            <img
              src="/images/chat-icon.png"
              alt=""
              className="size-9 shrink-0 rounded-[28%] bg-white object-cover ring-1 ring-white/40"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{s.title}</span>
              <span className="block text-xs opacity-80">{s.subtitle}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-full p-1.5 transition-colors hover:bg-white/10"
            >
              <X className="size-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-secondary/40 px-3.5 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-navy text-navy-foreground'
                      : 'border border-border/60 bg-background text-foreground'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'assistant' && m.whatsapp && (
                  <div className="mt-2 w-[85%]">
                    <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-[#128C4B]">
                      <ArrowDown className="size-3.5 animate-bounce" />
                      {s.tapHint}
                    </div>
                    <a
                      href={CLINIC.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-4 py-3 text-white shadow-md shadow-[#25D366]/30 transition-transform hover:scale-[1.02]"
                    >
                      <WhatsAppIcon className="size-6 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">{s.bookWhatsapp}</span>
                        <span className="block text-xs opacity-90" dir="ltr">
                          {CLINIC.phoneDisplay}
                        </span>
                      </span>
                      <ChevronRight className="size-5 shrink-0 rtl:-scale-x-100" />
                    </a>
                  </div>
                )}
              </div>
            ))}
            {sending && (
              <div className="flex items-center gap-2 self-start rounded-2xl border border-border/60 bg-background px-3.5 py-2.5 shadow-sm">
                <span className="flex items-end gap-1" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="size-1.5 animate-bounce rounded-full bg-navy/70"
                      style={{ animationDelay: `${d * 160}ms`, animationDuration: '0.9s' }}
                    />
                  ))}
                </span>
                <span className="text-xs text-muted-foreground">{s.typing}…</span>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-background px-3.5 py-3">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                void send()
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={s.placeholder}
                maxLength={1000}
                className="min-w-0 flex-1 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label={s.send}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground transition-transform hover:scale-105 disabled:opacity-40"
              >
                <Send className="size-4 rtl:-scale-x-100" />
              </button>
            </form>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 block text-center text-xs font-medium text-navy underline-offset-2 hover:underline"
            >
              {s.whatsappCta} — {CLINIC.phoneDisplay}
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={s.open}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 shadow-xl shadow-black/20 ring-1 ring-black/10 transition-transform hover:scale-105"
      >
        {open ? (
          <span className="flex size-10 items-center justify-center rounded-full bg-navy text-navy-foreground">
            <X className="size-5" />
          </span>
        ) : (
          <img src="/images/chat-icon.png" alt="" className="size-10 rounded-[28%] object-cover" />
        )}
        <span className="hidden text-sm font-semibold text-navy sm:inline">{s.title}</span>
      </button>
    </>
  )
}
