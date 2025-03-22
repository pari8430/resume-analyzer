"use client"

import { Button } from "@/components/ui/button"
import { SignInButton } from "@/components/auth/sign-in-button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">CareerBoost AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <SignInButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text max-w-4xl">
          Your AI-Powered Career Coach
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
          Optimize your resume, ace your interviews, and land your dream job with our suite of AI-powered tools.
        </p>
        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <SignInButton variant="default" size="lg" className="gap-2">
            Get Started <span aria-hidden="true">→</span>
          </SignInButton>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">All-in-One Career Toolkit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="📝"
            title="Resume Analyzer"
            description="Get AI-powered feedback on your resume's structure, content, and ATS compatibility."
          />
          <FeatureCard
            icon="✉️"
            title="Cover Letter Generator"
            description="Generate personalized cover letters tailored to specific job descriptions in seconds."
          />
          <FeatureCard
            icon="🎙️"
            title="Mock Interview AI"
            description="Practice with our AI interviewer and receive instant feedback on your responses."
          />
          <FeatureCard
            icon="🔍"
            title="Job Matching"
            description="Find relevant job opportunities based on your skills and experience."
          />
          <FeatureCard
            icon="👔"
            title="LinkedIn Optimizer"
            description="Enhance your LinkedIn profile to attract more recruiters and opportunities."
          />
          <FeatureCard
            icon="🗣️"
            title="Speech Analyzer"
            description="Analyze your speaking patterns to improve confidence and clarity in interviews."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 bg-muted/30 rounded-3xl my-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="CareerBoost AI helped me land interviews at 3 top tech companies. The resume analyzer was a game-changer!"
            author="Sarah J."
            role="Software Engineer"
          />
          <TestimonialCard
            quote="The mock interview feature prepared me for questions I never thought of. I felt so much more confident in my actual interview."
            author="Michael T."
            role="Marketing Manager"
          />
          <TestimonialCard
            quote="I was struggling with my job search until I found this platform. Within 2 weeks of optimizing my resume, I had multiple offers."
            author="Priya K."
            role="Data Scientist"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Career?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of job seekers who have transformed their job search with CareerBoost AI.
        </p>
        <SignInButton variant="default" size="lg" className="gap-2">
          Get Started Today <span aria-hidden="true">→</span>
        </SignInButton>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold">CareerBoost AI</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} CareerBoost AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50 transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50">
      <div className="text-2xl mb-4">"</div>
      <p className="italic mb-4">{quote}</p>
      <div className="font-medium">{author}</div>
      <div className="text-sm text-muted-foreground">{role}</div>
    </div>
  )
}

