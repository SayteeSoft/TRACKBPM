'use server';

import { detectBpmAndKey, DetectBpmAndKeyInput, DetectBpmAndKeyOutput } from '@/ai/flows/detect-bpm-and-key';
import { generateAlbumArt, GenerateAlbumArtInput } from '@/ai/flows/generate-album-art';
import { generateSongDescription, GenerateSongDescriptionInput } from '@/ai/flows/generate-song-description';
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
  description?: string;
};

export async function analyzeSongAction(input: DetectBpmAndKeyInput, includeDescription = false): Promise<SongAnalysisResult> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input: Title and artist are required.');
  }

  try {
    // Check for environment variables
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      console.error('Spotify API credentials are not set in the environment.');
      throw new Error('The Spotify API is not configured. Please add credentials to the environment variables.');
    }

    const songInfo = await detectBpmAndKey(parsedInput.data);
    const albumArt = await generateAlbumArt({ artist: parsedInput.data.artist, title: parsedInput.data.title });
    
    let description: string | undefined;
    if (includeDescription) {
        const descriptionData = await generateSongDescription({
            ...parsedInput.data,
            ...songInfo,
        });
        description = descriptionData.description;
    }

    return {
      ...songInfo,
      artist: parsedInput.data.artist,
      title: parsedInput.data.title,
      albumArt: albumArt.albumArt,
      description: description,
    };
  } catch (error) {
    console.error('AI action failed:', error);
    if (error instanceof Error && error.message.includes('Spotify')) {
        throw error;
    }
    throw new Error('Could not analyze the song. The model may not have information on it or it might be a temporary issue. Please try another song.');
  }
}

export async function getTrendingSongsAction(): Promise<SongAnalysisResult[]> {
  try {
    // Check for environment variables before fetching
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
        console.warn('Spotify API credentials not set. Returning empty trending list.');
        return [];
    }
      
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
