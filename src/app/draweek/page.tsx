import Link from 'next/link'
import React from 'react'

const tempContent = [
    {
        id: 1,
        name: 'Drawing competition 1',
        description: 'This is a drawing of a cat.',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Drawing competition 2',
        description: 'This is a drawing of a dog.',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        name: 'Drawing competition 3',
        description: 'This is a drawing of a bird.',
        image: 'https://via.placeholder.com/150'
    }
]

const Draweek = () => {
    return (
        <div className="m-4">
            <Link href={"/draweek/current"}>
                <div className='border-4 border-pink-300 border-opacity-80 m-4 rounded-lg'>
                    <h1 className="text-4xl text-center">Current</h1>
                </div>
            </Link>
            <div className='border-b-2 border-gray-200'>
                <div>Past draweeks</div>
            </div>
            <div className=''>
                {tempContent.map((content) => (
                    <Link href={`/draweek/${content.id}`} key={content.id}>
                        <div className="border-4 border-blue-300 border-opacity-80 p-1 gap-2 m-4 rounded-lg">
                            <h2 className="text-2xl text-center">{content.name}</h2>
                            <p className="text-center">{content.description}</p>
                            <img src={content.image} alt={content.name} className="mx-auto" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Draweek