import Link from 'next/link';
import React from 'react';
import { getDraweeks, getNewestDraweek } from '~/server/queries';
import DraweekCountdown from '../components/draweek-countdown';

const Draweek = async () => {
    const draweeks = await getDraweeks();
    const draweek = await getNewestDraweek();

    return (
        <div className="container mx-auto my-8 p-4 space-y-8">
            <Link href="/draweek/current">
                <div className="bg-card border border-destructive rounded-lg shadow-lg p-6 transition-transform hover:scale-105 text-center">
                    <h1 className="text-4xl font-semibold text-foreground">{draweek?.topic}</h1>
                    <div className="mt-4 text-secondary-foreground">
                        <DraweekCountdown />
                    </div>
                </div>
            </Link>
            <div className="border-b border-border pb-2 mb-4">
                <div className="text-2xl text-secondary-foreground">Past Draweeks:</div>
            </div>
            <div className="space-y-4">
                {draweeks.slice(1).map((draweek) => (
                    <Link href={`/draweek/${draweek.id}`} key={draweek.id}>
                        <div className="bg-card border border-border rounded-lg shadow-lg p-4 transition-transform hover:scale-105">
                            <h2 className="text-2xl font-semibold text-center text-foreground">{draweek.topic}</h2>
                            <p className="text-lg text-center text-secondary-foreground">{new Date(draweek.createdAt).toLocaleDateString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Draweek;
