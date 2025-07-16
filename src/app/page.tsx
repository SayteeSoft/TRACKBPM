"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Music, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeSongAction } from "./actions";
import type { DetectBpmAndKeyOutput } from "@/ai/flows/detect-bpm-and-key";
import { SpotifyIcon, AppleMusicIcon, AmazonMusicIcon } from "@/components/icons";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Song title is required.",
  }),
  artist: z.string().min(1, {
    message: "Artist name is required.",
  }),
});

type SongAnalysisResult = DetectBpmAndKeyOutput & {
  title: string;
  artist: string;
};

export default function Home() {
  const [results, setResults] = useState<SongAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      artist: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await analyzeSongAction(values);
      setResults((prevResults) => [{ ...values, ...result }, ...prevResults]);
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
    <main className="min-h-screen w-full bg-background font-body">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary mb-2">
            TuneDetective
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover the BPM and musical key of your favorite songs.
          </p>
        </header>

        <Card className="max-w-2xl mx-auto mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Analyze a Song</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Song Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bohemian Rhapsody" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artist</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Queen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Find BPM & Key"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <section className="space-y-6">
            {results.map((result, index) => (
              <Card key={`${result.title}-${index}`} className="max-w-2xl mx-auto shadow-lg animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">{result.title}</CardTitle>
                  <p className="text-muted-foreground">{result.artist}</p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="flex items-center justify-center text-accent mb-2">
                      <Music className="h-8 w-8" />
                    </div>
                    <p className="text-4xl font-bold">{result.bpm}</p>
                    <p className="text-sm text-muted-foreground">BPM</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="flex items-center justify-center text-accent mb-2">
                      <KeyRound className="h-8 w-8" />
                    </div>
                    <p className="text-4xl font-bold">{result.key}</p>
                    <p className="text-sm text-muted-foreground">Key</p>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                  <p className="text-sm text-muted-foreground font-medium">Listen on:</p>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" asChild>
                      <a href={`https://open.spotify.com/search/${result.artist} ${result.title}`} target="_blank" rel="noopener noreferrer" aria-label="Listen on Spotify">
                        <SpotifyIcon className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={`https://music.apple.com/us/search?term=${result.artist} ${result.title}`} target="_blank" rel="noopener noreferrer" aria-label="Listen on Apple Music">
                        <AppleMusicIcon className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={`https://music.amazon.com/search/${result.artist} ${result.title}`} target="_blank" rel="noopener noreferrer" aria-label="Listen on Amazon Music">
                        <AmazonMusicIcon className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
