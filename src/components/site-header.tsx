"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/client", label: "Client" },
  { href: "/freelancer", label: "Freelancer" },
  { href: "/admin", label: "Admin" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Freelance<span className="text-primary">Hub</span>
        </Link>
        <nav className="flex items-center gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm text-muted hover:text-foreground transition-colors",
                pathname === l.href && "text-foreground font-medium",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/register/client" className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white">
            Post a Job
          </Link>
        </nav>
      </div>
    </header>
  )
}
