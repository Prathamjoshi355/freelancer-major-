"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { normalizeApiError, skillsAPI } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


type TestPageProps = {
  params: Promise<{ skill: string }>;
};


export default function SkillTestPage({ params }: TestPageProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated, refreshSession } = useAuth();
  const [skillSlug, setSkillSlug] = useState("");
  const [attempt, setAttempt] = useState<any | null>(null);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [practicalAnswers, setPracticalAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.resolve(params).then((resolved) => setSkillSlug(resolved.skill));
  }, [params]);

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "freelancer")) {
      router.push("/dashboard");
      return;
    }
    if (!skillSlug) return;

    void startAttempt();
  }, [isAuthenticated, loading, router, skillSlug, user]);

  async function startAttempt() {
    try {
      const response = await skillsAPI.start(skillSlug);
      setAttempt(response.data.attempt);
    } catch (startError) {
      setError(normalizeApiError(startError));
    }
  }

  async function submitAttempt() {
    if (!attempt) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await skillsAPI.submit(skillSlug, {
        attempt_id: attempt.id,
        mcq_answers: mcqAnswers,
        practical_answers: attempt.practical_questions.map((question: any) => ({
          question_id: question.id,
          answer: practicalAnswers[question.id] ?? "",
        })),
      });
      setAttempt(response.data.attempt);
      await refreshSession();
    } catch (submitError) {
      setError(normalizeApiError(submitError));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !skillSlug) {
    return <div className="py-16 text-center text-slate-500">Loading skill test...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Skill Test: {skillSlug}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {attempt?.status === "completed" ? (
            <div className="space-y-3 text-sm leading-7 text-slate-700">
              <p>MCQ Score: {attempt.mcq_score}</p>
              <p>Practical Score: {attempt.practical_score}</p>
              <p>Weighted Rating: {attempt.overall_rating}</p>
              <p>Status: {attempt.passed ? "Passed" : "Needs improvement"}</p>
              <Button variant="outline" onClick={() => router.push("/freelancer/skills")}>
                Back to Skills
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="font-serif text-2xl">MCQ Section</h2>
                {(attempt?.mcq_questions ?? []).slice(0, 10).map((question: any, index: number) => (
                  <div key={question.id} className="rounded-3xl border border-slate-200 p-4">
                    <p className="font-medium text-slate-900">
                      {index + 1}. {question.prompt}
                    </p>
                    <div className="mt-3 grid gap-2">
                      {question.options.map((option: string) => (
                        <label key={option} className="flex items-center gap-3 text-sm text-slate-700">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={mcqAnswers[question.id] === option}
                            onChange={(event) =>
                              setMcqAnswers((current) => ({
                                ...current,
                                [question.id]: event.target.value,
                              }))
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-slate-500">
                  The backend generates a 50-question session. This UI shows the
                  first 10 questions for a faster local workflow.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl">Practical Section</h2>
                {(attempt?.practical_questions ?? []).map((question: any) => (
                  <div key={question.id} className="space-y-3 rounded-3xl border border-slate-200 p-4">
                    <p className="font-medium text-slate-900">{question.prompt}</p>
                    <Textarea
                      value={practicalAnswers[question.id] ?? ""}
                      onChange={(event) =>
                        setPracticalAnswers((current) => ({
                          ...current,
                          [question.id]: event.target.value,
                        }))
                      }
                      placeholder="Write your solution, architecture, or implementation plan..."
                    />
                  </div>
                ))}
              </section>

              <Button onClick={submitAttempt} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Test"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
