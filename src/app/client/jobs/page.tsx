"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { bidsAPI, jobsAPI, normalizeApiError } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function ClientJobsPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [bidsByJob, setBidsByJob] = useState<Record<string, any[]>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "client")) {
      router.push("/dashboard");
      return;
    }
    void loadData();
  }, [isAuthenticated, loading, router, user]);

  async function loadData() {
    try {
      const jobsResponse = await jobsAPI.mine();
      const myJobs = jobsResponse.data.results ?? [];
      setJobs(myJobs);

      const bidMap: Record<string, any[]> = {};
      await Promise.all(
        myJobs.map(async (job: any) => {
          const bidsResponse = await bidsAPI.list({ job_id: job.id });
          bidMap[job.id] = bidsResponse.data.results ?? [];
        })
      );
      setBidsByJob(bidMap);
    } catch (loadError) {
      setError(normalizeApiError(loadError));
    }
  }

  async function hireBid(bidId: string) {
    setError(null);
    try {
      const response = await bidsAPI.action(bidId, "hire");
      router.push(`/contracts/${response.data.contract.id}`);
    } catch (hireError) {
      setError(normalizeApiError(hireError));
    }
  }

  async function rejectBid(bidId: string) {
    setError(null);
    try {
      await bidsAPI.action(bidId, "reject");
      await loadData();
    } catch (rejectError) {
      setError(normalizeApiError(rejectError));
    }
  }

  if (loading || !user) {
    return <div className="py-16 text-center text-slate-500">Loading jobs...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Client Jobs</h1>
          <p className="text-slate-600">Review bids, hire one freelancer, and move into contract mode.</p>
        </div>
        <Link href="/client/post-job">
          <Button>Post Another Job</Button>
        </Link>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Status: <span className="font-medium">{job.status}</span>
              </p>
              <p className="text-sm leading-7 text-slate-700">{job.description}</p>

              <div className="grid gap-3">
                {(bidsByJob[job.id] ?? []).map((bid) => (
                  <div key={bid.id} className="rounded-3xl border border-slate-200 p-4">
                    {bid.freelancer_profile ? (
                      <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">
                          {bid.freelancer_profile.full_name || bid.freelancer_profile.username}
                        </p>
                        <p>
                          {bid.freelancer_profile.professional_title || "Freelancer"}
                          {bid.freelancer_profile.city || bid.freelancer_profile.country
                            ? ` • ${[bid.freelancer_profile.city, bid.freelancer_profile.country].filter(Boolean).join(", ")}`
                            : ""}
                        </p>
                        <p>
                          Rating {bid.freelancer_profile.overall_rating ?? 0} • Skill{" "}
                          {bid.freelancer_profile.system_metrics?.skill_assessment_score ?? 0} • Portfolio{" "}
                          {bid.freelancer_profile.system_metrics?.portfolio_quality_score ?? 0}
                        </p>
                      </div>
                    ) : null}
                    <p className="text-sm text-slate-600">Bid Amount: INR {bid.bid_amount}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{bid.proposal}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                      {bid.status}
                    </p>
                    {job.status === "open" && bid.status === "pending" ? (
                      <div className="mt-4 flex gap-3">
                        <Button onClick={() => hireBid(bid.id)}>Hire</Button>
                        <Button variant="outline" onClick={() => rejectBid(bid.id)}>
                          Reject
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
                {(bidsByJob[job.id] ?? []).length === 0 ? (
                  <p className="text-sm text-slate-500">No bids yet.</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
