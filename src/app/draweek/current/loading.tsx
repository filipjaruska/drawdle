import React from "react";
import { Skeleton } from "~/components/ui/skeleton"; // Adjust the path as per your project structure

const LoadingCurrentDraweek = () => {
  return (
    <div className="container mx-auto my-8 space-y-8 p-4">
      <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
        <h1 className="text-center text-4xl font-semibold text-foreground">
          Loading topic...
        </h1>
        <h2 className="mt-2 text-center text-xl text-secondary-foreground">
          Loading description...
        </h2>
      </div>
      <div className="mb-4 flex flex-row justify-between border-b border-border pb-2">
        <div className="text-2xl text-secondary-foreground">Submissions:</div>
        <div className="text-2xl text-secondary-foreground">(X)</div>
      </div>
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-card p-4 shadow-lg"
          >
            <div className="mb-0 flex flex-col items-center sm:mb-2 sm:items-start sm:justify-between">
              <div className="sm:mb- mb-4 flex items-center gap-2">
                <Skeleton className="h-[64px] w-[64px] rounded-full" />
                <Skeleton className="h-10 w-[200px]" />
              </div>
              <p className="hidden pt-2 text-secondary-foreground sm:mt-0 md:block">
                description
              </p>
            </div>
            <Skeleton className="h-screen max-h-fit min-h-56 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingCurrentDraweek;
