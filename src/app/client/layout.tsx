import type React from "react"
import { ClientNav } from "@/components/nav-client"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[240px_1fr]">
      <ClientNav />
      <div className="space-y-4">{children}</div>
    </div>
  )
}
