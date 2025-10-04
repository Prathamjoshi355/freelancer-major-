import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

export default function ClientDashboardPage() {
  const stats = [
    { label: "Posted Jobs", value: 4 },
    { label: "Proposals", value: 18 },
    { label: "Ongoing Projects", value: 2 },
    { label: "Active Contracts", value: 2 },
    { label: "Payments Due", value: "$1,250" },
    { label: "Total Spend", value: "$8,430" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-pretty text-2xl font-semibold tracking-tight">Client Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your jobs, proposals, and payments.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="text-base">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-pretty">Landing page redesign</span>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs">3 new</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-pretty">iOS bug fix</span>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs">1 new</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-pretty">Shopify theme tweaks</span>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs">2 new</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-pretty">Invoice #1023</span>
                <span>$450.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-pretty">Invoice #1022</span>
                <span>$800.00</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
