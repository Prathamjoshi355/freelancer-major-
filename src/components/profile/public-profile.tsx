import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function PublicProfile() {
  const skills = ["React", "Next.js", "Tailwind", "Node.js", "UI/UX"]
  const portfolio = [
    { id: 1, title: "SaaS Dashboard", img: "/saas-dashboard-overview.png", link: "#" },
    { id: 2, title: "Marketing Site", img: "/marketing-site.png", link: "#" },
    { id: 3, title: "E-commerce UI", img: "/ecommerce-ui.png", link: "#" },
  ]
  const reviews = [
    { id: 1, author: "Acme Inc.", text: "Delivered pixel-perfect UI ahead of schedule." },
    { id: 2, author: "Nova Labs", text: "Great communication and high-quality code." },
  ]

  return (
    <main className="container mx-auto max-w-4xl p-4 md:p-6">
      <section className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/diverse-avatars.png" alt="Profile avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-pretty">Jordan Doe</h1>
            <p className="text-muted-foreground">Senior Frontend Engineer · 6+ yrs</p>
            <div className="mt-2 flex items-center gap-1 text-amber-500" aria-label="Average rating 4.8 out of 5">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4" />
              <span className="ml-2 text-sm text-foreground">4.8 (32)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-pretty leading-relaxed">
              I build fast, accessible web apps using React, Next.js, and Tailwind. I care about clean design,
              performance, and maintainable code.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="capitalize">
                {s}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {portfolio.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                >
                  <img src={p.img || "/placeholder.svg"} alt={`${p.title} preview`} className="rounded-md border" />
                  <p className="mt-2 text-sm font-medium group-hover:underline">{p.title}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="leading-relaxed">“{r.text}”</p>
                <p className="mt-1 text-sm text-muted-foreground">— {r.author}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
