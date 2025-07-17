import { Card } from "@/components/ui/card";
import Image from "next/image";

export const SongPageAdBanner = ({ className, width = 300, height = 250 }: { className?: string, width?: number, height?: number }) => (
    <div className={className}>
        <Card className="overflow-hidden shadow-md bg-muted/50 flex items-center justify-center h-full">
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 h-full">
                <div className="text-center">
                    <p className="text-xs font-semibold text-muted-foreground/50 mb-2">ADVERTISEMENT</p>
                    <Image src={`https://placehold.co/${width}x${height}.png`} alt="Advertisement" width={width} height={height} data-ai-hint="advertisement banner" />
                </div>
            </a>
        </Card>
    </div>
);
