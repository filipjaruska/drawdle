import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function MyDrawdleLoading() {
  const Images = () => (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative rounded-lg border-4 border-muted bg-card p-4 shadow-md"
        >
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="mx-auto mt-2 h-6 w-3/4" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="m-4 flex justify-between gap-4 rounded-lg border-4 border-muted bg-card p-4">
        <div className="flex gap-4">
          <div style={{ userSelect: "none" }} className="relative">
            <Skeleton
              className="rounded-full"
              style={{ width: 54, height: 54 }}
            />
            <Skeleton className="absolute -right-2 -top-2 h-7 w-7 rounded-full" />
            <Skeleton className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full" />
          </div>
          <div className="flex flex-col justify-center text-white">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-2 h-6 w-48" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <Images />
    </div>
  );
}
