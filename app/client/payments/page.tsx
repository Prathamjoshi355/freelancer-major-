import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function PaymentsPage() {
  const invoices = [
    { id: "INV-1023", job: "Landing page redesign", amount: "$450.00", status: "Due", due: "2025-09-05" },
    { id: "INV-1022", job: "Shopify theme tweaks", amount: "$800.00", status: "Paid", due: "2025-08-22" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-pretty text-2xl font-semibold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">Track invoices and transactions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>{inv.id}</TableCell>
                  <TableCell className="max-w-[260px] truncate">{inv.job}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === "Paid" ? "default" : "secondary"}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell>{inv.due}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
