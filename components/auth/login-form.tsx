"use client"

import type React from "react"
import GoogleAuthButton from "../ui/google"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Role = "freelancer" | "client"

export function LoginForm() {
  const [role, setRole] = useState<Role>("freelancer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [strength, setStrength] = useState(0)

  // password strength checker
  const checkStrength = (value: string) => {
    let score = 0
    if (value.length >= 6) score++
    if (/[A-Z]/.test(value)) score++
    if (/[0-9]/.test(value)) score++
    if (/[^A-Za-z0-9]/.test(value)) score++
    setStrength(score)
  }

  const getStrengthLabel = () => {
    switch (strength) {
      case 1:
        return "Very Weak"
      case 2:
        return "Weak"
      case 3:
        return "Strong"
      case 4:
        return "Very Strong"
      default:
        return ""
    }
  }

  const getStrengthColor = () => {
    switch (strength) {
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200"
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await new Promise((r) => setTimeout(r, 800))
      console.log("[v0] Login submitted", { role, email })
      window.location.href = "/"
    } catch (err: any) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-slate-200 shadow-lg rounded-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back 👋</CardTitle>
        <CardDescription className="text-slate-600">
          {role === "freelancer"
            ? "Access your dashboard and proposals."
            : "Manage your jobs and hire talent."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Role Switcher */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("freelancer")}
            className={cn(
              "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200",
              role === "freelancer"
                ? "border-blue-600 bg-blue-600 text-white shadow-md"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            )}
            aria-pressed={role === "freelancer"}
          >
            Freelancer
          </button>
          <button
            type="button"
            onClick={() => setRole("client")}
            className={cn(
              "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200",
              role === "client"
                ? "border-blue-600 bg-blue-600 text-white shadow-md"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            )}
            aria-pressed={role === "client"}
          >
            Client
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                checkStrength(e.target.value)
              }}
              placeholder="********"
              className="rounded-lg"
            />

            {/* Password strength bar */}
            {password && (
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2 transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>
                <p className="text-xs mt-1 font-medium text-slate-600">{getStrengthLabel()}</p>
              </div>
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium shadow-sm transition-all"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">or continue with</span>
            </div>
          </div>

          <GoogleAuthButton
            onClick={() => {
              setLoading(true)
              setTimeout(() => {
                console.log("[v0] Google auth clicked")
                window.location.href = "/"
              }, 800)
            }}
            disabled={loading}
            loading={loading}
            className="w-full bg-white text-slate-700 hover:bg-slate-50 border rounded-lg font-medium shadow-sm transition-all"
          />

          <div className="flex items-center justify-between text-sm mt-4">
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <Link href="/register" className="text-slate-600 hover:text-slate-900">
              Create an account
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
