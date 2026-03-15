"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PostJobPage() {
  const [loading, setLoading] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Job created (demo)")
    }, 900)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h1 className="text-pretty text-2xl font-semibold tracking-tight">Post a Job</h1>
        <p className="text-sm text-muted-foreground">Create and publish a new job listing.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Job details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job title</Label>
            <Input id="title" name="title" placeholder="e.g., React developer for dashboard" required />
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Apps</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data">Data / AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Job type</Label>
              <Select name="type">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input id="budget" name="budget" type="number" min={1} placeholder="e.g., 1500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Desired deadline</Label>
              <Input id="deadline" name="deadline" type="date" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              name="description"
              placeholder="Describe the scope, deliverables, tech stack..."
              rows={6}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" name="skills" placeholder="e.g., React, Next.js, Tailwind" />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="outline" type="reset">
            Clear
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish Job"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
