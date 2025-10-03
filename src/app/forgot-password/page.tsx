export default function ForgotPasswordPage() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Forgot password</h1>
      <p className="mt-1 text-sm text-muted">Enter your email to receive a reset link.</p>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <button className="w-full rounded-md bg-primary py-2 text-white">Send reset link</button>
      </form>
    </section>
  )
}
