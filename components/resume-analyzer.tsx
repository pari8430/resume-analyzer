"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { analyzeResume } from "@/lib/analyze-resume"
import { useEffect, useState } from "react"
import { FeedbackCard } from "./feedback-card"
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, DownloadIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ResumeAnalyzerProps {
  resumeText: string
  isAnalyzing: boolean
  setIsAnalyzing: (isAnalyzing: boolean) => void
  analysis: any
  setAnalysis: (analysis: any) => void
  onReset: () => void
}

export function ResumeAnalyzer({
  resumeText,
  isAnalyzing,
  setIsAnalyzing,
  analysis,
  setAnalysis,
  onReset,
}: ResumeAnalyzerProps) {
  const [activeTab, setActiveTab] = useState("summary")
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const performAnalysis = async () => {
      if (isAnalyzing && resumeText) {
        try {
          const result = await analyzeResume(resumeText)
          setAnalysis(result)
          if (result.overallScore >= 80) {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 3000)
          }
        } catch (error) {
          console.error("Error analyzing resume:", error)
        } finally {
          setIsAnalyzing(false)
        }
      }
    }

    performAnalysis()
  }, [resumeText, isAnalyzing, setIsAnalyzing, setAnalysis])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircleIcon className="h-6 w-6 text-green-500" />
    if (score >= 60) return <AlertCircleIcon className="h-6 w-6 text-amber-500" />
    return <XCircleIcon className="h-6 w-6 text-red-500" />
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="max-w-5xl mx-auto relative">
      {showConfetti && <Confetti />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Analysis</h1>
          <p className="text-muted-foreground mt-1">AI-powered feedback to improve your resume</p>
        </div>
        <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Upload Another
        </Button>
      </div>

      {isAnalyzing ? (
        <Card className="w-full p-8 border-border/50 shadow-lg">
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
                <SparklesIcon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Analyzing Your Resume</h2>
              <p className="text-muted-foreground max-w-md">
                Our AI is reviewing your resume for content quality, ATS compatibility, and formatting.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Extracting information</span>
                  <span>Complete</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing content</span>
                  <span>{Math.floor(Math.random() * 30) + 70}%</span>
                </div>
                <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Checking ATS compatibility</span>
                  <span>{Math.floor(Math.random() * 40) + 60}%</span>
                </div>
                <Progress value={Math.floor(Math.random() * 40) + 60} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Evaluating formatting</span>
                  <span>{Math.floor(Math.random() * 50) + 50}%</span>
                </div>
                <Progress value={Math.floor(Math.random() * 50) + 50} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Generating recommendations</span>
                  <span>{Math.floor(Math.random() * 60) + 40}%</span>
                </div>
                <Progress value={Math.floor(Math.random() * 60) + 40} className="h-2" />
              </div>
            </div>
          </div>
        </Card>
      ) : analysis ? (
        <div className="space-y-6">
          <Card className="border-border/50 shadow-lg overflow-hidden">
            <div className="bg-muted/30 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ScoreCard
                  score={analysis.overallScore}
                  label="Overall Score"
                  icon={getScoreIcon(analysis.overallScore)}
                  color={getProgressColor(analysis.overallScore)}
                />
                <ScoreCard
                  score={analysis.atsScore}
                  label="ATS Compatibility"
                  icon={getScoreIcon(analysis.atsScore)}
                  color={getProgressColor(analysis.atsScore)}
                />
                <ScoreCard
                  score={analysis.contentScore}
                  label="Content Quality"
                  icon={getScoreIcon(analysis.contentScore)}
                  color={getProgressColor(analysis.contentScore)}
                />
                <ScoreCard
                  score={analysis.formattingScore}
                  label="Formatting"
                  icon={getScoreIcon(analysis.formattingScore)}
                  color={getProgressColor(analysis.formattingScore)}
                />
              </div>
            </div>

            <div className="p-6">
              <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="ats">ATS Compatibility</TabsTrigger>
                  <TabsTrigger value="formatting">Formatting</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-6 mt-2 animate-in fade-in-50">
                  <div className="p-6 bg-muted/30 rounded-xl border border-border/50">
                    <p className="text-base leading-relaxed">{analysis.summary}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-primary" />
                      Key Improvements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysis.keyImprovements.map((improvement: string, index: number) => (
                        <FeedbackCard key={index} content={improvement} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4 mt-2 animate-in fade-in-50">
                  <div className="space-y-4">
                    {analysis.contentFeedback.map((feedback: any, index: number) => (
                      <FeedbackCard
                        key={index}
                        title={feedback.title}
                        content={feedback.description}
                        type={feedback.type}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ats" className="space-y-4 mt-2 animate-in fade-in-50">
                  <div className="space-y-4">
                    {analysis.atsFeedback.map((feedback: any, index: number) => (
                      <FeedbackCard
                        key={index}
                        title={feedback.title}
                        content={feedback.description}
                        type={feedback.type}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="formatting" className="space-y-4 mt-2 animate-in fade-in-50">
                  <div className="space-y-4">
                    {analysis.formattingFeedback.map((feedback: any, index: number) => (
                      <FeedbackCard
                        key={index}
                        title={feedback.title}
                        content={feedback.description}
                        type={feedback.type}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-muted/30 p-6 flex justify-end">
              <Button className="gap-2">
                <DownloadIcon className="h-4 w-4" />
                Download Full Report
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="w-full p-12 border-border/50 shadow-lg flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
            <SparklesIcon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Processing your resume</h2>
          <p className="text-muted-foreground">Please wait while we prepare your analysis...</p>
        </Card>
      )}
    </div>
  )
}

function ScoreCard({
  score,
  label,
  icon,
  color,
}: { score: number; label: string; icon: React.ReactNode; color: string }) {
  return (
    <Card className="p-6 flex flex-col items-center justify-center text-center bg-background border-border/50 transition-all duration-200 hover:shadow-md">
      <div className="relative mb-3 w-full">
        <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
          <circle
            className="text-muted/20"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <circle
            className={color}
            strokeWidth="8"
            strokeDasharray={`${score * 2.64}, 1000`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  )
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"][
                Math.floor(Math.random() * 6)
              ],
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

