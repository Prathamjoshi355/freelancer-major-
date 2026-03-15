"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/transactions", label: "Transactions" },
]

export function AdminNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Admin navigation" className="flex gap-2 md:flex-col md:gap-1">
      {links.map((l) => {
        const active = pathname?.startsWith(l.href)
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            <span className="truncate">{l.label}</span>
            {l.label === "Jobs" ? (
              <Badge variant={active ? "secondary" : "outline"} aria-label="Items in moderation queue">
                3
              </Badge>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}
