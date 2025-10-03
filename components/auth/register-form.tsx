"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ role }: { role: "client" | "freelancer" }) {
  const [loading, setLoading] = useState(false)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up as {role === "client" ? "Client" : "Freelancer"}</CardTitle>
        <CardDescription>
          {role === "client" ? "Hire top talent for your project." : "Showcase skills and land great gigs."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          action="#"
          onSubmit={(e) => {
            e.preventDefault()
            setLoading(true)
            setTimeout(() => setLoading(false), 800)
          }}
        >
          {role === "client" ? (
            <div className="grid gap-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" placeholder="Acme Inc." />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" placeholder="Jane Doe" />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
