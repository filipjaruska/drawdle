import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="container mx-auto my-8 space-y-8 p-4">
      <h1 className="text-center text-3xl font-semibold text-foreground">
        Vote for Your Favorite Topic
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between rounded-lg border border-border bg-card p-6 shadow-lg sm:flex-row"
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-row items-baseline gap-2 text-2xl font-semibold text-white">
                <Skeleton className="h-6 w-32" />
                <div className=" text-base font-normal text-gray-500">
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              <div className="flex space-x-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="rounded-full border-2 border-gray-300"
                    style={{ height: 40, width: 40, opacity: 1 - idx * 0.25 }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-center sm:ml-4 sm:mt-0 sm:text-right">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
