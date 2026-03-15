"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export type SearchMode = "freelancers" | "jobs"

export function SearchFilters({
  onChange,
}: {
  onChange: (params: { mode: SearchMode; q: string; category: string; remoteOnly: boolean }) => void
}) {
  const [mode, setMode] = useState<SearchMode>("freelancers")
  const [q, setQ] = useState("")
  const [category, setCategory] = useState("all")
  const [remoteOnly, setRemoteOnly] = useState(false)

  function emit(next?: Partial<{ mode: SearchMode; q: string; category: string; remoteOnly: boolean }>) {
    const payload = { mode, q, category, remoteOnly, ...next }
    onChange(payload)
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border p-3">
      <Tabs
        value={mode}
        onValueChange={(v) => {
          setMode(v as SearchMode)
          emit({ mode: v as SearchMode })
        }}
      >
        <TabsList>
          <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-3 md:grid-cols-3">
        <Input
          placeholder="Search by name, skill, or keyword"
          aria-label="Search query"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            emit({ q: e.target.value })
          }}
        />
        <div className="grid gap-1">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={(v) => {
              setCategory(v)
              emit({ category: v })
            }}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="fullstack">Full-stack</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="remote"
            checked={remoteOnly}
            onCheckedChange={(v) => {
              setRemoteOnly(v)
              emit({ remoteOnly: v })
            }}
          />
          <Label htmlFor="remote">Remote only</Label>
        </div>
      </div>
    </div>
  )
}
