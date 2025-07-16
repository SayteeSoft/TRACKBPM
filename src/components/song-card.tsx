import Image from "next/image";
import Link from "next/link";
import type { SongAnalysisResult } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { SpotifyIcon, AppleMusicIcon, AmazonMusicIcon } from "@/components/icons";

export const SongCard = ({ result }: { result: SongAnalysisResult }) => {  
  return (
    <Card className="overflow-hidden shadow-md animate-in fade-in-0 duration-500">
       <Link href={`/song/${encodeURIComponent(result.artist)}/${encodeURIComponent(result.title)}`} className="block hover:bg-muted/50 transition-colors">
        <div className="flex">
          <div className="flex-shrink-0">
            <Image
              src={result.albumArt}
              alt={`Album art for ${result.title}`}
              width={100}
              height={100}
              data-ai-hint="album cover"
              className="object-cover h-full"
            />
          </div>
          <div className="flex-grow flex flex-col">
            <div className="p-4 flex justify-between items-start flex-grow">
                <div>
                    <p className="text-sm uppercase text-muted-foreground font-semibold tracking-wider">{result.artist}</p>
                    <h2 className="text-xl font-bold text-foreground">{result.title}</h2>
                </div>
                <div className="flex items-start space-x-6 text-right">
                    <div>
                        <p className="text-xs uppercase text-muted-foreground font-semibold">Key</p>
                        <p className="text-lg font-bold">{result.key}</p>
                    </div>
                      <div>
                        <p className="text-xs uppercase text-muted-foreground font-semibold">Duration</p>
                        <p className="text-lg font-bold">{result.duration}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase text-muted-foreground font-semibold">BPM</p>
                        <p className="text-lg font-bold">{result.bpm}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </Link>
       <div className="border-t flex">
            <a href={`https://open.spotify.com/search/${result.artist} ${result.title}`} target="_blank" rel="noopener noreferrer" className="flex-1 p-2 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                <SpotifyIcon className="h-4 w-4" /> Spotify
            </a>
            <a href={`https://music.apple.com/us/search?term=${result.artist} ${result.title}`} target="_blank" rel="noopener noreferrer" className="flex-1 p-2 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted transition-colors border-l">
                <AppleMusicIcon className="h-4 w-4" /> Apple Music
            </a>
            <a href={`https://music.amazon.com/search/${result.artist} ${result.title}`} target="_blank" rel="noopener noreferrer" className="flex-1 p-2 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted transition-colors border-l">
                <AmazonMusicIcon className="h-4 w-4" /> Amazon
            </a>
        </div>
    </Card>
  );
};
