
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTaskBreakdown = async (taskTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Break down this task into 3-5 small, actionable subtasks: "${taskTitle}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["subtasks"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data.subtasks as string[];
  } catch (error) {
    console.error("Gemini breakdown error:", error);
    return [];
  }
};

export const chatWithAssistant = async (message: string, currentTasks: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `You are TaskFlow AI, a helpful productivity assistant. 
        The user has the following tasks: ${JSON.stringify(currentTasks)}.
        Help them manage their time, prioritize, or create new tasks. 
        Keep your responses concise and mobile-friendly.`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini assistant error:", error);
    return "Sorry, I'm having trouble connecting to my brain right now.";
  }
};
