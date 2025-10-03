"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-6 w-6 rounded bg-blue-600" aria-hidden="true" />
          <span className="font-semibold text-slate-900">FreelanceHub</span>
          <span className="sr-only">FreelanceHub - Home</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm text-slate-600 transition-colors hover:text-slate-900",
                pathname === l.href && "text-slate-900 font-medium",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" className="hidden md:inline-flex">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
