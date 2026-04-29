"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";


const sharedLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/onboarding/profile", label: "Profile" },
  { href: "/contracts", label: "Contracts" },
];


export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, role, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const roleLinks =
    role === "client"
      ? [
          { href: "/client/post-job", label: "Post Job" },
          { href: "/client/jobs", label: "Manage Jobs" },
        ]
      : [
          { href: "/freelancer/skills", label: "Skills" },
          { href: "/jobs", label: "Browse Jobs" },
        ];
  
  // Deduplicate links based on href
  const navLinks = mounted && isAuthenticated
    ? Array.from(new Map([...sharedLinks, ...roleLinks].map(link => [link.href, link])).values())
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] text-sm font-semibold text-white">
            FM
          </span>
          <div>
            <p className="font-serif text-xl leading-none">ForgeMarket</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Controlled Freelance Network
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {mounted ? isAuthenticated ? (
            <>
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  {role}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          ) : (
            <div className="h-10 w-24 animate-pulse rounded bg-slate-200" />
          )}
        </div>
      </div>
    </header>
  );
}
