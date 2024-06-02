import Link from 'next/link'
import React from 'react'
import { getDraweeks, getNewestDraweek } from '~/server/queries';

const Draweek = async () => {
    const draweeks = await getDraweeks();
    const draweek = await getNewestDraweek();
    return (
        <div className="m-4">
            <Link href={"/draweek/current"}>
                <div className='border-4 border-pink-300 border-opacity-80 m-4 rounded-lg'>
                    <h1 className="text-4xl text-center">{draweek?.topic}</h1>
                </div>
            </Link>
            <div className='border-b-2 border-gray-200'>
                <div>Past draweeks</div>
            </div>
            <div className=''>
                {draweeks.slice(1).map((draweek) => (
                    <Link href={`/draweek/${draweek.id}`} key={draweek.id}>
                        <div className="border-4 border-blue-300 border-opacity-80 p-1 gap-2 m-4 rounded-lg">
                            <h2 className="text-2xl text-center">{draweek.topic}</h2>
                            <p className="text-center">Description</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Draweek