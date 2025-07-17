
import { Fragment, Suspense } from "react";
import { getTrendingSongsAction, SongAnalysisResult } from "./actions";
import { SearchHandler } from "@/components/search-handler";
import { SongCard } from "@/components/song-card";
import { AdBanner } from "@/components/ad-banner";
import { SongCardSkeleton } from "@/components/song-card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default async function Home() {
  let trendingSongs: SongAnalysisResult[] = [];
  let isConfigured = true;

  try {
    // Attempt to fetch songs. If this fails due to a missing key, the catch block will handle it.
    trendingSongs = await getTrendingSongsAction();
  } catch (error) {
    console.error("Failed to get trending songs, likely a configuration issue:", error);
    isConfigured = false;
  }

  return (
    <main className="w-full font-body">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="space-y-4 max-w-3xl mx-auto">
          {!isConfigured ? (
            <Card className="border-destructive/50">
              <CardHeader className="flex flex-row items-center gap-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <CardTitle className="text-destructive">Service Not Configured</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The Spotify integration has not been configured for this application. To enable song analysis, you must add your Spotify Client ID as an environment variable.
                </p>
                <p>
                  Please go to your hosting provider (e.g., Netlify, Vercel) and add the following environment variable:
                </p>
                <code className="block w-full rounded bg-muted p-2 text-sm font-semibold text-foreground">
                  NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
                </code>
                <p>
                  After adding the variable, you will need to redeploy your application for the changes to take effect.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Suspense fallback={<SongCardSkeleton />}>
              <SearchHandler>
                {/* This content is shown when there is no active search */}
                {trendingSongs.map((result, index) => (
                  <Fragment key={`trending-${result.title}-${index}`}>
                    <SongCard result={result} />
                    {(index + 1) % 3 === 0 && <AdBanner />}
                  </Fragment>
                ))}
              </SearchHandler>
            </Suspense>
          )}
        </section>
      </div>
    </main>
  );
}
