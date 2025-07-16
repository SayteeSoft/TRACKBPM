"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Music, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeSongAction, getDailySongsAction, SongAnalysisResult } from "./actions";
import { SpotifyIcon, AppleMusicIcon, AmazonMusicIcon } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  query: z.string().min(3, {
    message: "Please enter at least 3 characters.",
  }),
});

const LightningIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );

const SongCard = ({ result }: { result: SongAnalysisResult }) => (
  <Card className="overflow-hidden shadow-md animate-in fade-in-0 duration-500">
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
      </div>
    </div>
  </Card>
);

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
  const [searchResults, setSearchResults] = useState<SongAnalysisResult[]>([]);
  const [dailySongs, setDailySongs] = useState<SongAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDailyLoading, setIsDailyLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  useEffect(() => {
    const fetchDailySongs = async () => {
      setIsDailyLoading(true);
      try {
        const songs = await getDailySongsAction();
        setDailySongs(songs);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load daily songs",
          description: "Please try refreshing the page.",
        });
      } finally {
        setIsDailyLoading(false);
      }
    };
    fetchDailySongs();
  }, [toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const parts = values.query.split("-").map((p) => p.trim());
      const artist = parts[0];
      const title = parts.length > 1 ? parts.slice(1).join(' ') : '';

      if (!artist || !title) {
        toast({
          variant: "destructive",
          title: "Invalid Format",
          description: "Please enter the song as 'Artist - Title'.",
        });
        setIsLoading(false);
        return;
      }

      const result = await analyzeSongAction({ artist, title });
      setSearchResults((prevResults) => [result, ...prevResults]);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 font-body">
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter flex items-center justify-center">
                <span>BPM</span>
                <LightningIcon className="w-12 h-12 md:w-16 md:h-16 mx-1 text-white fill-white" />
                <span>Detch</span>
            </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 -mt-16">
        <Card className="max-w-3xl mx-auto shadow-2xl rounded-lg">
          <CardContent className="p-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="type a song, get a bpm"
                            {...field}
                            className="text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 pl-4 pr-12"
                          />
                           <Button type="submit" disabled={isLoading} size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-transparent hover:bg-muted text-foreground">
                            {isLoading ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <Search className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                       <FormMessage className="text-center mt-2 max-w-3xl mx-auto px-4" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-2">
          For example: <span className="font-bold text-foreground">david bowie - space oddity</span> (which is 81 BPM, by the way)
        </p>

        <section className="mt-12 space-y-4 max-w-3xl mx-auto">
          {searchResults.map((result, index) => (
            <SongCard key={`search-${result.title}-${index}`} result={result} />
          ))}

          {isDailyLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SongCardSkeleton key={`skeleton-${index}`} />)
          ) : (
            dailySongs.map((result, index) => (
              <SongCard key={`daily-${result.title}-${index}`} result={result} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}
