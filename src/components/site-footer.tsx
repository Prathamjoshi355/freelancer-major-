import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-6 text-sm text-muted">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/search" className="hover:text-foreground">
              Search
            </Link>
            <Link href="/profile" className="hover:text-foreground">
              Profile
            </Link>
            <Link href="/messages" className="hover:text-foreground">
              Messages
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
