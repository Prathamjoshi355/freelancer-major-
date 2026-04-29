"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/context/AuthContext"
import { jobsAPI, normalizeApiError } from "@/services/apiService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type JobItem = {
  id: string
  title: string
  description: string
  budget_min: number
  budget_max: number
  required_skill_slugs: string[]
  status: string
  client_profile?: any
}

export default function BrowseJobsPage() {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
      return
    }
    if (!user || user.role !== "freelancer") return

    void (async () => {
      try {
        setPageLoading(true)
        const params: Record<string, string> = {}
        if (searchQuery) params.q = searchQuery
        if (skillFilter) params.skill = skillFilter
        
        const response = await jobsAPI.list(params)
        setJobs(response.data.results ?? [])
        setError(null)
      } catch (loadError) {
        setError(normalizeApiError(loadError))
      } finally {
        setPageLoading(false)
      }
    })()
  }, [isAuthenticated, loading, router, user, searchQuery, skillFilter])

  if (loading || !user) {
    return <div className="py-16 text-center text-slate-500">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-balance">Browse Jobs</h2>
        <p className="text-muted-foreground">Discover projects that match your skills. Real jobs posted by clients.</p>
      </header>

      <div className="grid gap-4 rounded-md border p-4 md:grid-cols-3">
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="search" className="text-sm font-medium">Search Jobs</label>
          <input
            id="search"
            type="text"
            placeholder="e.g. React developer, landing page, API..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="skill" className="text-sm font-medium">Filter by Skill</label>
          <input
            id="skill"
            type="text"
            placeholder="e.g. django, nextjs..."
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      ) : null}

      <section className="grid gap-4">
        {pageLoading ? (
          <div className="py-16 text-center text-slate-500">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">No jobs found matching your criteria.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="text-balance">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-slate-700">{job.description}</p>
                <p className="text-sm text-slate-600">
                  Budget: INR {job.budget_min} - INR {job.budget_max}
                </p>
                {job.client_profile ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <p className="font-medium text-slate-900">
                      {job.client_profile.company_name || job.client_profile.full_name || "Client"}
                    </p>
                    <p>
                      {job.client_profile.city || job.client_profile.country
                        ? [job.client_profile.city, job.client_profile.country].filter(Boolean).join(", ")
                        : "Location not set"}
                    </p>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {job.required_skill_slugs.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="default" asChild>
                    <Link href={`/jobs/${job.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/jobs/${job.id}?tab=bid`}>Submit Proposal</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  )
}
