import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

export { Skeleton }

// Skeleton específicos para diferentes componentes
export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    </div>
  )
}

export function MetricCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-3 w-[120px]" />
      </div>
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-3 w-[60px]" />
      </div>
      <Skeleton className="h-8 w-[80px]" />
    </div>
  )
}

export function KanbanCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-4 rounded" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[80%]" />
        
        {/* Progress bar skeleton */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-[60px]" />
            <Skeleton className="h-3 w-[30px]" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        
        {/* Info row skeleton */}
        <div className="flex justify-between">
          <Skeleton className="h-3 w-[80px]" />
          <Skeleton className="h-3 w-[40px]" />
        </div>
        
        {/* Client and team skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
          <Skeleton className="h-5 w-[60px] rounded-full" />
        </div>
        
        {/* Tags skeleton */}
        <div className="flex space-x-1">
          <Skeleton className="h-5 w-[60px] rounded" />
          <Skeleton className="h-5 w-[40px] rounded" />
        </div>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[150px]" />
      <div className="flex items-end justify-between h-[200px] space-x-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <Skeleton 
              className="w-8 bg-blue-200" 
              style={{ height: `${Math.random() * 160 + 40}px` }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  )
}
