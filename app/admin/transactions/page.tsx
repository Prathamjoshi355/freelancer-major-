import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const txs = [
  { id: "#TX-3001", date: "2025-08-10", party: "Jane Cooper", type: "Payout", amount: 1200, status: "Completed" },
  { id: "#TX-3002", date: "2025-08-11", party: "Acme Inc", type: "Charge", amount: 240, status: "Pending" },
  { id: "#TX-3003", date: "2025-08-12", party: "Cody Fisher", type: "Payout", amount: 980, status: "Completed" },
]

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Transactions</h2>
        <p className="text-sm text-muted-foreground">Track commissions and platform payments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableCaption>Latest transaction records</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txs.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.id}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.party}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>${t.amount}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === "Completed" ? "secondary" : "outline"}>{t.status}</Badge>
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
