import { analyzeSongAction } from "@/app/actions";
import { AppleMusicIcon, AmazonMusicIcon, SpotifyIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';


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
  
const AdBanner = ({ className }: { className?: string }) => (
    <div className={className}>
        <Card className="overflow-hidden shadow-md bg-muted/50 flex items-center justify-center h-full">
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 h-full">
                <div className="text-center">
                    <p className="text-xs font-semibold text-muted-foreground/50 mb-2">ADVERTISEMENT</p>
                    <Image src="https://placehold.co/300x250.png" alt="Advertisement" width={300} height={250} data-ai-hint="advertisement banner" />
                </div>
            </a>
        </Card>
    </div>
);

const MetricCard = ({ title, value }: { title: string, value: string | number }) => (
    <Card className="text-center">
        <CardHeader className="p-2 pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
            <p className="text-2xl font-bold">{value}</p>
        </CardContent>
    </Card>
);

export default async function SongPage({ params }: { params: { artist: string; title: string } }) {
    const artist = decodeURIComponent(params.artist);
    const title = decodeURIComponent(params.title);

    let songData;
    try {
        songData = await analyzeSongAction({ artist, title }, true);
    } catch (error) {
        console.error("Failed to load song data:", error);
        notFound();
    }

    if (!songData) {
        notFound();
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 font-body">
            <header className="bg-primary text-primary-foreground py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-4xl font-black tracking-tighter flex items-center justify-center">
                        <span>BPM</span>
                        <LightningIcon className="w-8 h-8 mx-1 text-white fill-white" />
                        <span>Detect</span>
                    </Link>
                    {/* Future search bar could go here */}
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-3">
                        <div className="flex flex-col sm:flex-row gap-8 items-start">
                            <Image
                                src={songData.albumArt}
                                alt={`Album art for ${songData.title}`}
                                width={250}
                                height={250}
                                className="rounded-lg shadow-lg object-cover aspect-square"
                                data-ai-hint="album cover"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">{songData.artist}</p>
                                <h1 className="text-5xl font-bold text-foreground mb-2">{songData.title}</h1>
                                <Badge variant="secondary" className="text-base">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    {songData.bpm} BPM
                                </Badge>
                            </div>
                        </div>

                        <AdBanner className="my-8 h-48" />

                        <section className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Song Metrics</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <MetricCard title="Key" value={songData.key} />
                                <MetricCard title="Duration" value={songData.duration} />
                                <MetricCard title="Tempo (BPM)" value={songData.bpm} />
                                <Card className="text-center col-span-2 md:col-span-1">
                                    <CardHeader className="p-2 pb-1">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Listen on</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-2 pt-0 flex gap-2 justify-center">
                                       <Button variant="ghost" size="icon" asChild>
                                           <a href={`https://open.spotify.com/search/${songData.artist} ${songData.title}`} target="_blank" rel="noopener noreferrer"><SpotifyIcon className="h-5 w-5" /></a>
                                       </Button>
                                       <Button variant="ghost" size="icon" asChild>
                                           <a href={`https://music.apple.com/us/search?term=${songData.artist} ${songData.title}`} target="_blank" rel="noopener noreferrer"><AppleMusicIcon className="h-5 w-5" /></a>
                                       </Button>
                                       <Button variant="ghost" size="icon" asChild>
                                           <a href={`https://music.amazon.com/search/${songData.artist} ${songData.title}`} target="_blank" rel="noopener noreferrer"><AmazonMusicIcon className="h-5 w-5" /></a>
                                       </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                        
                        <Separator className="my-8" />

                        <article className="prose prose-lg max-w-none text-muted-foreground">
                            <p>{songData.description}</p>
                        </article>

                    </div>
                    <aside className="md:col-span-1 space-y-8">
                       <AdBanner />
                       <AdBanner />
                    </aside>
                </div>
            </main>
        </div>
    );
}
