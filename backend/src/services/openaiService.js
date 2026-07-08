import Groq from "groq-sdk"

// Initialize Groq client
let groq = null

const getGroqClient = () => {
    if (!groq) {
        groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        })
    }
    return groq
}

// Function to analyze resume using Groq
export const analyzeResumeWithAI = async (resumeData) => {
    try {
        const client = getGroqClient()

        const prompt = createAnalysisPrompt(resumeData)

        // Call Groq API (same format as OpenAI)
        const response = await client.chat.completions.create({
             model: "llama-3.1-8b-instant", 
            // Groq's fast model
            messages: [
                {
                    role: "system",
                    content: "You are an expert career coach and resume analyst. Analyze the resume and provide comprehensive feedback in JSON format only.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        })

        const analysisText = response.choices[0].message.content

        const analysis = parseAnalysisResponse(analysisText)

        return analysis
    } catch (error) {
        console.error("Groq API Error:", error.message)
        throw new Error(`Resume analysis failed: ${error.message}`)
    }
}

const createAnalysisPrompt = (resumeData) => {
    return `
Analyze the following resume and provide detailed feedback in JSON format:

Name: ${resumeData.name || "N/A"}
Email: ${resumeData.email || "N/A"}
Phone: ${resumeData.phone || "N/A"}

Skills: ${Array.isArray(resumeData.skills) ? resumeData.skills.join(", ") : resumeData.skills || "N/A"}

Experience: ${resumeData.experience || "N/A"}

Education: ${resumeData.education || "N/A"}

Projects: ${Array.isArray(resumeData.projects) ? resumeData.projects.join(", ") : resumeData.projects || "N/A"}

Certifications: ${Array.isArray(resumeData.certifications) ? resumeData.certifications.join(", ") : resumeData.certifications || "N/A"}

Please provide detailed feedback in the following JSON format:
{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "missingSkills": ["skill 1", "skill 2", "skill 3"],
  "improvements": ["improvement suggestion 1", "improvement suggestion 2"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "projectSuggestions": ["project 1 to build", "project 2 to build"],
  "professionalSummary": "One or two sentence professional summary based on resume",
  "certificationsToConsider": ["certification 1", "certification 2"],
  "technicalSkillsToLearn": ["skill 1", "skill 2", "skill 3"],
}

Rules:
1. Fill all fields completely
2. Be specific and actionable with suggestions
3. Focus on IT/Tech job market
4. Provide constructive feedback
5. Return ONLY valid JSON, no extra text
`
}

const parseAnalysisResponse = (responseText) => {
    try {
        // Remove markdown code fences if the AI returns ```json ... ```
        const cleanedResponse = responseText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim()

        const analysis = JSON.parse(cleanedResponse)

        return {
            strengths: analysis.strengths || [],
            weaknesses: analysis.weaknesses || [],
            missingSkills: analysis.missingSkills || [],
            improvements: analysis.improvements || [],
            recommendations: analysis.recommendations || [],
            projectSuggestions: analysis.projectSuggestions || [],
            professionalSummary: analysis.professionalSummary || "",
            certificationsToConsider: analysis.certificationsToConsider || [],
            technicalSkillsToLearn: analysis.technicalSkillsToLearn || [],
        }
    } catch (error) {
        console.error("Parse Error:", error.message)

        return {
            strengths: [],
            weaknesses: [],
            missingSkills: [],
            improvements: [],
            recommendations: [],
            projectSuggestions: [],
            professionalSummary: "Unable to parse response",
            certificationsToConsider: [],
            technicalSkillsToLearn: [],
            analysisScore: 0,
        }
    }
}

export default { analyzeResumeWithAI }