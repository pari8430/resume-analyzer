"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { ResumeAnalyzer } from "@/components/resume-analyzer"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, FileTextIcon } from "lucide-react"
import Link from "next/link"

export function ResumeAnalyzerTool() {
  const [resumeText, setResumeText] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

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
            <FileTextIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Resume Analyzer</h1>
            <p className="text-muted-foreground">
              Get AI-powered feedback on your resume's structure, content, and ATS compatibility
            </p>
          </div>
        </div>

        {!resumeText ? (
          <div className="max-w-3xl mx-auto">
            <FileUpload onTextExtracted={(text) => setResumeText(text)} setIsAnalyzing={setIsAnalyzing} />
          </div>
        ) : (
          <ResumeAnalyzer
            resumeText={resumeText}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
            analysis={analysis}
            setAnalysis={setAnalysis}
            onReset={() => {
              setResumeText(null)
              setAnalysis(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

