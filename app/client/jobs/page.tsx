import Link from "next/link"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export default function MyJobsPage() {
  const jobs = [
    { id: "J-1024", title: "Landing page redesign", status: "Active", proposals: 7 },
    { id: "J-1023", title: "iOS bug fix", status: "Completed", proposals: 4 },
    { id: "J-1022", title: "Shopify theme tweaks", status: "Pending", proposals: 2 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight">My Jobs</h1>
          <p className="text-sm text-muted-foreground">Manage active, completed, and pending jobs.</p>
        </div>
        <Button asChild>
          <Link href="/client/post-job">Post a Job</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Proposals</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((j) => (
                <TableRow key={j.id}>
                  <TableCell>{j.id}</TableCell>
                  <TableCell className="max-w-[280px] truncate">{j.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{j.status}</Badge>
                  </TableCell>
                  <TableCell>{j.proposals}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/client/proposals">View Proposals</Link>
                    </Button>
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
