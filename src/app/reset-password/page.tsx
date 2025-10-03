export default function ResetPasswordPage() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">New password</label>
          <input type="password" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm new password</label>
          <input type="password" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <button className="w-full rounded-md bg-primary py-2 text-white">Update password</button>
      </form>
    </section>
  )
}
