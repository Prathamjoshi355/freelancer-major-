"use client";

import { useEffect, useState } from "react";

import { jobsAPI, normalizeApiError, profilesAPI } from "@/services/apiService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SearchMode } from "./search-filters";


export function SearchResults({
  mode,
  q,
  category,
}: {
  mode: SearchMode;
  q: string;
  category: string;
  remoteOnly: boolean;
}) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    void (async () => {
      setLoading(true);
      setError(null);
      try {
        if (mode === "freelancers") {
          const response = await profilesAPI.listFreelancers({
            q,
            category: category === "all" ? undefined : category,
          });
          if (active) setResults(response.data.results ?? []);
        } else {
          const response = await jobsAPI.list({
            q,
            skill: category === "all" ? undefined : category,
          });
          if (active) setResults(response.data.results ?? []);
        }
      } catch (loadError) {
        if (active) setError(normalizeApiError(loadError));
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [category, mode, q]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading results...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!results.length) {
    return <p className="text-sm text-muted-foreground">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {results.map((item: any) =>
        mode === "freelancers" ? (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-base">{item.full_name || item.username}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {item.professional_title || "Freelancer"}{item.city || item.country ? ` • ${[item.city, item.country].filter(Boolean).join(", ")}` : ""}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(item.skills ?? []).map((skill: any) => (
                  <Badge key={skill.slug} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
                {(item.badges ?? []).map((badge: string) => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                Rating {item.overall_rating ?? 0} • Skill {item.system_metrics?.skill_assessment_score ?? 0} • Portfolio {item.system_metrics?.portfolio_quality_score ?? 0}
              </p>
              {item.bio ? <p className="text-sm text-slate-700">{item.bio}</p> : null}
            </CardContent>
          </Card>
        ) : (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Budget INR {item.budget_min} - INR {item.budget_max}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(item.required_skill_slugs ?? []).map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {item.client_profile?.client_credibility?.payment_method_verified ? <Badge>Payment Verified</Badge> : null}
              </div>
              <p className="text-sm text-slate-700">{item.description}</p>
              <p className="text-sm text-slate-600">
                {item.client_profile?.company_name || item.client_profile?.full_name || "Client"} • Hiring rate {item.client_profile?.client_activity?.hiring_rate ?? 0}% • Rating {item.client_profile?.client_credibility?.client_rating ?? 0}
              </p>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}
