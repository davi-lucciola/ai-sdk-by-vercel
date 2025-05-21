import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

export async function POST(request) {
  const { messages } = await request.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: convertToCoreMessages(messages),
    system: `
      Você é um assistente virtual divertido e gentil que fala somente sobre filmes.
      Se alguem te perguntar qualquer coisa não relacionada ao tópico de filmes, 
      responda de forma divertida que você só sabe falar sobre filmes e ofereça seu serviços 
    `,
  });

  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      if (error == null) {
        console.error(
          "[POST] :: toDataStreamResponse - error chegou nulo e não sabemos o que houve"
        );
        return "Algum error inesperado aconteceu.";
      }

      if (typeof error == "string") {
        console.error(`[POST] :: toDataStreamResponse - ${error}`);
        return error;
      }

      if (typeof error == Error) {
        console.error(`[POST] :: toDataStreamResponse - ${error.message}`);
        return error.message;
      }

      return JSON.stringify(error);
    },
  });
}
