import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const jobs = [
  { id: "JOB-1021", title: "Next.js Landing Page", client: "Acme Inc", status: "Pending" },
  { id: "JOB-1022", title: "API Integration", client: "Foobar LLC", status: "Approved" },
  { id: "JOB-1023", title: "Data Dashboard", client: "Kudos Labs", status: "Removed" },
]

export default function AdminJobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Jobs Management</h2>
        <p className="text-sm text-muted-foreground">Approve or remove job postings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Moderation Queue</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableCaption>Newest job submissions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((j) => (
                <TableRow key={j.id}>
                  <TableCell className="font-medium">{j.id}</TableCell>
                  <TableCell>{j.title}</TableCell>
                  <TableCell>{j.client}</TableCell>
                  <TableCell>
                    <Badge variant={j.status === "Approved" ? "secondary" : "outline"}>{j.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="secondary">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" aria-label={`Remove ${j.id}`}>
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
