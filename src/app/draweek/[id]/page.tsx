import React from 'react'
import { getDraweek, getDraweekSubmissions } from '~/server/queries';

interface Props {
    params: { id: string }
}

const SpecificDraweek = async ({ params }: Props) => {
    const draweek = await getDraweek(Number(params.id));
    const submissions = await getDraweekSubmissions(draweek.id.toString());
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
                        <p>{submission.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpecificDraweek