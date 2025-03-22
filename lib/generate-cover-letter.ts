import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface CoverLetterParams {
  jobDescription: string
  name: string
  email: string
  phone: string
  company: string
  position: string
}

export async function generateCoverLetter(params: CoverLetterParams): Promise<string> {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OpenAI API key is missing. Using mock data instead.")
      return getMockCoverLetter(params)
    }

    // Use the AI SDK to generate the cover letter
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Generate a professional cover letter for the following job:
        
        Position: ${params.position}
        Company: ${params.company}
        
        Job Description:
        ${params.jobDescription}
        
        Applicant Information:
        Name: ${params.name}
        Email: ${params.email}
        Phone: ${params.phone}
        
        The cover letter should be professional, concise, and tailored to the specific job description.
        Include a proper header with the applicant's contact information and date.
        Format the letter with appropriate spacing and paragraphs.
      `,
      system: `
        You are an expert cover letter writer with years of experience in HR and recruiting.
        Create a compelling, professional cover letter that highlights the applicant's qualifications for the specific job.
        The cover letter should be well-structured with a header, greeting, introduction, body paragraphs, conclusion, and signature.
        Keep the tone professional but conversational, and make sure to tailor the content to the specific job description.
        The cover letter should be approximately 300-400 words.
      `,
    })

    return text
  } catch (error) {
    console.error("Error generating cover letter:", error)
    // Fall back to mock data if AI generation fails
    return getMockCoverLetter(params)
  }
}

function getMockCoverLetter(params: CoverLetterParams): string {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `${params.name}
${params.email}
${params.phone}
${currentDate}

Hiring Manager
${params.company}

Dear Hiring Manager,

I am writing to express my interest in the ${params.position} position at ${params.company}. With my background in [relevant field] and passion for [relevant industry/skill], I believe I would be a valuable addition to your team.

Throughout my career, I have developed strong skills in [relevant skill 1], [relevant skill 2], and [relevant skill 3]. My experience has taught me how to [relevant accomplishment or responsibility], resulting in [positive outcome]. I am particularly drawn to ${params.company}'s commitment to [company value or achievement mentioned in job description], which aligns perfectly with my professional values.

In my previous role at [Previous Company], I successfully [specific achievement relevant to the job description]. This experience has prepared me well for the challenges of the ${params.position} role, where I can contribute to [specific project or goal mentioned in job description].

I am excited about the opportunity to bring my unique perspective and skills to ${params.company}. I am particularly interested in [specific aspect of the job or company], and I am confident that my background in [relevant experience] makes me well-suited for this position.

Thank you for considering my application. I look forward to the opportunity to discuss how my experience and skills would benefit ${params.company} as your next ${params.position}.

Sincerely,

${params.name}`
}

