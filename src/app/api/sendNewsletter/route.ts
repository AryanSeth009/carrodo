import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [3], // Replace with your actual Brevo list ID
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: "Failed to add subscriber", error: errorData }, { status: response.status });
    }

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error subscribing", error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}
