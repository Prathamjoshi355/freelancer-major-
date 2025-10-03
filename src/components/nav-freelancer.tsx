"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const items = [
  { href: "/freelancer/dashboard", label: "Dashboard" },
  { href: "/freelancer/browse-jobs", label: "Browse Jobs" },
  { href: "/freelancer/submit-proposal", label: "Submit Proposal" },
  { href: "/freelancer/proposals", label: "My Proposals" },
  { href: "/freelancer/projects", label: "My Projects" },
  { href: "/freelancer/earnings", label: "Earnings" },
]

export function FreelancerNav() {
  const pathname = usePathname()
  return (
    <aside className="w-full rounded-lg border border-gray-200 bg-white p-3 md:w-60">
      <nav className="grid gap-1">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-50",
              pathname === i.href && "bg-gray-100 font-medium",
            )}
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
