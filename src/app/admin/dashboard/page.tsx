"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch("http://localhost:8000/api/admin/stats/", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        if (response.ok) {
          setStats(await response.json())
        }
      } catch (error) {
        console.error("Failed to load admin stats:", error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  const data = stats || {}
  const users = data.users || {}
  const jobs = data.jobs || {}
  const revenue = data.revenue || {}
  const skillTests = data.skill_tests || {}

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
          <CardContent className="text-2xl font-semibold">{users.clients || 0}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Freelancers</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{users.freelancers || 0}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Open Jobs</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{jobs.open || 0}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">MRR</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">INR {Math.round(revenue.monthly_estimate || 0)}</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Platform Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Users</span>
              <strong>{users.total || 0}</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Jobs</span>
              <strong>{jobs.total || 0}</strong>
            </div>
            <div className="flex justify-between">
              <span>Completed Jobs</span>
              <strong>{jobs.completed || 0}</strong>
            </div>
            <div className="flex justify-between">
              <span>Skill Tests Completed</span>
              <strong>{skillTests.completed || 0}</strong>
            </div>
            <div className="flex justify-between">
              <span>Active This Month</span>
              <strong>{users.active_this_month || 0}</strong>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Revenue</span>
              <strong>INR {Math.round(revenue.total || 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Monthly Estimate</span>
              <strong>INR {Math.round(revenue.monthly_estimate || 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Completed Jobs</span>
              <strong>{jobs.completed || 0}</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
