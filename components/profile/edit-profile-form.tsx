"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@../../../components/ui/card"
import { Input } from "@../../../components/ui/input"
import { Textarea } from "@../../../components/ui/textarea"
import { Label } from "@../../../components/ui/label"
import { Button } from "@../../../components/ui/button"
import { Badge } from "@../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@../../../components/ui/avatar"
import { Camera, Upload, X, Plus } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  location: string
  about: string
  website: string
  industry: string
  companySize: string
  avgBudget: string
  skills: string[]
  skillInput: string
  experienceLevel: string
  hourlyRate: string
  languages: string
  education: string
  certifications: string
}
interface EditProfileFormProps {
  userType: "client" | "freelancer"
  backendData: {
    name: string
    email: string
  }
}
export function EditProfileForm({ userType }: EditProfileFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    website: "",
    industry: "",
    companySize: "",
    avgBudget: "",
    skills: [],
    skillInput: "",
    experienceLevel: "",
    hourlyRate: "",
    languages: "",
    education: "",
    certifications: "",
  })

  const [verifiedImage, setVerifiedImage] = useState<string | null>(null)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    try {
      setCameraOpen(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      alert("Camera access denied or unavailable.")
      setCameraOpen(false)
    }
  }

  const captureSelfie = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL("image/png")
        setVerifiedImage(imageData)
        const stream = video.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        setCameraOpen(false)
      }
    }
  }

  const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setProfilePic(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const addSkill = () => {
    const skill = formData.skillInput.trim()
    if (!skill || formData.skills.includes(skill)) return
    setFormData({
      ...formData,
      skills: [...formData.skills, skill],
      skillInput: "",
    })
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleSubmit = () => {
    console.log("Profile data:", { ...formData, verifiedImage, profilePic })
    alert(`${userType} profile updated successfully!`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Profile</h1>
            <p className="text-slate-600 mt-1">
              {userType === "client" ? "Update your business information" : "Update your professional profile"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Face Verification & Profile Picture */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Face Verification */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  Face Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                {verifiedImage ? (
                  <div className="relative">
                    <img
                      src={verifiedImage}
                      alt="Verified Selfie"
                      className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2">
                      ✓
                    </div>
                  </div>
                ) : cameraOpen ? (
                  <div className="space-y-4 flex flex-col items-center">
                    <video ref={videoRef} autoPlay className="w-64 h-48 rounded-lg border-2 border-slate-300" />
                    <canvas ref={canvasRef} width="200" height="200" className="hidden" />
                    <Button onClick={captureSelfie} className="w-full max-w-xs">
                      Capture Photo
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4 py-8">
                    <div className="w-40 h-40 rounded-full bg-slate-100 flex items-center justify-center">
                      <Camera className="h-16 w-16 text-slate-400" />
                    </div>
                    <Button onClick={startCamera} variant="outline">
                      Start Verification
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profile Picture */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5 text-purple-600" />
                  {userType === "client" ? "Company Logo" : "Profile Picture"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-40 w-40 border-4 border-slate-200">
                  {profilePic ? (
                    <AvatarImage src={profilePic} alt="Profile" className="object-cover" />
                  ) : (
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {formData.name?.slice(0, 2).toUpperCase() || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Label htmlFor="profile-pic" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                  <Input
                    id="profile-pic"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="hidden"
                  />
                </Label>
              </CardContent>
            </Card>
          </div>

          {/* Basic Information */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{userType === "client" ? "Company Name" : "Full Name"}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={userType === "client" ? "Enter company name" : "Enter your full name"}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="about">About / Bio</Label>
                <Textarea
                  id="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell us about yourself or your company..."
                  className="mt-1.5 min-h-32 resize-none"
                />
              </div>

              <div>
                <Label htmlFor="website">Website / LinkedIn</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="mt-1.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Conditional Sections */}
          {userType === "client" ? (
            <>
              {/* Business Details */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Business Details</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry Type</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g., Technology, Healthcare"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <Input
                      id="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      placeholder="e.g., 1-10, 50-200"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="avgBudget">Average Project Budget</Label>
                    <Input
                      id="avgBudget"
                      value={formData.avgBudget}
                      onChange={handleChange}
                      placeholder="e.g., $5,000 - $10,000"
                      className="mt-1.5"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Verification */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Email Verification</span>
                      <span className="text-green-600">✓ Verified</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Phone Verification</span>
                      <span className="text-slate-500">Optional</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Business License</span>
                      <span className="text-slate-500">Optional</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Payment Method</span>
                      <span className="text-blue-600">Secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* Professional Details */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        id="skills"
                        placeholder="Add a skill (e.g., React, Design)"
                        value={formData.skillInput}
                        onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill()
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="px-3 py-1.5 cursor-pointer hover:bg-slate-300 transition-colors"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill}
                            <X className="h-3 w-3 ml-1.5" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Input
                        id="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        placeholder="e.g., Junior, Senior, Expert"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        placeholder="e.g., 50"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="languages">Languages</Label>
                    <Input
                      id="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      placeholder="e.g., English, Spanish, French"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="e.g., Bachelor's in Computer Science"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certifications">Certifications</Label>
                      <Input
                        id="certifications"
                        value={formData.certifications}
                        onChange={handleChange}
                        placeholder="e.g., AWS Certified, Google Analytics"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} className="px-8">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}