import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-12">
        <ForgotPasswordForm />
      </main>
      <SiteFooter />
    </>
  )
}
