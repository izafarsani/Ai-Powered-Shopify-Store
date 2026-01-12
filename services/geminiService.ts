
import { GoogleGenAI, Type } from "@google/genai";

// Use direct process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAIEmail(context: string, customerName: string, productDetails?: string) {
  const prompt = `
    Generate a professional and engaging marketing email for an e-commerce store.
    Customer Name: ${customerName}
    Context: ${context}
    ${productDetails ? `Product involved: ${productDetails}` : ''}
    
    The output should be a JSON object with 'subject' and 'body' fields.
    Make the tone friendly, modern, and high-conversion.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ['subject', 'body']
        }
      }
    });

    // Directly access the text property as per guidelines
    const data = JSON.parse(response.text || '{}');
    return data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      subject: "Special Offer Just For You!",
      body: "We noticed you looking at our products. Here's a special discount code just for you: GEMINI10."
    };
  }
}

export async function getInventoryInsights(products: any[]) {
  const prompt = `
    Analyze the following inventory data and provide 3 actionable business insights or alerts (e.g., items to restock, top-performing categories).
    Data: ${JSON.stringify(products)}
    
    Format as a JSON array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    // Directly access the text property as per guidelines
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return ["Monitor low stock items", "Analyze category performance"];
  }
}
