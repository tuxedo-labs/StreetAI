import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse request body
    const { location, question } = await request.json();

    // Construct the prompt
    const prompt = `Lokasi koordinat: ${location.lat}, ${location.lng}. ${question ? `Pertanyaan: ${question}` : "Beri informasi umum tentang lokasi ini."
      }`;

    // API endpoint and API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Make the POST request using fetch
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    // Handle errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching AI response:', errorData);
      return NextResponse.json(
        { error: 'Gagal mendapatkan respons dari AI', details: errorData },
        { status: response.status }
      );
    }

    // Parse the response
    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Return the result
    return NextResponse.json({ answer: result });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return NextResponse.json({ error: 'Gagal mendapatkan respons dari AI' }, { status: 500 });
  }
}

// Handler untuk GET
export async function GET(request: Request) {
  try {
    // Contoh respons sederhana untuk GET request
    const exampleResponse = {
      message: "Ini adalah contoh respons GET.",
      usage: "Gunakan POST untuk mengirim pertanyaan ke AI.",
    };

    return NextResponse.json(exampleResponse);
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses permintaan GET' }, { status: 500 });
  }
}