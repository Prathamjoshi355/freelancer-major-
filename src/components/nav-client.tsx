"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const items = [
  { href: "/client/dashboard", label: "Dashboard" },
  { href: "/client/post-job", label: "Post a Job" },
  { href: "/client/jobs", label: "My Jobs" },
  { href: "/client/proposals", label: "Proposals" },
  { href: "/client/hire", label: "Hire / Contract" },
  { href: "/client/payments", label: "Payments" },
]

export function ClientNav() {
  const pathname = usePathname()
  const currentPathname = typeof window !== "undefined" ? window.location.pathname : pathname
  return (
    <aside className="w-full rounded-lg border border-gray-200 bg-white p-3 md:w-60">
      <nav className="grid gap-1">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-50",
              currentPathname === i.href && "bg-gray-100 font-medium",
            )}
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
