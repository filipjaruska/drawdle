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
        <main className="pt-1 flex flex-col justify-center space-y-3">
            {tempContent.map((content) => (
                <Link href={`/draweek/${content.id}`} key={content.id}>
                    <div className="border-4 border-blue-300 border-opacity-80 p-1">
                        <h2 className="text-2xl text-center">{content.name}</h2>
                        <p className="text-center">{content.description}</p>
                        <img src={content.image} alt={content.name} className="mx-auto" />
                    </div>
                </Link>
            ))}
        </main>
    )
}

export default Draweek