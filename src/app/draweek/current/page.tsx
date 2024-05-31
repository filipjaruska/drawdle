import React from 'react'
import { getDraweekSubmissions, getNewestDraweek } from '~/server/queries'

const CurrentDraweek = async () => {
    const draweek = await getNewestDraweek();
    const submissions = await getDraweekSubmissions(draweek!.id);
    return (
        <div>
            <div>
                Topic: {draweek?.topic}
            </div>
            <div className="border-b-2 border-white">Submitted post:</div>
            <div>
                {submissions.map((submission) => (
                    <div key={submission.id}>
                        <p>{submission.userName}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CurrentDraweek