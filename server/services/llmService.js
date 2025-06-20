import { GoogleGenerativeAI } from '@google/generative-ai';

export const summarizeWithLLM = async (content, provider) => {
  if (provider === 'gemini') {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const result = await model.generateContent(`Summarize this: ${content}`);
      return result.response.text();
      
    } catch (error) {
      // Specific rate-limit handling
      if (error.message.includes("429")) {
        return "Rate limit exceeded. Please try again after a while.";
      }

      // Log and propagate other errors
      console.error("Gemini summarization error:", error);
      throw new Error("Failed to summarize content with Gemini.");
    }
  }

  // If invalid provider
  throw new Error("Invalid LLM Provider");
};
