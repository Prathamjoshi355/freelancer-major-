import type React from "react"
import Link from "next/link"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/client/dashboard", label: "Dashboard" },
    { href: "/client/post-job", label: "Post a Job" },
    { href: "/client/jobs", label: "My Jobs" },
    { href: "/client/proposals", label: "Proposals" },
    { href: "/client/hire", label: "Hire / Contract" },
    { href: "/client/payments", label: "Payments" },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <aside className="md:border-r md:pr-6">
            <nav className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="shrink-0 rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
