import { Skeleton } from "@/components/ui/skeleton";

export function TodoItemSkeleton() {
  return (
    <div className="border rounded-lg p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <Skeleton className="h-6 w-6 mt-1" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
} 