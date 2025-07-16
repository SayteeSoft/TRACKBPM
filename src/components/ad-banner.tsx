import Image from "next/image";
import { Card } from "@/components/ui/card";

export const AdBanner = () => (
    <Card className="overflow-hidden shadow-md animate-in fade-in-0 duration-500 bg-muted/50">
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 h-full">
            <div className="text-center">
                <p className="text-sm font-semibold text-muted-foreground">Advertisement</p>
                <Image src="https://placehold.co/728x90.png" alt="Advertisement" width={728} height={90} data-ai-hint="advertisement banner" />
            </div>
        </a>
    </Card>
);
