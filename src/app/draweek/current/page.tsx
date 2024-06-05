import React from 'react'
import SubmitSubmissionForm from '~/app/components/submit-submission-form';
import { getDraweekSubmissions, getNewestDraweek } from '~/server/queries'



const CurrentDraweek = async () => {
    const draweek = await getNewestDraweek();
    const submissions = await getDraweekSubmissions(draweek!.id.toString());

    return (
        <div className="m-4">
            <div className='border-4 border-pink-300 border-opacity-80 m-4 rounded-lg'>
                Topic: {draweek?.topic}
            </div>
            <SubmitSubmissionForm draweekId={draweek!.id.toString()} />
            <div className='m-4'>
                <div className="border-b-2 border-white">Submitted post:</div>
                <div>
                    {submissions.map((submission) => (
                        <div key={submission.id}>
                            <p>{submission.userName}</p>
                            <p>{submission.description}</p>
                            <img src={submission.imageUrl} alt="submission" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CurrentDraweek