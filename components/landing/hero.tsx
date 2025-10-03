import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-20 md:pt-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="text-balance text-3xl font-semibold text-slate-900 md:text-5xl">
            Hire top freelancers or find your next great client
          </h1>
          <p className="text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
            Post a job in minutes and connect with vetted talent. Or create your profile and start winning projects
            today.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/register">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Sign up free</Button>
            </Link>
            <Link href="/register/client">
              <Button variant="outline">Post a job</Button>
            </Link>
            <Link href="/register/freelancer" className="text-sm font-medium text-blue-600 hover:underline">
              Find freelancers
            </Link>
          </div>
          <ul className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <li className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">No upfront fees</li>
            <li>•</li>
            <li>Trusted by startups</li>
            <li>•</li>
            <li>Secure payments</li>
          </ul>
        </div>

        <div className="order-first md:order-none">
          <div className="relative overflow-hidden rounded-xl border border-slate-200">
            <img
              src="/collaboration-between-clients-and-freelancers.png"
              alt="Clients collaborating with freelancers"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
