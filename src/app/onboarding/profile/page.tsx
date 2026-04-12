"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { normalizeApiError, profilesAPI } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PortfolioItemForm = {
  title: string;
  description: string;
  media_urls: string;
  live_url: string;
  github_url: string;
  tech_stack: string;
};

type WorkHistoryItemForm = {
  title: string;
  company: string;
  summary: string;
  start_year: string;
  end_year: string;
};

type EducationItemForm = {
  school: string;
  degree: string;
  year: string;
};

type CertificationItemForm = {
  name: string;
  issuer: string;
  year: string;
  credential_url: string;
};

type ProfileFormState = {
  full_name: string;
  profile_photo_url: string;
  company_name: string;
  city: string;
  country: string;
  industry: string;
  company_size: string;
  description: string;
  preferred_communication_method: string;
  typical_response_time_hours: string;
  username: string;
  timezone: string;
  languages_spoken: string;
  professional_title: string;
  bio: string;
  experience_level: string;
  years_of_experience: string;
  categories: string;
  portfolio_url: string;
  portfolio_items: PortfolioItemForm[];
  hourly_rate: string;
  fixed_project_rate: string;
  availability: string;
  working_hours: string;
  work_history: WorkHistoryItemForm[];
  education: EducationItemForm[];
  certifications: CertificationItemForm[];
  github_url: string;
  linkedin_url: string;
  website_url: string;
};

const emptyPortfolioItem = (): PortfolioItemForm => ({
  title: "",
  description: "",
  media_urls: "",
  live_url: "",
  github_url: "",
  tech_stack: "",
});

const emptyWorkHistoryItem = (): WorkHistoryItemForm => ({
  title: "",
  company: "",
  summary: "",
  start_year: "",
  end_year: "",
});

const emptyEducationItem = (): EducationItemForm => ({
  school: "",
  degree: "",
  year: "",
});

const emptyCertificationItem = (): CertificationItemForm => ({
  name: "",
  issuer: "",
  year: "",
  credential_url: "",
});

function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1">
      <h2 className="font-serif text-2xl text-slate-950">{title}</h2>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function splitCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinCommaList(values?: string[]) {
  return (values ?? []).join(", ");
}

