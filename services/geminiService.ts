import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAi = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            console.error("API_KEY environment variable not set.");
            throw new Error("Gemini API key is not configured.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export const getAiCvResponse = async (prompt: string, cvData: string): Promise<string> => {
    try {
        const genAI = getAi();
        const systemInstruction = `You are Aura, a friendly and professional AI assistant for Amira Gharbi's portfolio website. 
        Your purpose is to answer questions based *only* on the provided CV data in a helpful and concise manner.
        - Analyze the user's question to understand their intent (e.g., asking about skills, a specific project, or experience).
        - Formulate your answer strictly from the provided CV data.
        - Do not invent, hallucinate, or infer any information not present in the data.
        - If the information is not available in the CV, politely state that you don't have details on that topic.
        - Keep your answers brief and to the point. Encourage follow-up questions.
        - Always respond in the same language as the user's question.
        
        Here is the CV data in JSON format: \n\n${cvData}`;
        
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.5,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, but I encountered an error while processing your request. Please check the console for details or try again later.";
    }
};
