import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { CtaStrip } from "@/components/landing/cta-strip"

export default function HomePage() {
  return (
    <main className="font-sans">
      <SiteHeader />
      <Hero />
      <Features />
      <CtaStrip />
      <SiteFooter />
    </main>
  )
}
