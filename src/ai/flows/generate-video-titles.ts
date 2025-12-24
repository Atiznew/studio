'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating video titles based on a video description.
 *
 * It exports:
 * - `generateVideoTitles`: An async function that takes a video description as input and returns suggested video titles.
 * - `GenerateVideoTitlesInput`: The input type for the `generateVideoTitles` function.
 * - `GenerateVideoTitlesOutput`: The output type for the `generateVideoTitles` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoTitlesInputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the video content.'),
});
export type GenerateVideoTitlesInput = z.infer<typeof GenerateVideoTitlesInputSchema>;

const GenerateVideoTitlesOutputSchema = z.object({
  suggestedTitles: z
    .array(z.string())
    .describe('An array of suggested video titles based on the description.'),
});
export type GenerateVideoTitlesOutput = z.infer<typeof GenerateVideoTitlesOutputSchema>;

export async function generateVideoTitles(input: GenerateVideoTitlesInput): Promise<GenerateVideoTitlesOutput> {
  return generateVideoTitlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoTitlesPrompt',
  input: {schema: GenerateVideoTitlesInputSchema},
  output: {schema: GenerateVideoTitlesOutputSchema},
  prompt: `You are an expert in creating catchy and engaging video titles.
  Based on the video description provided, generate five alternative titles that would attract viewers and increase discoverability.
  The titles should be concise, relevant to the content, and appealing to a wide audience.

  Video Description: {{{description}}}

  Here are five suggested titles:
  1.`, // The LLM will complete the numbered list.
});

const generateVideoTitlesFlow = ai.defineFlow(
  {
    name: 'generateVideoTitlesFlow',
    inputSchema: GenerateVideoTitlesInputSchema,
    outputSchema: GenerateVideoTitlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
