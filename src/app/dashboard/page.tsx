"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


function StatusChip({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] ${
        active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
      }`}
    >
      {label}
    </span>
  );
}


function MetricCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-[0.25em] text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="font-serif text-3xl text-slate-950">{value}</p>
        {hint ? <p className="text-sm text-slate-600">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}


export default function DashboardPage() {
  const router = useRouter();
  const { loading, isAuthenticated, user, profile, workflow, refreshSession } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    void refreshSession();
  }, [loading, isAuthenticated, refreshSession, router]);

  if (loading || !user || !profile) {
    return <div className="py-16 text-center text-slate-500">Loading dashboard...</div>;
  }

  const verification = profile.verification ?? {};
  const systemMetrics = profile.system_metrics ?? {};
  const clientActivity = profile.client_activity ?? {};
  const clientCredibility = profile.client_credibility ?? {};
  const badges: string[] = profile.badges ?? [];

  const nextAction =
    workflow?.next_step === "complete_profile"
      ? { href: "/onboarding/profile", label: "Complete Profile" }
      : workflow?.next_step === "select_skills" || workflow?.next_step === "complete_skill_tests"
        ? { href: "/freelancer/skills", label: "Open Skills" }
        : user.role === "client"
          ? { href: "/client/post-job", label: "Post a Job" }
          : { href: "/jobs", label: "Browse Jobs" };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Trust and Access</p>
            <h1 className="font-serif text-4xl text-slate-950">
              {user.role === "client" ? "Client Credibility Panel" : "Freelancer Proof Panel"}
            </h1>
            <p className="max-w-2xl text-slate-600">
              Marketplace access is enforced by the API. This screen mirrors the same rules that gate search, bidding, chat, and payment actions.
            </p>
          </div>
          <Link href={nextAction.href}>
            <Button size="lg">{nextAction.label}</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-[0.25em] text-slate-500">Face</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusChip label="Verified" active={Boolean(user.face_verified)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-[0.25em] text-slate-500">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <StatusChip label="Complete" active={Boolean(workflow?.profile_completed)} />
            <p className="text-sm text-slate-600">{profile.completion_percentage ?? 0}% complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-[0.25em] text-slate-500">Marketplace</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusChip label="Unlocked" active={Boolean(workflow?.marketplace_access)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-[0.25em] text-slate-500">Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>Email: {verification.email_verified ? "Verified" : "Pending"}</p>
            <p>Payment: {verification.payment_verified ? "Verified" : "Pending"}</p>
          </CardContent>
        </Card>
      </section>

      {user.role === "client" ? (
        <section className="grid gap-4 lg:grid-cols-4">
          <MetricCard title="Jobs Posted" value={String(clientActivity.jobs_posted_count ?? 0)} />
          <MetricCard title="Active Jobs" value={String(clientActivity.active_jobs ?? 0)} />
          <MetricCard title="Hiring Rate" value={`${clientActivity.hiring_rate ?? 0}%`} />
          <MetricCard title="Client Rating" value={String(clientCredibility.client_rating ?? 0)} hint="Freelancer feedback about this client" />
          <MetricCard title="Total Spent" value={`INR ${clientCredibility.total_amount_spent ?? 0}`} />
          <MetricCard title="Avg Budget" value={`INR ${clientCredibility.average_project_budget ?? 0}`} />
          <MetricCard title="Communication" value={profile.typical_response_time_hours ? `${profile.typical_response_time_hours}h` : "Not set"} hint="Typical response time" />
          <MetricCard title="Payments" value={clientCredibility.payment_method_verified ? "Verified" : "Pending"} />
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-4">
          <MetricCard title="Skill Score" value={String(systemMetrics.skill_assessment_score ?? 0)} hint="Average of passed skill assessments" />
          <MetricCard title="Portfolio Score" value={String(systemMetrics.portfolio_quality_score ?? 0)} hint="System-evaluated portfolio quality" />
          <MetricCard title="Rating" value={String(profile.overall_rating ?? 0)} hint="Combined client review and skill proof" />
          <MetricCard title="Communication" value={String(systemMetrics.communication_rating ?? 0)} hint="Review and policy-signal adjusted" />
          <MetricCard title="Visibility" value={String(systemMetrics.visibility_score ?? 0)} hint="Search ordering weight" />
          <MetricCard title="Completed Jobs" value={String(profile.total_completed_jobs ?? 0)} />
          <MetricCard title="Availability" value={profile.availability ? String(profile.availability).replaceAll("_", " ") : "Unset"} />
          <MetricCard title="Hourly Rate" value={profile.hourly_rate ? `INR ${profile.hourly_rate}` : "Unset"} />
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Readiness Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              Account status: <span className="font-medium">{user.account_status}</span>
            </p>
            <p>
              Next required step: <span className="font-medium">{workflow?.next_step ?? "marketplace_unlocked"}</span>
            </p>
            {profile.missing_requirements?.length ? (
              <p>
                Missing profile requirements: <span className="font-medium">{profile.missing_requirements.join(", ")}</span>
              </p>
            ) : null}
            {user.is_restricted ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                This account is restricted. Marketplace actions remain blocked until an administrator clears the restriction.
              </p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {badges.length ? badges.map((badge) => (
                <span key={badge} className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-700">
                  {badge}
                </span>
              )) : (
                <span className="text-sm text-slate-500">No badges yet.</span>
              )}
            </div>
            <div className="grid gap-3">
              <Link href="/onboarding/profile">
                <Button variant="outline" className="w-full justify-start">Edit Profile</Button>
              </Link>
              {user.role === "freelancer" ? (
                <>
                  <Link href="/freelancer/skills">
                    <Button variant="outline" className="w-full justify-start">Skills and Tests</Button>
                  </Link>
                  <Link href="/search">
                    <Button variant="outline" className="w-full justify-start">Check Search Visibility</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/client/post-job">
                    <Button variant="outline" className="w-full justify-start">Post Job</Button>
                  </Link>
                  <Link href="/client/jobs">
                    <Button variant="outline" className="w-full justify-start">Review Bids</Button>
                  </Link>
                </>
              )}
              <Link href="/contracts">
                <Button variant="outline" className="w-full justify-start">Contracts</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
