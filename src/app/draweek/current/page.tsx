import React from 'react'
import { auth, clerkClient } from "@clerk/nextjs/server";
import SubmitSubmissionForm from '~/app/components/submit-submission-form';
import { getDraweekSubmissions, getNewestDraweek } from '~/server/queries'
export const dynamic = "force-dynamic";

const CurrentDraweek = async () => {
    const user = auth();
    if (!user.userId) throw new Error("User not authorized");
    const uploaderInfo = await clerkClient.users.getUser(user.userId);
    if (!uploaderInfo) throw new Error("User not found");
    const canUpload = uploaderInfo.privateMetadata["can-upload"]

    const draweek = await getNewestDraweek();
    const submissions = await getDraweekSubmissions(draweek!.id.toString());

    return (
        <div className="container mx-auto p-4">
            <div className='border-4 border-gray-200 border-opacity-80 p-4 gap-2 my-8 rounded-lg bg-slate-700 shadow-lg'>
                <h1 className='text-3xl text-center text-white'> {draweek?.topic} </h1>
                <h2 className='text-xl text-center text-gray-300 mt-2'> Description or something </h2>
            </div>
            {!draweek?.submittedSubmissionsIds?.includes(user.userId.toString()) && (
                <SubmitSubmissionForm draweekId={draweek!.id.toString()} canSubmit={Boolean(canUpload)} />
            )}
            <div className='my-8'>
                <div className='flex flex-row justify-between border-b-2 border-gray-300 pb-2 mb-4'>
                    <div className='text-2xl text-gray-300'>Submissions:</div>
                    <div className='text-2xl text-gray-300'>({submissions.length})</div>
                </div>
                <div className='flex flex-col space-y-8'>
                    {submissions.map((submission) => (
                        <div key={submission.id} className='flex flex-col bg-slate-700 shadow-lg rounded-lg border border-gray-300 border-opacity-80 p-4'>
                            <div className='flex flex-col items-center sm:items-start sm:justify-between sm:mb-4 mb-0'>
                                <div className='flex items-center mb-4 sm:mb-0'>
                                    <img
                                        src={submission.userIcon ? submission.userIcon : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
                                        alt="user profile"
                                        className="rounded-full h-8 w-8 sm:h-16 sm:w-16 mr-4"
                                    />
                                    <p className='sm:text-2xl text-lg text-white'>{submission.userName}</p>
                                </div>
                                <p className='text-gray-400 mt-2 hidden md:block sm:text-lg'>{submission.description}</p>
                            </div>
                            <img src={submission.imageUrl} alt="submission" className="rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CurrentDraweek
