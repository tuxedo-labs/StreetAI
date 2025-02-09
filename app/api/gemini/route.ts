import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

async function getLocationDetails(lat: number, lng: number) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: You must be logged in to access this resource." },
      { status: 401 },
    );
  }
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
  );
  const data = await response.json();

  if (!data || !data.address)
    return {
      locationName: "Unknown Location",
      country: "Unknown",
      city: "Unknown",
    };

  return {
    locationName: data.display_name || "Unknown Location",
    country: data.address.country || "Unknown",
    city:
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Unknown",
  };
}

async function getWikipediaSummary(place: string) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place)}`,
    );
    const data = await response.json();
    return data.extract || "No Wikipedia summary available.";
  } catch {
    return "No Wikipedia summary available.";
  }
}

export async function POST(request: Request) {
  try {
    const { location, question } = await request.json();

    const { locationName, country, city }: any = await getLocationDetails(
      location.lat,
      location.lng,
    );

    const wikipediaInfo = await getWikipediaSummary(locationName);

    const prompt = `
      The location detected is **${locationName}**, situated in **${city}, ${country}**.  
      Provide key insights about this place, including:
      - Its historical significance
      - Cultural aspects
      - Notable landmarks
      - Unique facts or interesting details  

      Additional Wikipedia information:  
      ${wikipediaInfo}  

      **User's question:** "${question}"  
      - Answer in the same language as the question.
      - Do **NOT** mention coordinates.
      - Keep the response concise yet informative (around 3-5 sentences).
    `;

    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Gagal mendapatkan respons dari AI", details: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      locationName,
      country,
      city,
      wikipediaInfo,
      answer: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mendapatkan respons dari AI" },
      { status: 500 },
    );
  }
}
