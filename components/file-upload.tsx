"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloudIcon, FileTextIcon, XIcon } from "lucide-react"
import { useState, useRef } from "react"
import { extractTextFromFile } from "@/lib/extract-text"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onTextExtracted: (text: string) => void
  setIsAnalyzing: (isAnalyzing: boolean) => void
}

export function FileUpload({ onTextExtracted, setIsAnalyzing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    setError(null)

    // Check file type
    const fileType = file.type
    if (
      fileType !== "application/pdf" &&
      fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("Please upload a PDF or DOCX file")
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB")
      return
    }

    setFile(file)
  }

  const handleAnalyze = async () => {
    if (!file) return

    try {
      setIsExtracting(true)
      const text = await extractTextFromFile(file)

      if (!text || text.trim().length === 0) {
        setError("Could not extract text from the file. Please try another file.")
        setIsExtracting(false)
        return
      }

      onTextExtracted(text)
      setIsAnalyzing(true)
    } catch (err) {
      setError("Error extracting text from file. Please try again.")
      console.error(err)
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-border/50 overflow-hidden">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileTextIcon className="h-5 w-5 text-primary" />
          Upload Your Resume
        </CardTitle>
        <CardDescription>Upload your resume in PDF or DOCX format to get started</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200",
            isDragging
              ? "border-primary bg-primary/5 scale-[0.98]"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50",
            file && "bg-muted/30",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} ref={fileInputRef} />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <UploadCloudIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-lg">{file ? file.name : "Drag and drop your resume here"}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {file
                  ? `${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.type.includes("pdf") ? "PDF" : "DOCX"} file`
                  : "Supports PDF and DOCX files up to 10MB"}
              </p>

              {file && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                  }}
                >
                  <XIcon className="h-4 w-4 mr-2" />
                  Remove file
                </Button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg text-sm flex items-start gap-2">
            <XIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-4">
        <Button
          className="w-full relative overflow-hidden group"
          size="lg"
          disabled={!file || isExtracting}
          onClick={handleAnalyze}
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/20 group-hover:translate-x-0"></span>
          <span className="relative flex items-center justify-center gap-2">
            {isExtracting ? "Extracting Text..." : "Analyze Resume"}
            {!isExtracting && <Sparkles className="h-4 w-4" />}
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}

function Sparkles({ className }: { className?: string }) {
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

