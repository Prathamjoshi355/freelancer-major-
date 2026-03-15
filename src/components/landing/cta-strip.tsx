import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaStrip() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-center text-slate-900 md:text-left">
          Ready to get started? Join free and post your first job or create your profile.
        </p>
        <div className="flex gap-3">
          <Link href="/register">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Sign up</Button>
          </Link>
          <Link href="/register/client">
            <Button variant="outline">Post a job</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
