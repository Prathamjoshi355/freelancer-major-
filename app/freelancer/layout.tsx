import type { ReactNode } from "react"
import { FreelancerNav } from "@/components/freelancer/nav"

export default function FreelancerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-6 h-max">
          <h1 className="mb-4 text-balance text-xl font-semibold">Freelancer</h1>
          <FreelancerNav />
        </aside>
        <main className="min-h-[60vh]">{children}</main>
      </div>
    </div>
  )
}
