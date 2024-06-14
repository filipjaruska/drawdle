import React from 'react'
import { auth } from "@clerk/nextjs/server";
import SubmitSubmissionForm from '~/app/components/submit-submission-form';
import { getDraweekSubmissions, getNewestDraweek } from '~/server/queries'
export const dynamic = "force-dynamic";



const CurrentDraweek = async () => {
    const user = auth();
    if (!user.userId) throw new Error("User not authorized");

    const draweek = await getNewestDraweek();
    const submissions = await getDraweekSubmissions(draweek!.id.toString());

    return (
        <div className="container mx-auto p-4">
            <div className='border-4 border-gray-200 border-opacity-80 p-1 gap-2 m-4 rounded-lg bg-slate-700 shadow-md'>
                <h1 className='text-2xl text-center'> {draweek?.topic} </h1>
                <h2 className='text-l text-center'> Description or something </h2>
            </div>
            {!draweek?.submittedSubmissionsIds?.includes(user.userId.toString()) && (
                <SubmitSubmissionForm draweekId={draweek!.id.toString()} />
            )}
            <div className='m-4'>
                <div className='border-b-2 border-gray-200 pb-1'>
                    <div className='text-xl'>Submissions:</div>
                </div>
                <div className='flex flex-col'>
                    {submissions.map((submission) => (
                        <div key={submission.id} className='flex sm:flex-col flex-col-reverse bg-slate-700 shadow-md rounded-lg border border-gray-200 border-opacity-80 p-1 gap-2 m-4'>
                            <div className='flex flex-col sm:items-start items-center'>
                                <div className='flex flex-row text-center items-center gap-4'>
                                    <img
                                        src={submission.userIcon}
                                        alt="user profile"
                                        width={54}
                                        height={54}
                                        className="rounded-full" />
                                    <p className='sm:text-2xl text-xl'>{submission.userName}</p>
                                </div>
                                <p className='text-gray-300 mt-2 hidden sm:block'>{submission.description}</p>
                            </div>
                            <img src={submission.imageUrl} alt="submission" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CurrentDraweek