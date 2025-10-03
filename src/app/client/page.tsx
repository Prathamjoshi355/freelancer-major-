import Link from "next/link"

export default function ClientIndexPage() {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Client Area</h1>
      <p className="text-sm text-muted">Jump into your dashboard or post a job.</p>
      <div className="mt-4 flex gap-3">
        <Link href="/client/dashboard" className="rounded-md bg-primary px-3 py-2 text-white">
          Dashboard
        </Link>
        <Link href="/client/post-job" className="rounded-md border border-gray-200 px-3 py-2">
          Post a Job
        </Link>
      </div>
    </section>
  )
}
