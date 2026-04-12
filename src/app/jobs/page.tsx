"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { bidsAPI, jobsAPI, normalizeApiError } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


type JobItem = {
  id: string;
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  required_skill_slugs: string[];
  status: string;
  client_profile?: any;
};


export default function JobsPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, workflow } = useAuth();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});
  const [bidText, setBidText] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!user) return;

    void (async () => {
      try {
        const response = await jobsAPI.list();
        setJobs(response.data.results ?? []);
      } catch (loadError) {
        setError(normalizeApiError(loadError));
      }
    })();
  }, [isAuthenticated, loading, router, user]);

  async function submitBid(jobId: string) {
    setError(null);
    try {
      await bidsAPI.create({
        job_id: jobId,
        bid_amount: Number(bidAmounts[jobId] || 0),
        proposal: bidText[jobId] || "",
      });
      setBidAmounts((current) => ({ ...current, [jobId]: "" }));
      setBidText((current) => ({ ...current, [jobId]: "" }));
    } catch (submitError) {
      setError(normalizeApiError(submitError));
    }
  }

  if (loading || !user) {
    return <div className="py-16 text-center text-slate-500">Loading jobs...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Marketplace Jobs</h1>
          <p className="text-slate-600">
            Job visibility is open to authenticated platform users with completed profiles.
          </p>
        </div>
        {user.role === "client" ? (
          <Link href="/client/post-job">
            <Button>Post Job</Button>
          </Link>
        ) : (
          <Link href="/freelancer/skills">
            <Button variant="outline">Manage Skills</Button>
          </Link>
        )}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">{job.title}</CardTitle>
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
                  <p>
                    Hiring rate {job.client_profile.client_activity?.hiring_rate ?? 0}% • Rating{" "}
                    {job.client_profile.client_credibility?.client_rating ?? 0} • Total spent INR{" "}
                    {job.client_profile.client_credibility?.total_amount_spent ?? 0}
                  </p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {job.required_skill_slugs.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>

              {user.role === "freelancer" ? (
                workflow?.can_bid ? (
                  <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <Input
                      type="number"
                      placeholder="Bid amount"
                      value={bidAmounts[job.id] ?? ""}
                      onChange={(event) =>
                        setBidAmounts((current) => ({ ...current, [job.id]: event.target.value }))
                      }
                    />
                    <Textarea
                      placeholder="Proposal"
                      value={bidText[job.id] ?? ""}
                      onChange={(event) =>
                        setBidText((current) => ({ ...current, [job.id]: event.target.value }))
                      }
                    />
                    <Button onClick={() => submitBid(job.id)}>Submit Bid</Button>
                  </div>
                ) : (
                  <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Finish profile + skill validation before bidding.
                  </p>
                )
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
