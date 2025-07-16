"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { analyzeSongAction, SongAnalysisResult } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { SongCard } from "@/components/song-card";
import { SongCardSkeleton } from "@/components/song-card-skeleton";

// This component handles client-side search logic
export function SearchHandler({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SongAnalysisResult[] | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      const performSearch = async () => {
        setIsSearchLoading(true);
        setSearchResults(null); // Clear previous results
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
          setSearchResults([]); // Set to empty array on error
        } finally {
          setIsSearchLoading(false);
        }
      };
      performSearch();
    } else {
      setSearchResults(null); // No search query, so no search results
    }
  }, [searchParams, toast]);

  if (isSearchLoading) {
    return <SongCardSkeleton />;
  }

  if (searchResults) {
    return (
      <>
        {searchResults.map((result, index) => (
          <SongCard key={`search-${result.title}-${index}`} result={result} />
        ))}
      </>
    );
  }

  // If there's no search, render the trending songs passed from the server
  return <>{children}</>;
}
