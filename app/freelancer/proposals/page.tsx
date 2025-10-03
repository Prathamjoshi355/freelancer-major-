import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ProposalsPage() {
  const rows = [
    { job: "Marketing site redesign", date: "2025-08-01", amount: "$1,200", status: "Pending" },
    { job: "Mobile app UX audit", date: "2025-08-02", amount: "$800", status: "Accepted" },
    { job: "API integration for CRM", date: "2025-08-05", amount: "$2,500", status: "Rejected" },
  ]
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-balance">My Proposals</h2>
        <p className="text-muted-foreground">Track all submitted proposals and their status.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.job}>
                  <TableCell className="font-medium">{r.job}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        r.status === "Accepted" ? "default" : r.status === "Rejected" ? "destructive" : "secondary"
                      }
                    >
                      {r.status}
                    </Badge>
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
