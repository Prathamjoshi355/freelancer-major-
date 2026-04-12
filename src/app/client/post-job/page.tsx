"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { jobsAPI, normalizeApiError, skillsAPI } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function ClientPostJobPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, workflow } = useAuth();
  const [catalog, setCatalog] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget_min: "",
    budget_max: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "client")) {
      router.push("/dashboard");
      return;
    }
    void (async () => {
      try {
        const response = await skillsAPI.listCatalog();
        setCatalog(response.data.results ?? []);
      } catch (loadError) {
        setError(normalizeApiError(loadError));
      }
    })();
  }, [isAuthenticated, loading, router, user]);

  function setValue(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await jobsAPI.create({
        ...form,
        budget_min: Number(form.budget_min),
        budget_max: Number(form.budget_max),
        required_skill_slugs: selectedSkills,
      });
      router.push("/client/jobs");
    } catch (submitError) {
      setError(normalizeApiError(submitError));
    } finally {
      setSaving(false);
    }
  }

  if (loading || !user) {
    return <div className="py-16 text-center text-slate-500">Loading client workspace...</div>;
  }

  if (!workflow?.can_post_jobs) {
    return (
      <Card>
        <CardContent className="p-8 text-sm text-slate-700">
          Complete your profile before posting jobs.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(event) => setValue("title", event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(event) => setValue("description", event.target.value)} required />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="budget_min">Budget Min</Label>
                <Input id="budget_min" type="number" value={form.budget_min} onChange={(event) => setValue("budget_min", event.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget_max">Budget Max</Label>
                <Input id="budget_max" type="number" value={form.budget_max} onChange={(event) => setValue("budget_max", event.target.value)} required />
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Required Skills</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {catalog.map((skill) => (
                  <label key={skill.slug} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill.slug)}
                      onChange={() =>
                        setSelectedSkills((current) =>
                          current.includes(skill.slug)
                            ? current.filter((value) => value !== skill.slug)
                            : [...current, skill.slug]
                        )
                      }
                    />
                    <span className="text-sm text-slate-700">{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button type="submit" disabled={saving || selectedSkills.length === 0}>
              {saving ? "Publishing..." : "Publish Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
