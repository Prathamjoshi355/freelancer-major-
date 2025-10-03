import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-pretty text-xl font-semibold">Platform Overview</h2>
        <p className="text-sm text-muted-foreground">Key metrics for clients, freelancers, jobs, and revenue.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Clients</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">1,284</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Freelancers</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">3,972</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Open Jobs</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">356</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">MRR</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">$42,900</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "React Dashboard Build", client: "Acme Inc", status: "Pending" },
              { title: "iOS App QA", client: "Blueberry", status: "Approved" },
              { title: "SEO Audit", client: "Kudos Labs", status: "Pending" },
            ].map((j, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{j.title}</p>
                  <p className="truncate text-sm text-muted-foreground">Client: {j.client}</p>
                </div>
                <Badge variant={j.status === "Approved" ? "secondary" : "outline"}>{j.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: "#TX-2911", amount: 1200, status: "Completed" },
              { id: "#TX-2912", amount: 240, status: "Pending" },
              { id: "#TX-2913", amount: 980, status: "Completed" },
            ].map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{t.id}</p>
                  <p className="text-sm text-muted-foreground">Service Fee Included</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${t.amount}</p>
                  <p className="text-xs text-muted-foreground">{t.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
