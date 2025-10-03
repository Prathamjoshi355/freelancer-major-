"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
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
    <nav aria-label="Freelancer navigation" className="space-y-1">
      {links.map((link) => {
        const active = pathname?.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "block rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
