const chatWithCoach = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages) {
            return res.status(400).json({
                message: "Messages are requird"
            });
        }

        if (!Array.isArray(messages)) {
            return res.status(400).json({
                message: "Messages must be an array"
            });
        }

        if (messages.length === 0) {
            return res.status(400).json({
                message: "At least one message is required"
            });
        }

        const systemPrompt = {
            role: "system",
            content: "You are a proffesional carrer coach. Help users with carrers, skills, interviews, resumes and job searching"
        };

        const finalMessages = [
            systemPrompt,
            ...messages
        ];

        return res.status(200).json({
            finalMessages
        });

    } catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export { chatWithCoach };