"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Role = "freelancer" | "client"

export function LoginForm() {
  const [role, setRole] = useState<Role>("freelancer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // Placeholder auth flow
      await new Promise((r) => setTimeout(r, 800))
      console.log("[v0] Login submitted", { role, email })
      // Redirect placeholder
      window.location.href = "/"
    } catch (err: any) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Log in</CardTitle>
        <CardDescription className="text-slate-600">
          {role === "freelancer" ? "Access your dashboard and proposals." : "Manage your jobs and hire talent."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("freelancer")}
            className={cn(
              "rounded-md border px-3 py-2 text-sm",
              role === "freelancer"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-50",
            )}
            aria-pressed={role === "freelancer"}
          >
            Freelancer
          </button>
          <button
            type="button"
            onClick={() => setRole("client")}
            className={cn(
              "rounded-md border px-3 py-2 text-sm",
              role === "client"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-50",
            )}
            aria-pressed={role === "client"}
          >
            Client
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-describedby="email-desc"
            />
            <p id="email-desc" className="sr-only">
              Enter your email address
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              aria-describedby="password-desc"
            />
            <p id="password-desc" className="sr-only">
              Enter your password
            </p>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700">
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="flex items-center justify-between">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <Link href="/register" className="text-sm text-slate-600 hover:text-slate-900">
              Create an account
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
