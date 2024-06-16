import React from 'react';
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getNewestPooling, getPollingVotes } from '~/server/queries';
import PostVoteForm from '~/app/components/post-vote-form';
import SubmitVoteForm from '~/app/components/submit-vote-form';

export const dynamic = "force-dynamic";

const VotePage = async () => {
    const polling = await getNewestPooling();
    let votes = await getPollingVotes(polling!.id.toString());
    const user = auth();
    if (!user.userId) throw new Error("User not authorized");
    const uploaderInfo = await clerkClient.users.getUser(user.userId);
    if (!uploaderInfo) throw new Error("User not found");
    const canUpload = uploaderInfo.privateMetadata["can-upload"];

    votes = votes.sort((a, b) => (b.voterIDs ? b.voterIDs.length : 0) - (a.voterIDs ? a.voterIDs.length : 0));

    return (
        <div className="container mx-auto my-8 p-4 space-y-8">
            {!polling?.submittedIdeaIds?.includes(user.userId.toString()) && (
                <div>
                    <SubmitVoteForm pollingId={polling!.id.toString()} canSubmit={Boolean(canUpload)} />
                </div>
            )}
            <h1 className="text-3xl font-semibold text-center text-foreground">Vote for Your Favorite Topic</h1>
            <div className="space-y-6">
                {votes.map((vote) => (
                    <div key={vote.id} className="bg-card border border-border rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-semibold text-foreground flex flex-row items-baseline gap-2">
                                {vote.topic}
                                <div className="text-secondary-foreground font-normal text-base">by {vote.createdBy}</div>
                            </div>
                            <div className="flex space-x-2">
                                {vote.voterImages?.slice(0, 4).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt="Voter"
                                        height={40}
                                        width={40}
                                        className={`rounded-full border-2 border-border ${index % Math.floor(Math.random() * 2) === 0 ? ' animate-spin ease-in-out' : ''}`}
                                        style={{
                                            opacity: 1 - (index * 0.22),
                                            clipPath: index === 3 ? 'polygon(0 0, 60% 0, 60% 100%, 0% 100%)' : 'none'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4 text-center sm:text-right">
                            {vote.voterIDs?.length ? <div className="text-xl text-foreground">Votes: {vote.voterIDs.length}</div> : null}
                            {!vote.voterIDs?.includes(user.userId.toString()) && (
                                <PostVoteForm userId={user.userId.toString()} pollingId={vote.id} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotePage;
