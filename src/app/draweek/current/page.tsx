import React from 'react';
import { auth, clerkClient } from "@clerk/nextjs/server";
import SubmitSubmissionForm from '~/app/components/submit-submission-form';
import { getDraweekSubmissions, getNewestDraweek } from '~/server/queries';
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
        <div className="container mx-auto my-8 p-4 space-y-8">
            <div className="bg-card border border-border rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-semibold text-center text-foreground">{draweek?.topic}</h1>
                <h2 className="text-xl text-center text-secondary-foreground mt-2">Description or something</h2>
            </div>
            {!draweek?.submittedSubmissionsIds?.includes(user.userId.toString()) && (
                <SubmitSubmissionForm draweekId={draweek!.id.toString()} canSubmit={Boolean(canUpload)} />
            )}
            <div className="flex flex-row justify-between border-b border-border pb-2 mb-4">
                <div className="text-2xl text-secondary-foreground">Submissions:</div>
                <div className="text-2xl text-secondary-foreground">({submissions.length})</div>
            </div>
            <div className="space-y-8">
                {submissions.map((submission) => (
                    <div key={submission.id} className="bg-card border border-border rounded-lg shadow-lg p-4">
                        <div className="flex flex-col items-center sm:items-start sm:justify-between sm:mb-2 mb-0">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <img
                                    src={submission.userIcon ? submission.userIcon : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
                                    alt="user profile"
                                    className="rounded-full h-16 w-16 mr-4"
                                />
                                <p className="text-lg sm:text-2xl text-foreground">{submission.userName}</p>
                            </div>
                            <p className="pt-2 text-secondary-foreground sm:mt-0 hidden md:block">{submission.description}</p>
                        </div>
                        <img src={submission.imageUrl} alt="submission" className="rounded-lg w-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrentDraweek;
