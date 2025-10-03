import Link from "next/link"

export default function FreelancerIndexPage() {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Freelancer Area</h1>
      <p className="text-sm text-muted">Browse jobs and manage your work.</p>
      <div className="mt-4 flex gap-3">
        <Link href="/freelancer/browse-jobs" className="rounded-md bg-primary px-3 py-2 text-white">
          Browse Jobs
        </Link>
        <Link href="/freelancer/dashboard" className="rounded-md border border-gray-200 px-3 py-2">
          Dashboard
        </Link>
      </div>
    </section>
  )
}
