import { Mistral } from "@mistralai/mistralai";
import { NextResponse } from "next/server";

const apiKey = process.env["MISTRAL_API_KEY"];
const client = new Mistral({ apiKey: apiKey });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing server API key" },
        { status: 500 },
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const result = await client.chat.stream({
      model: "mistral-tiny",
      messages: [
        { role: "user", content: message || "What is the best French cheese?" },
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result) {
            const streamText = chunk.data.choices[0].delta.content;
            if (typeof streamText === "string") {
              controller.enqueue(encoder.encode(streamText));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
