import type React from "react"
import { AdminNav } from "@/components/nav-admin"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[240px_1fr]">
      <AdminNav />
      <div className="space-y-4">{children}</div>
    </div>
  )
}
