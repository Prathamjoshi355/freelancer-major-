import type { ReactNode } from "react"
import { AdminNav } from "@/components/admin/nav"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-balance text-base font-semibold">Admin</h1>
          <p className="text-sm text-muted-foreground">Management Console</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-4 md:h-[calc(100dvh-6rem)] md:overflow-y-auto">
          <AdminNav />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
