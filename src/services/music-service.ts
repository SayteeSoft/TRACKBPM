import { z } from 'zod';
import SpotifyWebApi from 'spotify-web-api-node';

/**
 * This service interacts with the Spotify API to get song details.
 */

export const SongDetailsSchema = z.object({
  bpm: z.number().describe('The BPM (beats per minute) of the song.'),
  key: z.string().describe('The musical key of the song (e.g., C major, A minor).'),
  duration: z.string().describe('The duration of the song in MM:SS format.'),
});

export type SongDetails = z.infer<typeof SongDetailsSchema>;

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Cache for the access token
let tokenCache = {
  accessToken: '',
  expiresAt: 0,
};

// Function to get a valid access token
async function getAccessToken() {
  if (tokenCache.accessToken && Date.now() < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  try {
    const data = await spotifyApi.clientCredentialsGrant();
    const accessToken = data.body['access_token'];
    const expiresIn = data.body['expires_in'];

    spotifyApi.setAccessToken(accessToken);

    tokenCache = {
      accessToken,
      expiresAt: Date.now() + (expiresIn * 1000 - 60000), // Refresh 1 minute before expiry
    };
    
    return accessToken;
  } catch (err) {
    console.error('Something went wrong when retrieving an access token', err);
    throw new Error('Could not authenticate with Spotify.');
  }
}

// Helper to format duration from ms to MM:SS
const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Helper to convert Spotify key and mode to musical notation
const keyMap: { [key: number]: string } = {
  0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
  6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'
};

const formatKey = (key: number, mode: number) => {
    if (key === -1) return 'N/A';
    const keyName = keyMap[key];
    const modeName = mode === 1 ? 'major' : 'minor';
    return `${keyName} ${modeName}`;
}

export async function getSongDetails(input: { artist: string; title: string }): Promise<SongDetails> {
  await getAccessToken();

  try {
    // Search for the track
    const searchResult = await spotifyApi.searchTracks(`track:${input.title} artist:${input.artist}`, { limit: 1 });
    const track = searchResult.body.tracks?.items[0];

    if (!track) {
      throw new Error(`Song not found: ${input.title} by ${input.artist}`);
    }

    // Get audio features for the track
    const featuresResult = await spotifyApi.getAudioFeaturesForTrack(track.id);
    const features = featuresResult.body;

    if (!features) {
      throw new Error(`Audio features not found for ${input.title}`);
    }

    return {
      bpm: Math.round(features.tempo),
      key: formatKey(features.key, features.mode),
      duration: formatDuration(track.duration_ms),
    };
  } catch (error) {
    console.error(`Failed to get song details from Spotify for "${input.title}" by ${input.artist}`, error);
    // You might want to throw a more user-friendly error here
    throw new Error('Could not retrieve song details from Spotify.');
  }
}
