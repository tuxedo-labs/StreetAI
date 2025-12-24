import { type ActionFunctionArgs } from "react-router";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const data = await request.json();
    const { message, context } = data;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing in environment variables.");
      return Response.json(
        {
          reply:
            "I'm sorry, my AI brain seems to be disconnected (API Key missing). Please contact the admin.",
        },
        { status: 200 }
      ); // Return 200 to display message in UI gracefully
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Construct a context-aware prompt
    const chatPrompt = `
      You are an expert local travel guide on the StreetAI platform. 
      Context: The user is exploring ${context?.name || "a location"} (${context?.description || "no details"}).
      
      User asks: "${message}"
      
      Provide a helpful, friendly, and enthusiastic answer. Focus on tourism, hidden gems, practical tips, and cultural insights relative to the location. Keep it concise.
    `;

    const result = await model.generateContent(chatPrompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ reply: text });
  } catch (error) {
    console.error("AI Service Error:", error);
    return Response.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
