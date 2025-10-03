import Link from "next/link"

export default function AdminIndexPage() {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <p className="text-sm text-muted">Manage users, jobs, and transactions.</p>
      <div className="mt-4 flex gap-3">
        <Link href="/admin/dashboard" className="rounded-md bg-primary px-3 py-2 text-white">
          Dashboard
        </Link>
        <Link href="/admin/users" className="rounded-md border border-gray-200 px-3 py-2">
          Users
        </Link>
      </div>
    </section>
  )
}
