import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
// Update the import path below to the correct relative path for your project structure.
// For example, if 'button.tsx' is in 'components/ui', use:
import { Button } from "../../components/ui/button"
import { Briefcase, User } from "lucide-react"

export default function RegisterIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold md:text-4xl">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Choose how you want to use the platform.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link href="/register/client" className="rounded-lg border p-6 transition-colors hover:bg-muted/40">
              <div className="flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary" aria-hidden />
                <div className="text-left">
                  <h2 className="text-lg font-medium">I’m a Client</h2>
                  <p className="text-sm text-muted-foreground">Post jobs and hire freelancers</p>
                </div>
              </div>
            </Link>
            <Link href="/register/freelancer" className="rounded-lg border p-6 transition-colors hover:bg-muted/40">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" aria-hidden />
                <div className="text-left">
                  <h2 className="text-lg font-medium">I’m a Freelancer</h2>
                  <p className="text-sm text-muted-foreground">Offer services and get hired</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-6">
            <Link href="/login">
              <Button variant="ghost">Already have an account? Log in</Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
