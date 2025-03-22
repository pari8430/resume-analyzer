"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeftIcon,
  FileEditIcon,
  Sparkles,
  CopyIcon,
  DownloadIcon,
  RefreshCwIcon as RefreshIcon,
} from "lucide-react"
import Link from "next/link"
import { generateCoverLetter } from "@/lib/generate-cover-letter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CoverLetterTool() {
  const [jobDescription, setJobDescription] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [coverLetter, setCoverLetter] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!jobDescription || !name || !company || !position) return

    setIsGenerating(true)
    try {
      const result = await generateCoverLetter({
        jobDescription,
        name,
        email,
        phone,
        company,
        position,
      })
      setCoverLetter(result)
    } catch (error) {
      console.error("Error generating cover letter:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileEditIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Cover Letter Generator</h1>
            <p className="text-muted-foreground">
              Generate personalized cover letters tailored to specific job descriptions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    placeholder="e.g. Senior Software Engineer"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="e.g. Acme Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    className="min-h-[200px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </CardContent>

              <CardHeader className="pb-0">
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="e.g. (123) 456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full relative overflow-hidden group"
                  size="lg"
                  disabled={isGenerating || !jobDescription || !name || !company || !position}
                  onClick={handleGenerate}
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/20 group-hover:translate-x-0"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {isGenerating ? "Generating..." : "Generate Cover Letter"}
                    {!isGenerating && <Sparkles className="h-4 w-4" />}
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Output Section */}
          <div>
            {coverLetter ? (
              <Card className="shadow-lg border-border/50 h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Cover Letter</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <CopyIcon className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCoverLetter(null)}>
                      <RefreshIcon className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                  <Tabs defaultValue="preview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="edit">Edit</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="min-h-[500px]">
                      <div className="p-6 bg-white dark:bg-slate-900 rounded-md border whitespace-pre-line">
                        {coverLetter}
                      </div>
                    </TabsContent>
                    <TabsContent value="edit" className="min-h-[500px]">
                      <Textarea
                        className="min-h-[500px] font-mono"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-border/50 h-full flex flex-col justify-center items-center p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <FileEditIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Your Cover Letter Will Appear Here</h3>
                <p className="text-muted-foreground max-w-md">
                  Fill in the job details and your personal information, then click "Generate Cover Letter" to create a
                  personalized cover letter.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

