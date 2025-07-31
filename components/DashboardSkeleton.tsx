import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TodoItemSkeleton } from "./TodoItemSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header Skeleton */}
      <header className="border-b bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded" />
              <div>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Stats Cards Skeleton */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <Skeleton className="h-3 w-16 mt-1" />
                </CardContent>
              </Card>

              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Todo List Skeleton */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search and Filter Skeleton */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-32" />
                </div>

                {/* Todo Items Skeleton */}
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TodoItemSkeleton key={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 