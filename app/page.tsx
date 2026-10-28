'use client'

import { LanguageProvider } from '@/lib/language-context'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { WhyChooseUs } from '@/components/why-choose-us'
import { Testimonials } from '@/components/testimonials'
import { BeforeAfter } from '@/components/before-after'
import { Faq } from '@/components/faq'
import { AppointmentForm } from '@/components/appointment-form'
import { ContactMap } from '@/components/contact-map'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function Page() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <BeforeAfter />
        <Faq />
        <AppointmentForm />
        <ContactMap />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </LanguageProvider>
  )
}
