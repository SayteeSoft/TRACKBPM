
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

function spotifyNotConfigured() {
    // This check is now the single source of truth for configuration.
    return !process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
}

export async function analyzeSongAction(input: DetectBpmAndKeyInput, includeDescription = false): Promise<SongAnalysisResult> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input: Title and artist are required.');
  }

  // Centralized check for environment variables
  if (spotifyNotConfigured()) {
    console.error('Spotify API credentials are not set in the environment.');
    throw new Error('The Spotify integration is not configured. Please add your NEXT_PUBLIC_SPOTIFY_CLIENT_ID as an environment variable in your hosting provider settings.');
  }

  try {
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
  // The initial check is now removed from here and handled by the page's try/catch block.
  // The underlying service call will throw an error if not configured, which is what we want.
  try {
    const trendingSongsList = await getTrendingSongs();
    
    // Using Promise.allSettled to ensure that even if one song fails, the others are still processed.
    const songAnalysisPromises = trendingSongsList.map(song => analyzeSongAction(song));
    
    const results = await Promise.allSettled(songAnalysisPromises);

    // Filter for only fulfilled promises and return their values.
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<SongAnalysisResult>).value);

  } catch (error) {
    console.error('Failed to get daily songs:', error);
    // Re-throw the error so the calling component (the page) can catch it and display the message.
    throw error;
  }
}
