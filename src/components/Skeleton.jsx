export default function Skeleton({ className }) {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-md ${className}`}></div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-4 h-full">
      {/* Title & Subtitle */}
      <div className="flex gap-3 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      {/* Body Lines */}
      <div className="space-y-2 mt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      {/* Button */}
      <Skeleton className="h-10 w-full mt-auto rounded-xl" />
    </div>
  );
}