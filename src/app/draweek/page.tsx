import Link from 'next/link'
import React from 'react'
import { getDraweeks, getNewestDraweek } from '~/server/queries';
import DraweekCountdown from '../components/draweek-countdown';

const Draweek = async () => {
    const draweeks = await getDraweeks();
    const draweek = await getNewestDraweek();
    return (
        <div className="container mx-auto p-4">
            <Link href={"/draweek/current"}>
                <div className='border-4 border-orange-700 border-opacity-80 m-4 rounded-lg p-4 bg-slate-700 text-center text-xl'>
                    <h1 className="text-4xl">{draweek?.topic}</h1>
                    <DraweekCountdown />
                </div>
            </Link>
            <div className='border-b-2 border-gray-200 pb-1'>
                <div className='text-xl'>Past draweeks:</div>
            </div>
            <div>
                {draweeks.slice(1).map((draweek) => (
                    <Link href={`/draweek/${draweek.id}`} key={draweek.id}>
                        <div className="border-4 border-gray-200 border-opacity-80 p-1 gap-2 m-4 rounded-lg bg-slate-700 shadow-md">
                            <h2 className="text-2xl text-center text-white">{draweek.topic}</h2>
                            <p className="text-l text-center text-white">{new Date(draweek.createdAt).toLocaleDateString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Draweek