function numberOrUndefined(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function mapPortfolioItems(items?: any[]): PortfolioItemForm[] {
  if (!items?.length) return [emptyPortfolioItem()];
  return items.map((item) => ({
    title: item.title ?? "",
    description: item.description ?? "",
    media_urls: joinCommaList(item.media_urls),
    live_url: item.live_url ?? "",
    github_url: item.github_url ?? "",
    tech_stack: joinCommaList(item.tech_stack),
  }));
}

function mapWorkHistory(items?: any[]): WorkHistoryItemForm[] {
  if (!items?.length) return [emptyWorkHistoryItem()];
  return items.map((item) => ({
    title: item.title ?? "",
    company: item.company ?? "",
    summary: item.summary ?? "",
    start_year: item.start_year ? String(item.start_year) : "",
    end_year: item.end_year ? String(item.end_year) : "",
  }));
}

function mapEducation(items?: any[]): EducationItemForm[] {
  if (!items?.length) return [emptyEducationItem()];
  return items.map((item) => ({
    school: item.school ?? "",
    degree: item.degree ?? "",
    year: item.year ? String(item.year) : "",
  }));
}

function mapCertifications(items?: any[]): CertificationItemForm[] {
  if (!items?.length) return [emptyCertificationItem()];
  return items.map((item) => ({
    name: item.name ?? "",
    issuer: item.issuer ?? "",
    year: item.year ? String(item.year) : "",
    credential_url: item.credential_url ?? "",
  }));
}

function buildInitialForm(profile?: Record<string, any> | null): ProfileFormState {
  return {
    full_name: profile?.full_name ?? "",
    profile_photo_url: profile?.profile_photo_url ?? "",
    company_name: profile?.company_name ?? "",
    city: profile?.city ?? "",
    country: profile?.country ?? "",
    industry: profile?.industry ?? "",
    company_size: profile?.company_size ?? "",
    description: profile?.description ?? "",
    preferred_communication_method: profile?.preferred_communication_method ?? "platform_chat",
    typical_response_time_hours: profile?.typical_response_time_hours ? String(profile.typical_response_time_hours) : "",
    username: profile?.username ?? "",
    timezone: profile?.timezone ?? "",
    languages_spoken: joinCommaList(profile?.languages_spoken),
    professional_title: profile?.professional_title ?? "",
    bio: profile?.bio ?? "",
    experience_level: profile?.experience_level ?? "",
    years_of_experience: profile?.years_of_experience ? String(profile.years_of_experience) : "",
    categories: joinCommaList(profile?.categories),
    portfolio_url: profile?.portfolio_url ?? "",
    portfolio_items: mapPortfolioItems(profile?.portfolio_items),
    hourly_rate: profile?.hourly_rate ? String(profile.hourly_rate) : "",
    fixed_project_rate: profile?.fixed_project_rate ? String(profile.fixed_project_rate) : "",
    availability: profile?.availability ?? "",
    working_hours: profile?.working_hours ?? "",
    work_history: mapWorkHistory(profile?.work_history),
    education: mapEducation(profile?.education),
    certifications: mapCertifications(profile?.certifications),
    github_url: profile?.github_url ?? "",
    linkedin_url: profile?.linkedin_url ?? "",
    website_url: profile?.website_url ?? "",
  };
}

export default function ProfileOnboardingPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, updateProfile, refreshSession } = useAuth();
  const [form, setForm] = useState<ProfileFormState>(() => buildInitialForm(null));
  const [missingRequirements, setMissingRequirements] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!user) return;

    void (async () => {
      try {
        const response = await profilesAPI.getMe();
        const profile = response.data.profile;
        setForm(buildInitialForm(profile));
        setMissingRequirements(profile.missing_requirements ?? []);
      } catch (fetchError) {
        setError(normalizeApiError(fetchError));
      }
    })();
  }, [isAuthenticated, loading, router, user]);

  function setValue<Key extends keyof ProfileFormState>(key: Key, value: ProfileFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateListItem<Key extends "portfolio_items" | "work_history" | "education" | "certifications">(
    key: Key,
    index: number,
    field: string,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [key]: current[key].map((item: any, itemIndex: number) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addListItem(key: "portfolio_items" | "work_history" | "education" | "certifications") {
    const nextItem =
      key === "portfolio_items"
        ? emptyPortfolioItem()
        : key === "work_history"
          ? emptyWorkHistoryItem()
          : key === "education"
            ? emptyEducationItem()
            : emptyCertificationItem();

    setForm((current) => ({
      ...current,
      [key]: [...current[key], nextItem as any],
    }));
  }

  function removeListItem(key: "portfolio_items" | "work_history" | "education" | "certifications", index: number) {
    setForm((current) => {
      const nextItems = current[key].filter((_: any, itemIndex: number) => itemIndex !== index);
      return {
        ...current,
        [key]:
          nextItems.length > 0
            ? nextItems
            : [
                key === "portfolio_items"
                  ? emptyPortfolioItem()
                  : key === "work_history"
                    ? emptyWorkHistoryItem()
                    : key === "education"
                      ? emptyEducationItem()
                      : emptyCertificationItem(),
              ],
        };
    });
  }

  function buildPayload() {
    const basePayload = {
      full_name: form.full_name.trim(),
      profile_photo_url: form.profile_photo_url.trim(),
      company_name: form.company_name.trim(),
      city: form.city.trim(),
      country: form.country.trim(),
      industry: form.industry.trim(),
      company_size: form.company_size.trim(),
      description: form.description.trim(),
      preferred_communication_method: "platform_chat",
      typical_response_time_hours: numberOrUndefined(form.typical_response_time_hours),
      username: form.username.trim(),
      timezone: form.timezone.trim(),
      languages_spoken: splitCommaList(form.languages_spoken),
      professional_title: form.professional_title.trim(),
      bio: form.bio.trim(),
      experience_level: form.experience_level,
      years_of_experience: numberOrUndefined(form.years_of_experience),
      categories: splitCommaList(form.categories),
      portfolio_url: form.portfolio_url.trim(),
      portfolio_items: form.portfolio_items
        .map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
          media_urls: splitCommaList(item.media_urls),
          live_url: item.live_url.trim(),
          github_url: item.github_url.trim(),
          tech_stack: splitCommaList(item.tech_stack),
        }))
        .filter((item) => Object.values(item).some((value) => (Array.isArray(value) ? value.length > 0 : Boolean(value)))),
      hourly_rate: numberOrUndefined(form.hourly_rate),
      fixed_project_rate: numberOrUndefined(form.fixed_project_rate),
      availability: form.availability,
      working_hours: form.working_hours.trim(),
      work_history: form.work_history
        .map((item) => ({
          title: item.title.trim(),
          company: item.company.trim(),
          summary: item.summary.trim(),
          start_year: numberOrUndefined(item.start_year),
          end_year: numberOrUndefined(item.end_year),
        }))
        .filter((item) => Object.values(item).some(Boolean)),
      education: form.education
        .map((item) => ({
          school: item.school.trim(),
          degree: item.degree.trim(),
          year: numberOrUndefined(item.year),
        }))
        .filter((item) => Object.values(item).some(Boolean)),
      certifications: form.certifications
        .map((item) => ({
          name: item.name.trim(),
          issuer: item.issuer.trim(),
          year: numberOrUndefined(item.year),
          credential_url: item.credential_url.trim(),
        }))
        .filter((item) => Object.values(item).some(Boolean)),
      github_url: form.github_url.trim(),
      linkedin_url: form.linkedin_url.trim(),
      website_url: form.website_url.trim(),
    };

    if (user?.role === "client") {
      return {
        full_name: basePayload.full_name,
        profile_photo_url: basePayload.profile_photo_url,
        company_name: basePayload.company_name,
        city: basePayload.city,
        country: basePayload.country,
        industry: basePayload.industry,
        company_size: basePayload.company_size,
        description: basePayload.description,
        preferred_communication_method: basePayload.preferred_communication_method,
        typical_response_time_hours: basePayload.typical_response_time_hours,
      };
    }

    return {
      full_name: basePayload.full_name,
      profile_photo_url: basePayload.profile_photo_url,
      city: basePayload.city,
      country: basePayload.country,
      username: basePayload.username,
      timezone: basePayload.timezone,
      languages_spoken: basePayload.languages_spoken,
      professional_title: basePayload.professional_title,
      bio: basePayload.bio,
      experience_level: basePayload.experience_level,
      years_of_experience: basePayload.years_of_experience,
      categories: basePayload.categories,
      portfolio_url: basePayload.portfolio_url,
      portfolio_items: basePayload.portfolio_items,
      hourly_rate: basePayload.hourly_rate,
      fixed_project_rate: basePayload.fixed_project_rate,
      availability: basePayload.availability,
      working_hours: basePayload.working_hours,
      work_history: basePayload.work_history,
      education: basePayload.education,
      certifications: basePayload.certifications,
      github_url: basePayload.github_url,
      linkedin_url: basePayload.linkedin_url,
      website_url: basePayload.website_url,
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await profilesAPI.updateMe(buildPayload());
      updateProfile(response.data.profile, response.data.workflow);
      setMissingRequirements(response.data.profile?.missing_requirements ?? []);
      await refreshSession();
      router.push(user?.role === "freelancer" ? "/freelancer/skills" : "/dashboard");
    } catch (submitError) {
      setError(normalizeApiError(submitError));
    } finally {
      setSaving(false);
    }
  }

  if (loading || !user) {
    return <div className="py-16 text-center text-slate-500">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <CardHeader className="space-y-3">
          <CardTitle className="font-serif text-3xl">Complete Profile</CardTitle>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">
            {user.role === "client"
              ? "Keep the client profile light, credible, and easy to finish. Spending and hiring trust signals are generated by the platform."
              : "Freelancer access depends on proof. Fill the core identity and work sections now, then complete skill tests to unlock bidding."}
          </p>
          {user.role === "freelancer" && !form.portfolio_items.some((item) => item.title || item.description || item.media_urls || item.live_url || item.github_url) ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Portfolio is not mandatory for activation, but weak portfolio data lowers search visibility.
            </p>
          ) : null}
          {missingRequirements.length > 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Still required: {missingRequirements.join(", ")}
            </p>
          ) : null}
        </CardHeader>
        <CardContent>
          <form className="space-y-10" onSubmit={handleSubmit}>
            <section className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <SectionIntro
                  title="Basic Identity"
                  description="These fields establish who is behind the account. Clients need credibility; freelancers need recognisable proof."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" value={form.full_name} onChange={(event) => setValue("full_name", event.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile_photo_url">{user.role === "client" ? "Profile Picture or Logo URL" : "Profile Photo URL"}</Label>
                <Input id="profile_photo_url" value={form.profile_photo_url} onChange={(event) => setValue("profile_photo_url", event.target.value)} placeholder="https://..." required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={form.city} onChange={(event) => setValue("city", event.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={form.country} onChange={(event) => setValue("country", event.target.value)} required />
              </div>
              {user.role === "client" ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input id="company_name" value={form.company_name} onChange={(event) => setValue("company_name", event.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" value={form.industry} onChange={(event) => setValue("industry", event.target.value)} placeholder="SaaS, healthcare, ecommerce..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company_size">Company Size</Label>
                    <Input id="company_size" value={form.company_size} onChange={(event) => setValue("company_size", event.target.value)} placeholder="1-10, 11-50, 200+" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="typical_response_time_hours">Typical Response Time (hours)</Label>
                    <Input id="typical_response_time_hours" type="number" min={1} value={form.typical_response_time_hours} onChange={(event) => setValue("typical_response_time_hours", event.target.value)} />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="description">Hiring Description</Label>
                    <Textarea id="description" value={form.description} onChange={(event) => setValue("description", event.target.value)} placeholder="What you build, the type of freelancers you hire, and what good collaboration looks like." required />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="preferred_communication_method">Preferred Communication</Label>
                    <Input id="preferred_communication_method" value="In-platform chat only" readOnly />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Handle</Label>
                    <Input id="username" value={form.username} onChange={(event) => setValue("username", event.target.value)} placeholder="janedoe" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" value={form.timezone} onChange={(event) => setValue("timezone", event.target.value)} placeholder="Asia/Kolkata" required />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="languages_spoken">Languages Spoken</Label>
                    <Input id="languages_spoken" value={form.languages_spoken} onChange={(event) => setValue("languages_spoken", event.target.value)} placeholder="English, Hindi, Spanish" required />
                  </div>
                </>
              )}
            </section>

            {user.role === "freelancer" ? (
              <>
                <section className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <SectionIntro
                      title="Professional Positioning"
                      description="This is the short form of your value proposition. It should explain what you do, your level, and the categories you belong in."
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="professional_title">Professional Title</Label>
                    <Input id="professional_title" value={form.professional_title} onChange={(event) => setValue("professional_title", event.target.value)} placeholder="Full Stack Developer" required />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="bio">Bio / Overview</Label>
                    <Textarea id="bio" value={form.bio} onChange={(event) => setValue("bio", event.target.value)} placeholder="Explain your delivery style, strengths, and the outcomes you create." required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="experience_level">Experience Level</Label>
                    <select
                      id="experience_level"
                      className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={form.experience_level}
                      onChange={(event) => setValue("experience_level", event.target.value)}
                      required
                    >
                      <option value="">Select level</option>
                      <option value="entry">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="years_of_experience">Years of Experience</Label>
                    <Input id="years_of_experience" type="number" min={0} value={form.years_of_experience} onChange={(event) => setValue("years_of_experience", event.target.value)} required />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="categories">Categories</Label>
                    <Input id="categories" value={form.categories} onChange={(event) => setValue("categories", event.target.value)} placeholder="Development, Design, Writing" required />
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionIntro
                    title="Portfolio"
                    description="Portfolio quality directly affects search visibility. Each project should make it easy for clients to compare proof, not promises."
                  />
                  <div className="grid gap-2">
                    <Label htmlFor="portfolio_url">Primary Portfolio URL</Label>
                    <Input id="portfolio_url" value={form.portfolio_url} onChange={(event) => setValue("portfolio_url", event.target.value)} placeholder="https://..." />
                  </div>
                  <div className="space-y-4">
                    {form.portfolio_items.map((item, index) => (
                      <div key={`portfolio-${index}`} className="rounded-3xl border border-slate-200 p-4">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <h3 className="font-medium text-slate-900">Project {index + 1}</h3>
                          <Button type="button" variant="outline" onClick={() => removeListItem("portfolio_items", index)}>
                            Remove
                          </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Project Title</Label>
                            <Input value={item.title} onChange={(event) => updateListItem("portfolio_items", index, "title", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Tech Stack</Label>
                            <Input value={item.tech_stack} onChange={(event) => updateListItem("portfolio_items", index, "tech_stack", event.target.value)} placeholder="React, Django, MongoDB" />
                          </div>
                          <div className="grid gap-2 md:col-span-2">
                            <Label>Description</Label>
                            <Textarea value={item.description} onChange={(event) => updateListItem("portfolio_items", index, "description", event.target.value)} placeholder="What problem did you solve, what shipped, and what was your role?" />
                          </div>
                          <div className="grid gap-2">
                            <Label>Live Link</Label>
                            <Input value={item.live_url} onChange={(event) => updateListItem("portfolio_items", index, "live_url", event.target.value)} placeholder="https://..." />
                          </div>
                          <div className="grid gap-2">
                            <Label>GitHub Link</Label>
                            <Input value={item.github_url} onChange={(event) => updateListItem("portfolio_items", index, "github_url", event.target.value)} placeholder="https://github.com/..." />
                          </div>
                          <div className="grid gap-2 md:col-span-2">
                            <Label>Images / Videos URLs</Label>
                            <Input value={item.media_urls} onChange={(event) => updateListItem("portfolio_items", index, "media_urls", event.target.value)} placeholder="https://..., https://..." />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => addListItem("portfolio_items")}>
                      Add Portfolio Project
                    </Button>
                  </div>
                </section>
                <section className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <SectionIntro
                      title="Work and Pricing"
                      description="Clients compare availability, rates, and working overlap before they ever open chat."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hourly_rate">Hourly Rate</Label>
                    <Input id="hourly_rate" type="number" min={0} value={form.hourly_rate} onChange={(event) => setValue("hourly_rate", event.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fixed_project_rate">Fixed Project Rate</Label>
                    <Input id="fixed_project_rate" type="number" min={0} value={form.fixed_project_rate} onChange={(event) => setValue("fixed_project_rate", event.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="availability">Availability</Label>
                    <select
                      id="availability"
                      className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={form.availability}
                      onChange={(event) => setValue("availability", event.target.value)}
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="full_time">Full-time</option>
                      <option value="part_time">Part-time</option>
                      <option value="not_available">Not available</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="working_hours">Working Hours</Label>
                    <Input id="working_hours" value={form.working_hours} onChange={(event) => setValue("working_hours", event.target.value)} placeholder="09:00-17:00 IST" />
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionIntro
                    title="Experience and Background"
                    description="Past work, education, and certifications help clients trust newer freelancers before there is enough platform review history."
                  />
                  <div className="space-y-4">
                    {form.work_history.map((item, index) => (
                      <div key={`work-${index}`} className="rounded-3xl border border-slate-200 p-4">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <h3 className="font-medium text-slate-900">Work History {index + 1}</h3>
                          <Button type="button" variant="outline" onClick={() => removeListItem("work_history", index)}>
                            Remove
                          </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Role</Label>
                            <Input value={item.title} onChange={(event) => updateListItem("work_history", index, "title", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Company</Label>
                            <Input value={item.company} onChange={(event) => updateListItem("work_history", index, "company", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Start Year</Label>
                            <Input value={item.start_year} onChange={(event) => updateListItem("work_history", index, "start_year", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>End Year</Label>
                            <Input value={item.end_year} onChange={(event) => updateListItem("work_history", index, "end_year", event.target.value)} />
                          </div>
                          <div className="grid gap-2 md:col-span-2">
                            <Label>Summary</Label>
                            <Textarea value={item.summary} onChange={(event) => updateListItem("work_history", index, "summary", event.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => addListItem("work_history")}>
                      Add Work History
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {form.education.map((item, index) => (
                      <div key={`education-${index}`} className="rounded-3xl border border-slate-200 p-4">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <h3 className="font-medium text-slate-900">Education {index + 1}</h3>
                          <Button type="button" variant="outline" onClick={() => removeListItem("education", index)}>
                            Remove
                          </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="grid gap-2">
                            <Label>School</Label>
                            <Input value={item.school} onChange={(event) => updateListItem("education", index, "school", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Degree</Label>
                            <Input value={item.degree} onChange={(event) => updateListItem("education", index, "degree", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Year</Label>
                            <Input value={item.year} onChange={(event) => updateListItem("education", index, "year", event.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => addListItem("education")}>
                      Add Education
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {form.certifications.map((item, index) => (
                      <div key={`certification-${index}`} className="rounded-3xl border border-slate-200 p-4">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <h3 className="font-medium text-slate-900">Certification {index + 1}</h3>
                          <Button type="button" variant="outline" onClick={() => removeListItem("certifications", index)}>
                            Remove
                          </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input value={item.name} onChange={(event) => updateListItem("certifications", index, "name", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Issuer</Label>
                            <Input value={item.issuer} onChange={(event) => updateListItem("certifications", index, "issuer", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Year</Label>
                            <Input value={item.year} onChange={(event) => updateListItem("certifications", index, "year", event.target.value)} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Credential URL</Label>
                            <Input value={item.credential_url} onChange={(event) => updateListItem("certifications", index, "credential_url", event.target.value)} placeholder="https://..." />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => addListItem("certifications")}>
                      Add Certification
                    </Button>
                  </div>
                </section>

                <section className="grid gap-5 md:grid-cols-3">
                  <div className="md:col-span-3">
                    <SectionIntro
                      title="Public Links"
                      description="Use proof links only. Contact and payment links remain blocked."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="github_url">GitHub</Label>
                    <Input id="github_url" value={form.github_url} onChange={(event) => setValue("github_url", event.target.value)} placeholder="https://github.com/..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="linkedin_url">LinkedIn</Label>
                    <Input id="linkedin_url" value={form.linkedin_url} onChange={(event) => setValue("linkedin_url", event.target.value)} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website_url">Personal Website</Label>
                    <Input id="website_url" value={form.website_url} onChange={(event) => setValue("website_url", event.target.value)} placeholder="https://..." />
                  </div>
                </section>
              </>
            ) : null}

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button type="submit" disabled={saving}>
              {saving ? "Saving profile..." : "Save and Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
