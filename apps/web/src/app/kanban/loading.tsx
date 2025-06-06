import { KanbanCardSkeleton } from "@/components/ui/skeleton"

export default function KanbanLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="space-y-2">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="h-10 flex-1 max-w-md bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board Skeleton */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-max pb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 min-w-[300px]">
              {/* Column Header Skeleton */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-8 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              
              {/* Column Content Skeleton */}
              <div className="space-y-3 min-h-[500px] p-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                {[...Array(2)].map((_, j) => (
                  <KanbanCardSkeleton key={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
