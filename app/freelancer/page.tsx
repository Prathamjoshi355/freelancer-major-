import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FreelancerIndexPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-balance text-2xl font-semibold">Freelancer Area</h2>
        <p className="text-muted-foreground">
          Manage your work: browse jobs, send proposals, track projects and earnings.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
          </CardHeader>
          <CardContent className="space-x-2">
            <Button asChild>
              <Link href="/freelancer/browse-jobs">Browse Jobs</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/freelancer/submit-proposal">Submit Proposal</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Work</CardTitle>
          </CardHeader>
          <CardContent className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/freelancer/projects">My Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/freelancer/proposals">My Proposals</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/freelancer/earnings">View Earnings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
