import Link from "next/link";
import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const DraweekLoading = () => {
  return (
    <div className="container mx-auto my-8 space-y-8 p-4">
      <Link href={"/draweek/current"}>
        <div className="rounded-lg border border-destructive bg-card p-6 text-center shadow-lg transition-transform hover:scale-105">
          <Skeleton className="mx-auto mb-4 h-10 w-2/5" />
          <Skeleton className="mx-auto h-8 w-1/4" />
        </div>
      </Link>
      <div className="mb-4 border-b border-border pb-2">
        <div className="text-2xl text-secondary-foreground">Past Draweeks:</div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="b-card rounded-lg border border-border p-4 shadow-lg"
          >
            <Skeleton className="mx-auto mb-2 h-8 w-1/4" />
            <Skeleton className="mx-auto h-6 w-1/6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraweekLoading;
