import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const principles = [
  "Face-verified registration with duplicate-account rejection",
  "Mandatory profile completion before any marketplace action",
  "Skill testing before freelancers can bid or appear in search",
  "Job chat opens only after a verified hire",
  "Off-platform payment/contact attempts are blocked in chat",
];


export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-10 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-sky-800">
            Enforced Ecosystem
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-serif text-5xl leading-tight text-slate-950 md:text-6xl">
              Freelance work with platform rules that actually hold.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              ForgeMarket is built for controlled hiring. Identity is verified,
              freelancer skills are tested, chat is moderated, and payments stay
              on-platform from offer to review.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/register">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="ghost">
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-slate-200 bg-slate-950 text-white">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">System Guardrails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-300">
            {principles.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="border-amber-200 bg-amber-50/80">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Clients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
            Post jobs, review verified bids, hire one freelancer, pay through the
            platform, and close contracts with final ratings.
          </CardContent>
        </Card>
        <Card className="border-sky-200 bg-sky-50/80">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Freelancers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
            Complete profile, select predefined skills, pass tests, then compete
            for jobs with rating-backed trust signals.
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/80">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Platform</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
            Fraud rules are enforced by the backend. Chat and payment actions only
            exist when the system says the user is eligible.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
