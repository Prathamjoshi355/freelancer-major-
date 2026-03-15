import Navbar from "@/components/Navbar"
import { SiteFooter } from "@/components/site-footer"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-md text-center">
        </div>
        {/* <Navbar /> */}
        <div className="mt-8 flex justify-center">
          <LoginForm />
        </div>
      </section>
      <SiteFooter />

    </main>
  )
}
