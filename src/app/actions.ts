'use server';

import { detectBpmAndKey, DetectBpmAndKeyInput, DetectBpmAndKeyOutput } from '@/ai/flows/detect-bpm-and-key';
import { generateAlbumArt, GenerateAlbumArtInput } from '@/ai/flows/generate-album-art';
import { getTrendingSongs } from '@/ai/flows/get-trending-songs';
import { z } from 'zod';

const ActionInputSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  artist: z.string().min(1, { message: 'Artist is required.' }),
});

export type SongAnalysisResult = DetectBpmAndKeyOutput & {
  title: string;
  artist: string;
  albumArt: string;
};

export async function analyzeSongAction(input: DetectBpmAndKeyInput): Promise<SongAnalysisResult> {
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
      artist: parsedInput.data.artist,
      title: parsedInput.data.title,
      albumArt: albumArt.albumArt
    };
  } catch (error) {
    console.error('AI action failed:', error);
    throw new Error('Could not analyze the song. The model may not have information on it or it might be a temporary issue. Please try another song.');
  }
}

export async function getTrendingSongsAction(): Promise<SongAnalysisResult[]> {
  try {
    const trendingSongsList = await getTrendingSongs();
    
    const songAnalysisPromises = trendingSongsList.map(song => analyzeSongAction(song));
    
    const results = await Promise.allSettled(songAnalysisPromises);

    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<SongAnalysisResult>).value);

  } catch (error) {
    console.error('Failed to get daily songs:', error);
    return [];
  }
}
