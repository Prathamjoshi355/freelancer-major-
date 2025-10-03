import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FreelancerDashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-balance">Dashboard</h2>
        <p className="text-muted-foreground">Quick overview of your activity and performance.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">3</p>
            <p className="text-sm text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applied Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">12</p>
            <p className="text-sm text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Earnings (Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">$2,450</p>
            <p className="text-sm text-muted-foreground">Before fees</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-medium">Recent Activity</h3>
        <ul className="divide-y rounded-md border">
          <li className="flex items-center justify-between p-3">
            <span>Proposal sent to “Marketing site redesign”</span>
            <span className="text-sm text-muted-foreground">2h ago</span>
          </li>
          <li className="flex items-center justify-between p-3">
            <span>Payment received: “Mobile app audit”</span>
            <span className="text-sm text-muted-foreground">1d ago</span>
          </li>
          <li className="flex items-center justify-between p-3">
            <span>Project “Logo refresh” marked completed</span>
            <span className="text-sm text-muted-foreground">3d ago</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
