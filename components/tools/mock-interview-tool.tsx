"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, MessageSquareTextIcon, SendIcon, MicIcon, PauseIcon } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { conductMockInterview } from "@/lib/conduct-mock-interview"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  feedback?: {
    clarity: number
    relevance: number
    confidence: number
    overall: number
    suggestions: string[]
  }
}

export function MockInterviewTool() {
  const [jobRole, setJobRole] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startInterview = async () => {
    if (!jobRole) return

    setInterviewStarted(true)
    setIsLoading(true)

    try {
      const introMessage = await conductMockInterview({
        jobRole,
        messages: [],
        isFirstMessage: true,
      })

      setMessages([
        {
          id: Date.now().toString(),
          role: "assistant",
          content: introMessage,
        },
      ])
    } catch (error) {
      console.error("Error starting interview:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await conductMockInterview({
        jobRole,
        messages: [...messages, userMessage],
        isFirstMessage: false,
      })

      // Parse the response to get the message and feedback
      const { message, feedback } = JSON.parse(response)

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: message,
          feedback,
        },
      ])
    } catch (error) {
      console.error("Error in interview:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, this would start/stop speech recognition
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
            <MessageSquareTextIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mock Interview</h1>
            <p className="text-muted-foreground">Practice with our AI interviewer and receive instant feedback</p>
          </div>
        </div>

        {!interviewStarted ? (
          <Card className="max-w-2xl mx-auto shadow-lg border-border/50">
            <CardHeader>
              <CardTitle>Start a Mock Interview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-role">Select Job Role</Label>
                <Select value={jobRole} onValueChange={setJobRole}>
                  <SelectTrigger id="job-role">
                    <SelectValue placeholder="Select a job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software-engineer">Software Engineer</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="ux-designer">UX Designer</SelectItem>
                    <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                    <SelectItem value="sales-representative">Sales Representative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-muted/30 rounded-md">
                <h3 className="font-medium mb-2">How it works:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Select a job role for your interview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Our AI interviewer will ask you relevant questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Respond to each question in writing or using voice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Receive instant feedback on your responses</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" disabled={!jobRole} onClick={startInterview}>
                Start Interview
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-border/50 h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Interviewer" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    AI Interviewer
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                        >
                          {message.role === "assistant" && (
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="AI Interviewer" />
                                <AvatarFallback>AI</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">AI Interviewer</span>
                            </div>
                          )}
                          <div className="whitespace-pre-line">{message.content}</div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=24&width=24" alt="AI Interviewer" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">AI Interviewer</span>
                          </div>
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-primary/50 animate-pulse"></div>
                            <div className="h-2 w-2 rounded-full bg-primary/50 animate-pulse delay-150"></div>
                            <div className="h-2 w-2 rounded-full bg-primary/50 animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={isRecording ? "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300" : ""}
                      onClick={toggleRecording}
                    >
                      {isRecording ? <PauseIcon className="h-4 w-4" /> : <MicIcon className="h-4 w-4" />}
                    </Button>
                    <Textarea
                      placeholder="Type your response..."
                      className="flex-1 min-h-[60px]"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" disabled={!input.trim() || isLoading} onClick={handleSendMessage}>
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle>Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {messages.length > 0 && messages[messages.length - 1].feedback ? (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Clarity</span>
                            <span>{messages[messages.length - 1].feedback?.clarity}/10</span>
                          </div>
                          <Progress value={messages[messages.length - 1].feedback?.clarity * 10} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Relevance</span>
                            <span>{messages[messages.length - 1].feedback?.relevance}/10</span>
                          </div>
                          <Progress value={messages[messages.length - 1].feedback?.relevance * 10} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Confidence</span>
                            <span>{messages[messages.length - 1].feedback?.confidence}/10</span>
                          </div>
                          <Progress value={messages[messages.length - 1].feedback?.confidence * 10} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>Overall</span>
                            <span>{messages[messages.length - 1].feedback?.overall}/10</span>
                          </div>
                          <Progress value={messages[messages.length - 1].feedback?.overall * 10} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Suggestions</h3>
                        <ul className="space-y-2 text-sm">
                          {messages[messages.length - 1].feedback?.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <MessageSquareTextIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">No Feedback Yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Respond to the interviewer's questions to receive feedback on your answers.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

