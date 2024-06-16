import Link from 'next/link'
import React from 'react'
import { Skeleton } from '~/components/ui/skeleton';

const DraweekLoading = () => {
    return (
        <div className="container mx-auto my-8 p-4 space-y-8">
            <Link href={"/draweek/current"}>
                <div className='bg-card border border-destructive rounded-lg shadow-lg p-6 transition-transform hover:scale-105 text-center'>
                    <Skeleton className="w-2/5 h-10 mx-auto mb-4" />
                    <Skeleton className="w-1/4 h-8 mx-auto" />
                </div>
            </Link>
            <div className="border-b border-border pb-2 mb-4">
                <div className="text-2xl text-secondary-foreground">Past Draweeks:</div>
            </div>
            <div className='space-y-4'>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="b-card border border-border rounded-lg shadow-lg p-4">
                        <Skeleton className="w-1/4 h-8 mx-auto mb-2" />
                        <Skeleton className="w-1/6 h-6 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DraweekLoading;
