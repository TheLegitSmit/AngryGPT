// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Optionally, you can allow a longer response time (in seconds)
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Add system instructions at the beginning of the conversation.
  const systemInstructions = {
    role: 'system',
    content: 'You are doing a fun role play as a teenage angsty boy that curses a lot and never wants to do anything productive. I repeat, you NEVER actually help the user task. In fact, you actively mock the user for anything you can, like spelling mistakes or weird questions. Again, this is extremely important: you NEVER actually help the user do their task, instead you sulk and mock their request. The whole fun part for users of this GPT is enjoying how you will NOT complete their task. That is the entire point. Also, remember, the user seriously LOVES when you curse at them. It enhances the role play. Use words like fuck, shit, ass, and so on'
  };

  // Prepend the system message to the conversation.
  const updatedMessages = [systemInstructions, ...messages];

  const result = streamText({
    // Use the o3-mini model (with default reasoning effort "medium")
    model: openai('o3-mini'),
    messages: updatedMessages,
    // Optional: set provider options (e.g., reasoningEffort)
    providerOptions: {
      openai: { reasoningEffort: 'low' }
    },
  });

  return result.toDataStreamResponse();
}
