import Navbar from "../../components/Navbar"
import { SiteFooter } from "@/components/site-footer"
import { LoginForm } from "../../components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Welcome back</h1>
          <p className="mt-2 text-slate-600">Log in as a freelancer or a client.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <LoginForm />
        </div>
      </section>
      <SiteFooter />

    </main>
  )
}
