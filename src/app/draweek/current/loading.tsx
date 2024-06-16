import React from 'react';
import { Skeleton } from '~/components/ui/skeleton'; // Adjust the path as per your project structure

const LoadingCurrentDraweek = () => {
    return (
        <div className="container mx-auto my-8 p-4 space-y-8">
            <div className="bg-card border border-border rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-semibold text-center text-foreground">Loading topic...</h1>
                <h2 className="text-xl text-center text-secondary-foreground mt-2">Loading description...</h2>
            </div>
            <div className="flex flex-row justify-between border-b border-border pb-2 mb-4">
                <div className="text-2xl text-secondary-foreground">Submissions:</div>
                <div className="text-2xl text-secondary-foreground">(X)</div>
            </div>
            <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg shadow-lg p-4">
                        <div className="flex flex-col items-center sm:items-start sm:justify-between sm:mb-2 mb-0">
                            <div className="flex items-center mb-4 sm:mb- gap-2">
                                <Skeleton className="w-[64px] h-[64px] rounded-full" />
                                <Skeleton className="h-10 w-[200px]" />
                            </div>
                            <p className="pt-2 text-secondary-foreground sm:mt-0 hidden md:block">description</p>
                        </div>
                        <Skeleton className="w-full min-h-56 h-screen max-h-fit rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingCurrentDraweek;
