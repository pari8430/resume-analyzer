"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import {
  FileTextIcon,
  FileEditIcon,
  MessageSquareTextIcon,
  SearchIcon,
  LinkedinIcon,
  MicIcon,
  PlusIcon,
  BarChart3Icon,
  ClockIcon,
  CheckCircleIcon,
} from "lucide-react"
import Link from "next/link"

export function DashboardView() {
  const [recentActivity] = useState([
    {
      id: 1,
      type: "resume",
      title: "Software Engineer Resume",
      date: "2 hours ago",
      status: "Analyzed",
    },
    {
      id: 2,
      type: "cover-letter",
      title: "Product Manager Application",
      date: "Yesterday",
      status: "Generated",
    },
    {
      id: 3,
      type: "interview",
      title: "Frontend Developer Practice",
      date: "3 days ago",
      status: "Completed",
    },
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BarChart3Icon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">CareerBoost AI</span>
          </div>
          <UserNav />
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Tools Grid */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Career Tools</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ToolCard
                icon={<FileTextIcon className="h-5 w-5" />}
                title="Resume Analyzer"
                description="Analyze your resume for ATS compatibility and get improvement suggestions."
                href="/tools/resume-analyzer"
              />
              <ToolCard
                icon={<FileEditIcon className="h-5 w-5" />}
                title="Cover Letter Generator"
                description="Generate personalized cover letters based on job descriptions."
                href="/tools/cover-letter"
              />
              <ToolCard
                icon={<MessageSquareTextIcon className="h-5 w-5" />}
                title="Mock Interview"
                description="Practice interviews with AI and get instant feedback."
                href="/tools/mock-interview"
              />
              <ToolCard
                icon={<SearchIcon className="h-5 w-5" />}
                title="Job Matcher"
                description="Find relevant job opportunities based on your skills."
                href="/tools/job-matcher"
              />
              <ToolCard
                icon={<LinkedinIcon className="h-5 w-5" />}
                title="LinkedIn Optimizer"
                description="Enhance your LinkedIn profile for better visibility."
                href="/tools/linkedin-optimizer"
              />
              <ToolCard
                icon={<MicIcon className="h-5 w-5" />}
                title="Speech Analyzer"
                description="Analyze your speaking patterns to improve interview performance."
                href="/tools/speech-analyzer"
              />
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Your recent interactions with our tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        {activity.type === "resume" && <FileTextIcon className="h-5 w-5 text-blue-500" />}
                        {activity.type === "cover-letter" && <FileEditIcon className="h-5 w-5 text-green-500" />}
                        {activity.type === "interview" && <MessageSquareTextIcon className="h-5 w-5 text-purple-500" />}
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" /> {activity.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm flex items-center gap-1 text-muted-foreground">
                          <CheckCircleIcon className="h-3 w-3 text-green-500" /> {activity.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <PlusIcon className="h-4 w-4 mr-2" /> Start New Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Usage Stats */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Usage Statistics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Resume Analyses" value="12" change="+3" />
              <StatCard title="Cover Letters" value="5" change="+1" />
              <StatCard title="Mock Interviews" value="8" change="+2" />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function ToolCard({
  icon,
  title,
  description,
  href,
}: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <Link href={href} className="block">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-md font-medium">{title}</CardTitle>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  const isPositive = change.startsWith("+")

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-xs mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>{change} this month</div>
      </CardContent>
    </Card>
  )
}

