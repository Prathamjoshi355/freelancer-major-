"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HireContractPage() {
  const [loading, setLoading] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Contract created (demo)")
    }, 900)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h1 className="text-pretty text-2xl font-semibold tracking-tight">Hire / Contract</h1>
        <p className="text-sm text-muted-foreground">Finalize details and send a contract to the freelancer.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contract details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="freelancer">Freelancer</Label>
              <Input id="freelancer" name="freelancer" placeholder="Name or profile URL" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="job">Job</Label>
              <Select name="job">
                <SelectTrigger id="job">
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landing">Landing page redesign</SelectItem>
                  <SelectItem value="ios">iOS bug fix</SelectItem>
                  <SelectItem value="shopify">Shopify theme tweaks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="rate">Rate</Label>
              <Input id="rate" name="rate" placeholder="$ / hr or fixed" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start">Start date</Label>
              <Input id="start" name="start" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end">End date (optional)</Label>
              <Input id="end" name="end" type="date" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="milestones">Milestones</Label>
            <Textarea id="milestones" name="milestones" placeholder="List milestones and amounts..." rows={4} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Any additional terms..." rows={4} />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="outline" type="reset">
            Clear
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Contract"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
