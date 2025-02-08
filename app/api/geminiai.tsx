import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { location, question } = await req.json();

    // Format prompt AI
    const prompt = `Lokasi koordinat: ${location.lat}, ${location.lng}. ${question ? `Pertanyaan: ${question}` : "Beri informasi umum tentang lokasi ini."}`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(prompt);
    const result = await response.response.text();

    return NextResponse.json({ answer: result });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return NextResponse.json({ error: 'Gagal mendapatkan respons dari AI' }, { status: 500 });
  }
}
