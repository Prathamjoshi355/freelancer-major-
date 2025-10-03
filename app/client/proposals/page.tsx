import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProposalsPage() {
  const proposals = [
    { id: "P-3011", job: "Landing page redesign", freelancer: "A. Khan", bid: "$1,200", status: "New" },
    { id: "P-3008", job: "iOS bug fix", freelancer: "J. Patel", bid: "$300", status: "Reviewed" },
    { id: "P-3007", job: "Shopify theme tweaks", freelancer: "S. Lin", bid: "$600", status: "Shortlisted" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-pretty text-2xl font-semibold tracking-tight">Proposals</h1>
        <p className="text-sm text-muted-foreground">View freelancers’ applications and shortlist candidates.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Bid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell className="max-w-[260px] truncate">{p.job}</TableCell>
                  <TableCell>{p.freelancer}</TableCell>
                  <TableCell>{p.bid}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" asChild>
                      <Link href="/client/hire">Hire</Link>
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
