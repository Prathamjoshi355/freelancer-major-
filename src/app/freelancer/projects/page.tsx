import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectsPage() {
  const ongoing = [
    { name: "Marketing site redesign", due: "Sep 20, 2025" },
    { name: "API integration for CRM", due: "Oct 04, 2025" },
  ]
  const completed = [{ name: "Logo refresh", due: "Aug 10, 2025" }]

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-balance">My Projects</h2>
        <p className="text-muted-foreground">Manage ongoing work and review completed projects.</p>
      </header>

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="mt-4 grid gap-4 md:grid-cols-2">
          {ongoing.map((p) => (
            <Card key={p.name}>
              <CardHeader>
                <CardTitle className="text-balance">{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Due: {p.due}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 grid gap-4 md:grid-cols-2">
          {completed.map((p) => (
            <Card key={p.name}>
              <CardHeader>
                <CardTitle className="text-balance">{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Completed: {p.due}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
