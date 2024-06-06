import React from 'react'
import { getDraweek, getDraweekSubmissions } from '~/server/queries';

interface Props {
    params: { id: string }
}

const SpecificDraweek = async ({ params }: Props) => {
    const draweek = await getDraweek(Number(params.id));
    const submissions = await getDraweekSubmissions(draweek.id.toString());
    return (
        <div className="container mx-auto p-4">
            <div className='border-4 border-gray-200 border-opacity-80 p-1 gap-2 m-4 rounded-lg bg-slate-700 shadow-md'>
                <h1 className='text-2xl text-center'> {draweek?.topic} </h1>
                <h2 className='text-l text-center'> Description or something </h2>
            </div>
            <div className='m-4'>
                <div className='border-b-2 border-gray-200 pb-1'>
                    <div className='text-xl'>Submissions:</div>
                </div>
                <div className='flex flex-col'>
                    {submissions.map((submission) => (
                        <div key={submission.id} className='border-4 border-gray-200 border-opacity-80 p-1 gap-2 m-4 rounded-lg bg-slate-700 shadow-md flex flex-col'>
                            <div>
                                <p className='text-2xl'>{submission.userName}</p>
                                <p>{submission.description}</p>
                            </div>
                            <img src={submission.imageUrl} alt="submission" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SpecificDraweek