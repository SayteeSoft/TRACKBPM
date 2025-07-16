
import { Fragment, Suspense } from "react";
import { getTrendingSongsAction, SongAnalysisResult } from "./actions";
import { SearchHandler } from "@/components/search-handler";
import { SongCard } from "@/components/song-card";
import { AdBanner } from "@/components/ad-banner";
import { SongCardSkeleton } from "@/components/song-card-skeleton";

// Main page component is now a Server Component
export default async function Home() {
  // Fetch trending songs on the server
  const trendingSongs = await getTrendingSongsAction();

  return (
    <main className="w-full font-body">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="space-y-4 max-w-3xl mx-auto">
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
        </section>
      </div>
    </main>
  );
}
