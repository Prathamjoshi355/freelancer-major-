import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center">
        <h1 className="text-balance text-3xl font-semibold">Hire faster. Work smarter.</h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          A marketplace where clients post jobs and freelancers find great gigs.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className="rounded-md bg-primary px-4 py-2 text-white">
            Sign up
          </Link>
          <Link href="/register/client" className="rounded-md border border-gray-200 px-4 py-2">
            Post a job
          </Link>
          <Link href="/register/freelancer" className="rounded-md border border-gray-200 px-4 py-2">
            Find freelancers
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { t: "Post a Job", d: "Share your requirements and budget in minutes." },
          { t: "Apply to Gigs", d: "Browse projects and submit targeted proposals." },
          { t: "Secure Payments", d: "Track invoices and payouts with confidence." },
        ].map((f) => (
          <div key={f.t} className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="font-medium">{f.t}</h3>
            <p className="mt-1 text-sm text-muted">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-medium">Get started today</h2>
            <p className="text-sm text-muted">Create an account and join the marketplace.</p>
          </div>
          <Link href="/register" className="rounded-md bg-primary px-4 py-2 text-white">
            Create account
          </Link>
        </div>
      </section>
    </div>
  )
}
