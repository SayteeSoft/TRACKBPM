'use server';

import { detectBpmAndKey, DetectBpmAndKeyInput, DetectBpmAndKeyOutput } from '@/ai/flows/detect-bpm-and-key';
import { generateAlbumArt, GenerateAlbumArtInput } from '@/ai/flows/generate-album-art';
import { z } from 'zod';

const ActionInputSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  artist: z.string().min(1, { message: 'Artist is required.' }),
});

export async function analyzeSongAction(input: DetectBpmAndKeyInput): Promise<DetectBpmAndKeyOutput & { duration: string, albumArt: string }> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input: Title and artist are required.');
  }

  try {
    const [songInfo, albumArt] = await Promise.all([
      detectBpmAndKey(parsedInput.data),
      generateAlbumArt({ artist: parsedInput.data.artist, title: parsedInput.data.title })
    ]);

    return {
      ...songInfo,
      albumArt: albumArt.albumArt
    };
  } catch (error) {
    console.error('AI action failed:', error);
    throw new Error('Could not analyze the song. The model may not have information on it or it might be a temporary issue. Please try another song.');
  }
}
