import OpenAI from "openai"

// OpenAI client को initialize करेंगे
// API key .env से लेंगे
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Resume को analyze करने का function
export const analyzeResumeWithAI = async (resumeData) => {
    try {
        // Prompt बनाएंगे जो OpenAI को भेजेंगे
        const prompt = createAnalysisPrompt(resumeData)

        // OpenAI API को call करेंगे
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "आप एक expert career coach हो। Resume को analyze करके JSON format में feedback दो।",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        })

        // OpenAI से response लेंगे
        const analysisText = response.choices[0].message.content

        // Response को parse करके JSON बनाएंगे
        const analysis = parseAnalysisResponse(analysisText)

        return analysis
    } catch (error) {
        console.error("OpenAI API Error:", error.message)
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
  "analysisScore": 75
}

Rules:
1. Fill all fields completely
2. Be specific and actionable with suggestions
3. Focus on IT/Tech job market
4. Provide constructive feedback
5. Return ONLY valid JSON, no extra text
`
}


// OpenAI के response को parse करने का function
// Response को JSON में convert करेंगे
const parseAnalysisResponse = (responseText) => {
    try {
        // JSON को extract करेंगे response से
        // क्योंकि OpenAI extra text भी दे सकता है
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)

        if (!jsonMatch) {
            throw new Error("No JSON found in response")
        }

        const analysis = JSON.parse(jsonMatch[0])

        // Default values दे सकते हैं अगर कुछ field missing हो
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
            analysisScore: analysis.analysisScore || 0,
        }
    } catch (error) {
        console.error("Parse Error:", error.message)

        // अगर parse fail हो तो empty analysis return करेंगे
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