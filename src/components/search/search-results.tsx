import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SearchMode } from "./search-filters"

export function SearchResults({
  mode,
  q,
  category,
  remoteOnly,
}: {
  mode: SearchMode
  q: string
  category: string
  remoteOnly: boolean
}) {
  const freelancerItems = [
    { id: 1, name: "Jordan Doe", title: "Frontend Engineer", skills: ["React", "Next.js"], remote: true },
    { id: 2, name: "Alex Kim", title: "Full-stack Dev", skills: ["Node", "React"], remote: false },
  ]
  const jobItems = [
    { id: 1, title: "Build marketing site", tags: ["Next.js", "Tailwind"], remote: true },
    { id: 2, title: "Dashboard UI revamp", tags: ["React", "UX"], remote: false },
  ]

  const items = mode === "freelancers" ? freelancerItems : jobItems
  const filtered = items.filter((it: any) => {
    const text =
      mode === "freelancers" ? `${it.name} ${it.title} ${it.skills.join(" ")}` : `${it.title} ${it.tags.join(" ")}`
    const matchesQ = q ? text.toLowerCase().includes(q.toLowerCase()) : true
    const matchesCategory = category === "all" ? true : text.toLowerCase().includes(category)
    const matchesRemote = remoteOnly ? it.remote : true
    return matchesQ && matchesCategory && matchesRemote
  })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {filtered.map((it: any) =>
        mode === "freelancers" ? (
          <Card key={it.id}>
            <CardHeader>
              <CardTitle className="text-base">{it.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{it.title}</p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {it.skills.map((s: string) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
              {it.remote && <Badge>Remote</Badge>}
            </CardContent>
          </Card>
        ) : (
          <Card key={it.id}>
            <CardHeader>
              <CardTitle className="text-base">{it.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{it.remote ? "Remote" : "On-site"}</p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {it.tags.map((t: string) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
              {it.remote && <Badge>Remote</Badge>}
            </CardContent>
          </Card>
        ),
      )}
      {filtered.length === 0 && <p className="text-sm text-muted-foreground">No results found.</p>}
    </div>
  )
}
