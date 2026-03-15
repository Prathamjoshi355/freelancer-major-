import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Post a Job Fast",
    desc: "Describe your project and get qualified proposals within hours.",
  },
  {
    title: "Verified Talent",
    desc: "Profiles with portfolios, ratings, and proven work history.",
  },
  {
    title: "Secure Contracts",
    desc: "Milestones and escrow-style payments for peace of mind.",
  },
  {
    title: "Messaging & Files",
    desc: "Keep project communication and assets in one place.",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-balance text-2xl font-semibold text-slate-900 md:text-3xl">
          Everything you need to work smarter
        </h2>
        <p className="mt-3 text-pretty text-slate-600">
          Tools to hire confidently and deliver great work on time and on budget.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <Card key={f.title} className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">{f.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
