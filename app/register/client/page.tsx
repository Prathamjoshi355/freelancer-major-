import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterClientPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-12">
        <RegisterForm role="client" />
      </main>
      <SiteFooter />
    </>
  )
}
