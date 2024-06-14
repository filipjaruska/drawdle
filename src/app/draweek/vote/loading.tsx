import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';

const LoadingPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 mt-4 text-center text-white">Vote for Your Favorite Topic</h1>
            <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border border-gray-200 border-opacity-80 p-6 rounded-lg bg-slate-700 shadow-md flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-semibold text-white flex flex-row items-baseline gap-2">
                                <Skeleton className="w-32 h-6" />
                                <div className=" text-gray-500 font-normal text-base">
                                    <Skeleton className="w-24 h-6" />
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <Skeleton key={idx} className="rounded-full border-2 border-gray-300" style={{ height: 40, width: 40, opacity: 1 - (idx * 0.25) }} />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4 text-center sm:text-right">
                            <Skeleton className="w-32 h-10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LoadingPage;
