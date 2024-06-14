import Link from 'next/link'
import React from 'react'
import { Skeleton } from '~/components/ui/skeleton';

const DraweekLoading = () => {
    return (
        <div className="container mx-auto p-4">
            <Link href={"/draweek/current"}>
                <div className='border-4 border-orange-700 border-opacity-80 m-4 rounded-lg p-4 bg-slate-700 text-center text-xl'>
                    <Skeleton className="w-2/5 h-10 mx-auto mb-4" />
                    <Skeleton className="w-1/4 h-8 mx-auto" />
                </div>
            </Link>
            <div className='border-b-2 border-gray-200 pb-1 text-xl'>
                Past draweeks:
            </div>
            <div>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border-4 border-gray-200 border-opacity-80 p-1 gap-2 m-4 rounded-lg bg-slate-700 shadow-md">
                        <Skeleton className="w-1/4 h-8 mx-auto mb-2" />
                        <Skeleton className="w-1/6 h-6 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DraweekLoading;
