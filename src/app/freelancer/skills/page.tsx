"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { normalizeApiError, skillsAPI } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type SkillItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

type FreelancerSkillItem = {
  skill: SkillItem;
  test_status: string;
  rating: number;
  mcq_score: number;
  practical_score: number;
};


export default function FreelancerSkillsPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, refreshSession } = useAuth();
  const [catalog, setCatalog] = useState<SkillItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [mappings, setMappings] = useState<FreelancerSkillItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "freelancer")) {
      router.push("/dashboard");
      return;
    }
    if (!user) return;

    void loadData();
  }, [isAuthenticated, loading, router, user]);

  async function loadData() {
    try {
      const [catalogResponse, skillResponse] = await Promise.all([
        skillsAPI.listCatalog(),
        skillsAPI.getMine(),
      ]);
      setCatalog(catalogResponse.data.results ?? []);
      setSelected(skillResponse.data.selected_skill_slugs ?? []);
      setMappings(skillResponse.data.results ?? []);
    } catch (loadError) {
      setError(normalizeApiError(loadError));
    }
  }

  function toggleSkill(slug: string) {
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((value) => value !== slug)
        : [...current, slug]
    );
  }

  async function saveSelection() {
    setSaving(true);
    setError(null);
    try {
      const response = await skillsAPI.select(selected);
      setMappings(response.data.results ?? []);
      await refreshSession();
    } catch (saveError) {
      setError(normalizeApiError(saveError));
    } finally {
      setSaving(false);
    }
  }

  if (loading || !user) {
    return <div className="py-16 text-center text-slate-500">Loading skills...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Skill Selection and Validation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm leading-7 text-slate-600">
            Select the skills you want to market. You remain blocked from bidding
            until the backend marks the required skill tests as passed.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {catalog.map((skill) => (
              <label
                key={skill.slug}
                className={`flex cursor-pointer items-start gap-3 rounded-3xl border p-4 transition ${
                  selected.includes(skill.slug)
                    ? "border-sky-300 bg-sky-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(skill.slug)}
                  onChange={() => toggleSkill(skill.slug)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-slate-900">{skill.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    {skill.category}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{skill.description}</p>
                </div>
              </label>
            ))}
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button onClick={saveSelection} disabled={saving || selected.length === 0}>
            {saving ? "Saving skills..." : "Save Skills"}
          </Button>
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        {mappings.map((mapping) => (
          <Card key={mapping.skill.slug}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-4 font-serif text-2xl">
                <span>{mapping.skill.name}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-600">
                  {mapping.test_status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>MCQ Score: {mapping.mcq_score}</p>
              <p>Practical Score: {mapping.practical_score}</p>
              <p>Rating: {mapping.rating}</p>
              <Link href={`/freelancer/skills/test/${mapping.skill.slug}`}>
                <Button variant="outline">Open Test</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
