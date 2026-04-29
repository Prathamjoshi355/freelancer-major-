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
  const [redirecting, setRedirecting] = useState(false);

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

  // Auto-redirect to dashboard after test completion (with delay to show success message)
  useEffect(() => {
    if (attempt?.status === "completed" && !redirecting) {
      const timer = setTimeout(() => {
        setRedirecting(true);
        router.push("/dashboard");
      }, 3000); // 3 second delay to show success message
      return () => clearTimeout(timer);
    }
  }, [attempt?.status, redirecting, router]);

  async function startAttempt() {
    try {
      const response = await skillsAPI.start(skillSlug);
      setAttempt(response.data.attempt);
      setMcqAnswers({});
      setPracticalAnswers({});
    } catch (startError) {
      setError(normalizeApiError(startError));
    }
  }

  async function submitAttempt() {
    if (!attempt) return;
    
    // Validate all MCQ answered (required)
    const mcqsToAnswer = attempt.mcq_questions ?? [];
    const unansweredMcqs = mcqsToAnswer.filter((q: any) => !mcqAnswers[q.id]);
    if (unansweredMcqs.length > 0) {
      setError(`Please answer all MCQ questions. ${unansweredMcqs.length} remaining.`);
      return;
    }

    // Practical answers are OPTIONAL - admin will review and grade them
    // No validation needed

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

  const mcqCount = (attempt?.mcq_questions ?? []).length;
  const practicalCount = (attempt?.practical_questions ?? []).length;
  const answeredMcq = (attempt?.mcq_questions ?? []).filter(
    (q: any) => mcqAnswers[q.id]
  ).length;
  const answeredPractical = (attempt?.practical_questions ?? []).filter(
    (q: any) => practicalAnswers[q.id]?.trim()
  ).length;
  // Only MCQ answers are required for submission
  const allAnswered = answeredMcq === mcqCount;

  return (
    <div className="space-y-8">
      <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Skill Test: {skillSlug}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {attempt?.status === "completed" ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-medium text-green-900">✅ Test Completed Successfully!</p>
                {redirecting ? (
                  <p className="text-xs text-green-700 mt-2">Redirecting to marketplace...</p>
                ) : (
                  <p className="text-xs text-green-700 mt-2">Marketplace will unlock. Redirecting in 3 seconds...</p>
                )}
              </div>
              <div className="space-y-3 text-sm leading-7 text-slate-700">
                <p><strong>MCQ Stars:</strong> {attempt.mcq_stars}/7</p>
                <p><strong>Practical Stars:</strong> {attempt.practical_stars}/3 (pending peer review)</p>
                <p><strong>Total Stars:</strong> {attempt.total_stars}/10</p>
              </div>
              <Button variant="outline" onClick={() => router.push("/freelancer/skills")} disabled={redirecting}>
                {redirecting ? "Redirecting..." : "Back to Skills"}
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* MCQ Section */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl">MCQ Questions ({answeredMcq}/{mcqCount})</h2>
                <div className="space-y-3">
                  {(attempt?.mcq_questions ?? []).map((question: any, index: number) => {
                    const isAnswered = Boolean(mcqAnswers[question.id]);
                    return (
                      <div
                        key={question.id}
                        className={`rounded-3xl border p-4 transition ${
                          isAnswered
                            ? "border-green-400 bg-green-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <p className="font-medium text-slate-900">
                          {index + 1}. {question.prompt}
                          {isAnswered && <span className="ml-2 text-green-600">✓</span>}
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
                    );
                  })}
                </div>
              </section>

              {/* Practical Section */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl">Practical Questions ({answeredPractical}/{practicalCount})</h2>
                <div className="space-y-4">
                  {(attempt?.practical_questions ?? []).map((question: any, index: number) => {
                    const isAnswered = Boolean(practicalAnswers[question.id]?.trim());
                    return (
                      <div
                        key={question.id}
                        className={`space-y-3 rounded-3xl border p-4 transition ${
                          isAnswered
                            ? "border-green-400 bg-green-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <p className="font-medium text-slate-900">
                          {index + 1}. {question.prompt}
                          {isAnswered && <span className="ml-2 text-green-600">✓</span>}
                        </p>
                        <Textarea
                          value={practicalAnswers[question.id] ?? ""}
                          onChange={(event) =>
                            setPracticalAnswers((current) => ({
                              ...current,
                              [question.id]: event.target.value,
                            }))
                          }
                          placeholder="Write your solution, architecture, or implementation plan..."
                          className="min-h-32"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  onClick={submitAttempt}
                  disabled={submitting || !allAnswered}
                  className="flex-1"
                >
                  {submitting ? "Submitting..." : "Submit Test"}
                </Button>
                <Button variant="outline" onClick={() => router.push("/freelancer/skills")}>
                  Cancel
                </Button>
              </div>
              {!allAnswered ? (
                <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">
                  MCQ: {answeredMcq}/{mcqCount} - Answer all MCQ questions to submit (Practical is optional, admin will review)
                </p>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
