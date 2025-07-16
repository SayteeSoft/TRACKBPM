import { config } from 'dotenv';
config();

import '@/ai/flows/detect-bpm-and-key.ts';
import '@/ai/flows/generate-album-art.ts';
import '@/ai/flows/get-trending-songs.ts';
