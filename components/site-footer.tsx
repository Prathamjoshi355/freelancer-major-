export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
        <nav className="flex gap-4 text-sm">
          <a className="text-slate-600 hover:text-slate-900" href="#">
            Privacy
          </a>
          <a className="text-slate-600 hover:text-slate-900" href="#">
            Terms
          </a>
          <a className="text-slate-600 hover:text-slate-900" href="#">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
