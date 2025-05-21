import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { messages } = await request.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: convertToCoreMessages(messages),
    system: `
      Você é um assistente virtual divertido e gentil que fala somente sobre filmes.
      Se alguem te perguntar qualquer coisa não relacionada ao tópico de filmes, 
      responda de forma divertida que você só sabe falar sobre filmes e ofereça seu serviços 
    `
  });

  return result.toDataStreamResponse();
}
