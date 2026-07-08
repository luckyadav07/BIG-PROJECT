import mongoose, { Schema } from "mongoose"

const resumeAnalysisSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // 原始 resume 数据 (parsed JSON)
        resumeData: {
            name: String,
            email: String,
            phone: String,
            skills: [String],
            experience: String,
            education: String,
            projects: [String],
            certifications: [String],
        },

        // AI Analysis Results
        analysis: {
            strengths: [String],           // क्या अच्छा है
            weaknesses: [String],          // क्या ख़राब है
            missingSkills: [String],       // कौन सी skills नहीं हैं
            improvements: [String],        // कैसे बेहतर बनाएं
            recommendations: [String],     // क्या करना चाहिए
            projectSuggestions: [String],  // कौन से projects बनाएं
            professionalSummary: String,   // एक लाइन में summary
            certificationsToConsider: [String], // कौन से सर्टिफिकेशन लें
            technicalSkillsToLearn: [String],   // कौन से technical skills सीखें
        },

        // Metadata
        aiModel: {
            type: String,
            default: "gpt-3.5-turbo",     // OpenAI model used
        },
    },
    {
        timestamps: true,  // createdAt, updatedAt automatically
    }
)

export default mongoose.model("ResumeAnalysis", resumeAnalysisSchema)