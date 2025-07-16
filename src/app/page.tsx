"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeSongAction, getTrendingSongsAction, SongAnalysisResult } from "./actions";
import { SpotifyIcon, AppleMusicIcon, AmazonMusicIcon } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

const AdBanner = () => (
    <Card className="overflow-hidden shadow-md animate-in fade-in-0 duration-500 bg-muted/50">
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 h-full">
            <div className="text-center">
                <p className="text-sm font-semibold text-muted-foreground">Advertisement</p>
                <Image src="https://placehold.co/728x90.png" alt="Advertisement" width={728} height={90} data-ai-hint="advertisement banner" />
            </div>
        </a>
    </Card>
);

const SongCard = ({ result }: { result: SongAnalysisResult }) => {  
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

const SongCardSkeleton = () => (
  <Card className="overflow-hidden shadow-md">
    <div className="flex">
      <Skeleton className="h-[100px] w-[100px]" />
      <div className="flex-grow flex flex-col">
        <div className="p-4 flex justify-between items-start flex-grow">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex items-start space-x-6 text-right">
            <div className="flex flex-col items-center">
              <Skeleton className="h-3 w-8 mb-1" />
              <Skeleton className="h-5 w-8" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-3 w-12 mb-1" />
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-3 w-8 mb-1" />
              <Skeleton className="h-5 w-8" />
            </div>
          </div>
        </div>
        <div className="border-t flex">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1 border-l" />
          <Skeleton className="h-10 flex-1 border-l" />
        </div>
      </div>
    </div>
  </Card>
);

export default function Home() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SongAnalysisResult[]>([]);
  const [trendingSongs, setTrendingSongs] = useState<SongAnalysisResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      const performSearch = async () => {
        setIsSearchLoading(true);
        try {
          const parts = query.split("-").map((p) => p.trim());
          const artist = parts[0];
          const title = parts.length > 1 ? parts.slice(1).join(' ') : '';
          const result = await analyzeSongAction({ artist, title });
          setSearchResults([result]);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: error instanceof Error ? error.message : "An unknown error occurred.",
          });
        } finally {
          setIsSearchLoading(false);
        }
      };
      performSearch();
    } else {
        setSearchResults([]);
    }
  }, [searchParams, toast]);

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      setIsTrendingLoading(true);
      try {
        const songs = await getTrendingSongsAction();
        setTrendingSongs(songs);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load trending songs",
          description: "Please try refreshing the page.",
        });
      } finally {
        setIsTrendingLoading(false);
      }
    };
    if (searchResults.length === 0 && !searchParams.get('q')) {
        fetchTrendingSongs();
    }
  }, [toast, searchResults, searchParams]);

  const showTrending = !isSearchLoading && searchResults.length === 0 && !searchParams.get('q');

  return (
    <main className="w-full font-body">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="space-y-4 max-w-3xl mx-auto">
          {isSearchLoading && <SongCardSkeleton />}
          {searchResults.map((result, index) => (
            <SongCard key={`search-${result.title}-${index}`} result={result} />
          ))}

          {isTrendingLoading && showTrending && (
            Array.from({ length: 9 }).map((_, index) => <SongCardSkeleton key={`skeleton-${index}`} />)
          )}
          
          {showTrending && (
            trendingSongs.map((result, index) => (
              <Fragment key={`trending-${result.title}-${index}`}>
                <SongCard result={result} />
                {(index + 1) % 3 === 0 && <AdBanner />}
              </Fragment>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
