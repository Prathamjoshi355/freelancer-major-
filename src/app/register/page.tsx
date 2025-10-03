import Link from "next/link"

export default function RegisterIndexPage() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <p className="mt-1 text-sm text-muted">Choose your role to continue.</p>

      <div className="mt-6 grid gap-4">
        <Link href="/register/client" className="rounded-lg border border-gray-200 p-4 hover:border-primary">
          <h3 className="font-medium">I&apos;m a Client</h3>
          <p className="text-sm text-muted">Post jobs and hire talent.</p>
        </Link>
        <Link href="/register/freelancer" className="rounded-lg border border-gray-200 p-4 hover:border-primary">
          <h3 className="font-medium">I&apos;m a Freelancer</h3>
          <p className="text-sm text-muted">Offer services and get paid.</p>
        </Link>
      </div>
    </section>
  )
}
