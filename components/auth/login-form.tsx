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
import { json } from "stream/consumers"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [strength, setStrength] = useState(0)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || "Your email or password is incorrect.")
        return
      }
      console.log (data)
      // console.log({email, password})


      const userRole = data.role || data.user?.role
      console.log(data.role)
    
      if (userRole === "freelancer") {
      window.location.href = "/freelancer"
      console.log("[v0] Login successful", data)
      } else if (userRole === "client") {
      window.location.href = "/client"
      console.log("[v0] Login successful", data)
      } else {
      console.error("Unknown role:", userRole)
      setError("Unknown role, cannot redirect.")

    }
   } catch (err) {
      console.error("Login error:", err)
      setError("Unable to login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-slate-200 shadow-lg rounded-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back 👋</CardTitle>
        <CardDescription className="text-slate-600">
          Sign in to access your dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="rounded-lg"
            />
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
{/* 
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
          /> */}

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
