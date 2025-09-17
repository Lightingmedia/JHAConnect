'use server';

/**
 * @fileOverview AI flow to generate personalized birthday greetings for community members.
 *
 * - generateBirthdayGreeting - A function that generates a personalized birthday greeting.
 * - GenerateBirthdayGreetingInput - The input type for the generateBirthdayGreeting function.
 * - GenerateBirthdayGreetingOutput - The return type for the generateBirthdayGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBirthdayGreetingInputSchema = z.object({
  memberName: z.string().describe('The name of the community member.'),
  birthdayMonth: z.string().describe('The month of the member\'s birthday.'),
  birthdayDay: z.string().describe('The day of the member\'s birthday.'),
  profileDetails: z.string().describe('Additional profile details of the member.'),
});
export type GenerateBirthdayGreetingInput = z.infer<typeof GenerateBirthdayGreetingInputSchema>;

const GenerateBirthdayGreetingOutputSchema = z.object({
  greeting: z.string().describe('The personalized birthday greeting.'),
});
export type GenerateBirthdayGreetingOutput = z.infer<typeof GenerateBirthdayGreetingOutputSchema>;

export async function generateBirthdayGreeting(input: GenerateBirthdayGreetingInput): Promise<GenerateBirthdayGreetingOutput> {
  return generateBirthdayGreetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBirthdayGreetingPrompt',
  input: {schema: GenerateBirthdayGreetingInputSchema},
  output: {schema: GenerateBirthdayGreetingOutputSchema},
  prompt: `You are a community manager for JHA Community, and need to generate personalized birthday greetings for members.

  Today is {{birthdayMonth}} {{birthdayDay}}.

  Generate a warm, friendly, and personalized birthday greeting for {{memberName}} based on the following information: {{profileDetails}}.
  The greeting should be no more than two sentences.`,
});

const generateBirthdayGreetingFlow = ai.defineFlow(
  {
    name: 'generateBirthdayGreetingFlow',
    inputSchema: GenerateBirthdayGreetingInputSchema,
    outputSchema: GenerateBirthdayGreetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
