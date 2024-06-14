import React from 'react';
import { Skeleton } from '~/components/ui/skeleton'; // Adjust the path as per your project structure

const LoadingCurrentDraweek = () => {
    return (
        <div className="container mx-auto p-4">
            <div className='border-4 border-gray-200 border-opacity-80 p-1 gap-2 m-4 rounded-lg bg-slate-700 shadow-md'>
                <h1 className='text-2xl text-center'> Loading Topic... </h1>
                <h2 className='text-l text-center'> Loading Text... </h2>
            </div>
            <div className='m-4 gap-2'>
                <div className='border-b-2 border-gray-200 pb-1'>
                    <div className='text-xl'>Submissions:</div>
                </div>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-3 flex sm:flex-col flex-col-reverse bg-slate-700 shadow-md rounded-lg border border-gray-200 border-opacity-80 p-1 gap-2 m-4">
                        <div className="space-y-2 flex flex-row gap-4 items-center">
                            <Skeleton className="w-[52px] h-[52px] rounded-full" />
                            <Skeleton className="h-8 w-[200px]" />
                        </div>
                        <Skeleton className="w-full h-96 rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingCurrentDraweek;
