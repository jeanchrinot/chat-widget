import { Skeleton } from "@/components/ui/skeleton";

export function MessagesSkeleton() {
  return (
    <>
      <div className="h-full flex py-2 space-x-4">
        <Skeleton className="h-10 w-10 bg-slate-200 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px] bg-slate-200 rounded-xl" />
          <Skeleton className="h-3 w-[80px] bg-slate-200 rounded-xl " />
        </div>
      </div>
      <div className="h-full flex py-2 space-x-4">
        <Skeleton className="h-10 w-10 bg-slate-200 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px] bg-slate-200 rounded-xl" />
          <Skeleton className="h-3 w-[80px] bg-slate-200 rounded-xl " />
        </div>
      </div>
      <div className="h-full justify-end flex py-2 space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[100px] bg-slate-200 rounded-xl" />
          <Skeleton className="h-3 w-[80px] bg-slate-200 rounded-xl " />
        </div>
      </div>
      <div className="h-full justify-end flex py-4 space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px] bg-slate-200 rounded-xl" />
          <Skeleton className="h-3 w-[50px] bg-slate-200 rounded-xl " />
        </div>
      </div>
      <div className="h-full flex py-2 space-x-4">
        <Skeleton className="h-10 w-10 bg-slate-200 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px] bg-slate-200 rounded-xl" />
          <Skeleton className="h-3 w-[80px] bg-slate-200 rounded-xl " />
        </div>
      </div>
    </>
  );
}
