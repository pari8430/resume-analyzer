import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface MockInterviewParams {
  jobRole: string
  messages: Array<{ role: string; content: string }>
  isFirstMessage: boolean
}

export async function conductMockInterview(params: MockInterviewParams): Promise<string> {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OpenAI API key is missing. Using mock data instead.")
      return getMockInterviewResponse(params)
    }

    // Prepare the conversation history
    const conversationHistory = params.messages.map((msg) => {
      return {
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      }
    })

    // Use the AI SDK to conduct the mock interview
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: params.isFirstMessage
        ? `You are conducting a mock interview for a ${params.jobRole} position. Start the interview with a brief introduction and your first question.`
        : `Continue the mock interview for a ${params.jobRole} position. Analyze the candidate's last response, provide feedback, and ask the next question. Return your response in JSON format with "message" containing your next question and "feedback" containing an assessment of the candidate's previous answer with scores for clarity, relevance, confidence, and overall on a scale of 1-10, plus 2-3 specific suggestions for improvement.`,
      messages: conversationHistory,
      system: `
        You are an expert interviewer with years of experience hiring for ${params.jobRole} positions.
        Ask relevant technical and behavioral questions that would be common in a real interview.
        If this is the first message, introduce yourself briefly and ask your first question.
        For subsequent messages, analyze the candidate's response, then ask a follow-up question.
        
        ${
          !params.isFirstMessage
            ? `
        Provide your response in the following JSON format:
        {
          "message": "Your next question or response",
          "feedback": {
            "clarity": number, // 1-10 score
            "relevance": number, // 1-10 score
            "confidence": number, // 1-10 score
            "overall": number, // 1-10 score
            "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
          }
        }
        `
            : ""
        }
      `,
    })

    return text
  } catch (error) {
    console.error("Error in mock interview:", error)
    // Fall back to mock data if AI generation fails
    return getMockInterviewResponse(params)
  }
}

function getMockInterviewResponse(params: MockInterviewParams): string {
  if (params.isFirstMessage) {
    // First message - introduction
    if (params.jobRole === "software-engineer") {
      return "Hello! I'm Alex, a technical interviewer. Today, I'll be conducting your mock interview for the Software Engineer position. We'll cover some technical concepts and problem-solving scenarios. Let's start with something straightforward: Could you explain the difference between REST and GraphQL APIs, and when you might choose one over the other?"
    } else if (params.jobRole === "product-manager") {
      return "Hi there! I'm Jordan, and I'll be your interviewer today for the Product Manager position. I'd like to understand your approach to product development and decision-making. To start, could you walk me through how you would prioritize features for a new product release?"
    } else {
      return `Hello! I'm Taylor, and I'll be conducting your mock interview for the ${params.jobRole} position today. Let's start with a common question: Could you tell me about your background and why you're interested in this role?`
    }
  } else {
    // Follow-up message with feedback
    const feedbackData = {
      message: getNextQuestion(params.jobRole),
      feedback: {
        clarity: Math.floor(Math.random() * 3) + 7, // 7-9
        relevance: Math.floor(Math.random() * 3) + 7, // 7-9
        confidence: Math.floor(Math.random() * 4) + 6, // 6-9
        overall: Math.floor(Math.random() * 3) + 7, // 7-9
        suggestions: getSuggestions(params.jobRole),
      },
    }

    return JSON.stringify(feedbackData)
  }
}

function getNextQuestion(jobRole: string): string {
  const softwareEngineerQuestions = [
    "Can you describe a challenging technical problem you've solved recently? What was your approach?",
    "How do you ensure your code is maintainable and scalable?",
    "Explain how you would design a distributed system for high availability.",
    "What's your experience with CI/CD pipelines?",
    "How do you approach debugging a complex issue in production?",
  ]

  const productManagerQuestions = [
    "How do you gather and incorporate user feedback into your product decisions?",
    "Describe a situation where you had to make a difficult trade-off between features and timeline.",
    "How do you measure the success of a product feature after launch?",
    "Walk me through how you would create a product roadmap.",
    "How do you collaborate with engineering and design teams?",
  ]

  const generalQuestions = [
    "Tell me about a time when you faced a significant challenge in your work. How did you overcome it?",
    "How do you handle disagreements with team members?",
    "What's your approach to learning new skills or technologies?",
    "Describe your ideal work environment.",
    "Where do you see yourself professionally in 5 years?",
  ]

  let questions
  if (jobRole === "software-engineer") {
    questions = softwareEngineerQuestions
  } else if (jobRole === "product-manager") {
    questions = productManagerQuestions
  } else {
    questions = generalQuestions
  }

  return questions[Math.floor(Math.random() * questions.length)]
}

function getSuggestions(jobRole: string): string[] {
  const softwareEngineerSuggestions = [
    "Try to include more specific technical details in your response.",
    "Consider discussing the trade-offs of different approaches.",
    "Mention specific tools or technologies you've used to solve similar problems.",
    "Structure your answer with a clear problem statement, approach, and outcome.",
    "Include metrics or performance improvements when discussing technical solutions.",
  ]

  const productManagerSuggestions = [
    "Include more data-driven decision making in your response.",
    "Consider addressing how you would handle stakeholder management.",
    "Mention specific methodologies you've used (e.g., Agile, Scrum).",
    "Discuss how you balance user needs with business objectives.",
    "Include examples of how you've prioritized competing features.",
  ]

  const generalSuggestions = [
    "Try to be more concise while still providing complete information.",
    "Use the STAR method (Situation, Task, Action, Result) to structure your response.",
    "Include a specific example to illustrate your point.",
    "Consider addressing potential follow-up questions in your initial response.",
    "Highlight your unique perspective or approach to the situation.",
  ]

  let suggestions
  if (jobRole === "software-engineer") {
    suggestions = softwareEngineerSuggestions
  } else if (jobRole === "product-manager") {
    suggestions = productManagerSuggestions
  } else {
    suggestions = generalSuggestions
  }

  // Randomly select 2-3 suggestions
  const shuffled = [...suggestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 2) // 2-3 suggestions
}

