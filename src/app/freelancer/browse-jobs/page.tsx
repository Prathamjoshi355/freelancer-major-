import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BrowseJobsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-balance">Browse Jobs</h2>
        <p className="text-muted-foreground">Discover projects that match your skills.</p>
      </header>

      <form className="grid gap-4 rounded-md border p-4 md:grid-cols-4">
        <div className="space-y-1 md:col-span-2">
          <Label htmlFor="q">Search</Label>
          <Input id="q" name="q" placeholder="e.g. React developer, landing page, API" />
        </div>
        <div className="space-y-1">
          <Label>Category</Label>
          <Select>
            <SelectTrigger aria-label="Category">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="web">Web Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Budget</Label>
          <Select>
            <SelectTrigger aria-label="Budget">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="under-500">Under $500</SelectItem>
              <SelectItem value="500-2k">$500 – $2k</SelectItem>
              <SelectItem value="2k-plus">$2k+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>

      <section className="grid gap-4">
        {[
          { title: "Marketing site redesign", budget: "$1,200", skills: ["Next.js", "Tailwind", "SEO"] },
          { title: "Mobile app UX audit", budget: "$800", skills: ["UX", "Figma", "User Research"] },
          { title: "API integration for CRM", budget: "$2,500", skills: ["Node.js", "REST", "Auth"] },
        ].map((job) => (
          <Card key={job.title}>
            <CardHeader>
              <CardTitle className="text-balance">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-muted-foreground">
                Budget: <span className="font-medium text-foreground">{job.budget}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <li key={s} className="rounded-md border px-2 py-1 text-xs text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/freelancer/submit-proposal">Apply</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="#">View details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
