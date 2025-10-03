import Link from "next/link"
import Navbar from "@/components/Navbar";
export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md">
      <Navbar />
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-1 text-sm text-muted">Access your account as a client or freelancer.</p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between">
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <button type="submit" className="w-full rounded-md bg-primary py-2 text-white">
          Log in
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Create one
        </Link>
      </p>
    </section>
  )
}
