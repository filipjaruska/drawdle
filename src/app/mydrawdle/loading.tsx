import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';

export default function MyDrawdleLoading() {

    const Images = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="relative p-4 border-4 border-gray-200 border-opacity-80 rounded-lg bg-slate-700 shadow-md">
                    <Skeleton className="w-full h-48 rounded-lg" />
                    <Skeleton className="w-3/4 h-6 mt-2 mx-auto" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="border-4 border-gray-200 border-opacity-80 m-4 rounded-lg flex bg-slate-700 gap-4 p-4 justify-between">
                <div className="flex gap-4">
                    <div style={{ userSelect: 'none' }} className="relative">
                        <Skeleton className="rounded-full" style={{ width: 54, height: 54 }} />
                        <Skeleton className="absolute -top-2 -right-2 rounded-full w-7 h-7" />
                        <Skeleton className="absolute -left-1 -bottom-1 rounded-full w-5 h-5" />
                    </div>
                    <div className="flex flex-col justify-center text-white">
                        <Skeleton className="w-32 h-6" />
                        <Skeleton className="w-48 h-6 mt-2" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Skeleton className="w-32 h-10" />
                </div>
            </div>
            <Images />
        </div>
    );
}
