import type React from "react"
import { FreelancerNav } from "@/components/nav-freelancer"

export default function FreelancerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[240px_1fr]">
      <FreelancerNav />
      <div className="space-y-4">{children}</div>
    </div>
  )
}
