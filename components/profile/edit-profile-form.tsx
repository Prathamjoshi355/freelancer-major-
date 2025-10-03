"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function EditProfileForm() {
  const [name, setName] = useState("Jordan Doe")
  const [headline, setHeadline] = useState("Senior Frontend Engineer")
  const [bio, setBio] = useState("I build fast, accessible web apps using React and Next.js.")
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>(["React", "Next.js", "Tailwind"])

  function addSkill() {
    const v = skillInput.trim()
    if (!v) return
    if (!skills.includes(v)) setSkills((s) => [...s, v])
    setSkillInput("")
  }
  function removeSkill(v: string) {
    setSkills((s) => s.filter((x) => x !== v))
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // console.log("[v0] Profile saved:", { name, headline, bio, skills })
    alert("Profile saved (mock). You can wire this to your backend next.")
  }

  return (
    <Card asChild>
      <form onSubmit={onSubmit} className="w-full">
        <CardHeader>
          <CardTitle className="text-base">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="min-h-28" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex items-center gap-2">
              <Input
                id="skills"
                placeholder="Add a skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <Button type="button" onClick={addSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => removeSkill(s)}
                  className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Remove ${s}`}
                >
                  <Badge variant="secondary">{s} ✕</Badge>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit">Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
