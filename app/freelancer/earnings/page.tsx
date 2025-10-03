import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function EarningsPage() {
  const txs = [
    { id: "INV-1042", date: "2025-08-05", job: "Mobile app UX audit", amount: 800, status: "Paid" },
    { id: "INV-1041", date: "2025-08-03", job: "Marketing site redesign", amount: 1200, status: "Pending" },
    { id: "INV-1040", date: "2025-08-01", job: "Logo refresh", amount: 450, status: "Paid" },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-balance">Earnings</h2>
        <p className="text-muted-foreground">Track income, invoices, and withdrawals.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">$1,650</p>
            <div className="mt-3">
              <Button>Withdraw</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">$2,450</p>
            <p className="text-sm text-muted-foreground">Updated daily</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifetime</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">$18,720</p>
            <p className="text-sm text-muted-foreground">Since joining</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Job</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txs.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.id}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell className="text-balance">{t.job}</TableCell>
                  <TableCell className="text-right">${t.amount.toLocaleString()}</TableCell>
                  <TableCell>{t.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
