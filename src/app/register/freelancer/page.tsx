export default function RegisterFreelancerPage() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Sign up as Freelancer</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <button className="w-full rounded-md bg-primary py-2 text-white">Create account</button>
      </form>
    </section>
  )
}
