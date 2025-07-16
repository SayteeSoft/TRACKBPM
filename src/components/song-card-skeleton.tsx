import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SongCardSkeleton = () => (
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
