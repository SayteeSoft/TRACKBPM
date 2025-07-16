'use server';

import { detectBpmAndKey, DetectBpmAndKeyInput } from '@/ai/flows/detect-bpm-and-key';
import { z } from 'zod';

const ActionInputSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  artist: z.string().min(1, { message: 'Artist is required.' }),
});

export async function analyzeSongAction(input: DetectBpmAndKeyInput) {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input: Title and artist are required.');
  }

  try {
    const result = await detectBpmAndKey(parsedInput.data);
    return result;
  } catch (error) {
    console.error('AI action failed:', error);
    throw new Error('Could not analyze the song. The model may not have information on it or it might be a temporary issue. Please try another song.');
  }
}
