import { GoogleGenAI } from "@google/genai";
import { VexGenerationRequest, VexResult } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateVexStatement = async (request: VexGenerationRequest): Promise<VexResult> => {
  const ai = getAiClient();
  const model = "gemini-2.5-flash";

  const prompt = `
    You are a DevSecOps expert specializing in Vulnerability Exploitability eXchange (VEX).
    
    Task: Generate a valid VEX JSON snippet and a human-readable analysis for the following scenario in THAI language.
    
    Vulnerability: ${request.cveId}
    Product/Container: ${request.product}
    Status: ${request.status}
    User Justification Context: ${request.justification}

    Please provide the response in the following JSON format ONLY:
    {
      "analysis": "A clear, professional explanation in Thai language of why this CVE is considered ${request.status} for this product, suitable for a security auditor.",
      "json": "The VEX JSON object (CSAF or CycloneDX format) representing this suppression."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as VexResult;
  } catch (error) {
    console.error("Gemini VEX Generation Error:", error);
    throw error;
  }
};

export const askSecurityQuestion = async (question: string): Promise<string> => {
  const ai = getAiClient();
  const model = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are a helpful container security assistant. Answer the following question concisely and accurately in Thai regarding container security, Kubernetes, or CVE management: ${question}`,
    });
    return response.text || "ขออภัย ไม่สามารถสร้างคำตอบได้ในขณะนี้";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "ขออภัย เกิดข้อผิดพลาดขณะประมวลผลคำขอของคุณ";
  }
};