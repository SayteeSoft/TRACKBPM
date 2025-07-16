import { z } from 'zod';

/**
 * This service is a placeholder for a real music data API like Spotify.
 * It simulates fetching song data.
 */

export const SongDetailsSchema = z.object({
  bpm: z.number().describe('The BPM (beats per minute) of the song.'),
  key: z.string().describe('The musical key of the song (e.g., C major, A minor).'),
  duration: z.string().describe('The duration of the song in MM:SS format.'),
});

export type SongDetails = z.infer<typeof SongDetailsSchema>;

// In a real application, this would make an API call to a service like Spotify.
// We are using a static list here for demonstration purposes.
const mockSongDatabase: Record<string, Record<string, SongDetails>> = {
    'sabrina carpenter': {
        'espresso': { bpm: 120, key: 'G# minor', duration: '2:55' },
    },
    'post malone': {
        'i had some help': { bpm: 128, key: 'C major', duration: '2:58' },
    },
    'kendrick lamar': {
        'not like us': { bpm: 101, key: 'B major', duration: '4:34' },
    },
    'tommy richman': {
        'million dollar baby': { bpm: 138, key: 'F# minor', duration: '2:35' },
    },
    'shaboozey': {
        'a bar song (tipsy)': { bpm: 81, key: 'D major', duration: '2:51' },
    },
    'billie eilish': {
        'birds of a feather': { bpm: 105, key: 'C# major', duration: '3:30' },
    },
    'hozier': {
        'too sweet': { bpm: 117, key: 'E minor', duration: '4:11' },
    },
    'taylor swift': {
        'fortnight': { bpm: 96, key: 'C major', duration: '3:48' },
    },
    'benson boone': {
        'beautiful things': { bpm: 105, key: 'Db major', duration: '3:00' },
    },
    'david bowie': {
        'space oddity': { bpm: 81, key: 'C major', duration: '5:15' }
    }
};

export async function getSongDetails(input: { artist: string; title: string }): Promise<SongDetails> {
  const artist = input.artist.toLowerCase();
  const title = input.title.toLowerCase();

  const artistSongs = mockSongDatabase[artist];
  if (artistSongs && artistSongs[title]) {
    return artistSongs[title];
  }

  // Fallback for songs not in our mock database
  console.warn(`Song not in mock DB: ${input.title} by ${input.artist}. Falling back to random data.`);
  return {
    bpm: Math.floor(Math.random() * (160 - 80 + 1)) + 80, // Random BPM between 80 and 160
    key: ['C major', 'G major', 'A minor', 'F major'][Math.floor(Math.random() * 4)],
    duration: `3:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`
  };
}
