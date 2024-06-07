import React from 'react';
import { auth } from "@clerk/nextjs/server";
import { getNewestPooling, getPollingVotes } from '~/server/queries';
import PostVoteForm from '~/app/components/post-vote-form';
import SubmitVoteForm from '~/app/components/submit-vote-form';
export const dynamic = "force-dynamic";



const VotePage = async () => {
    const polling = await getNewestPooling();
    const votes = await getPollingVotes(polling!.id.toString());
    const user = auth();

    return (
        <div className="container mx-auto p-4">
            {!polling?.submittedIdeaIds?.includes(user.userId!.toString()) && (
                <div>
                    <SubmitVoteForm pollingId={polling!.id.toString()} />
                </div>
            )}
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Vote for Your Favorite Topic</h1>
            <div className="grid grid-cols-1 gap-6">
                {votes.map((vote) => (
                    <div key={vote.id} className="border border-gray-200 border-opacity-80 p-6 rounded-lg bg-slate-700 shadow-md flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-semibold text-white flex flex-row items-baseline gap-2">{vote.topic}<div className=" text-gray-500 font-normal text-base"> by Tvoje m8ma</div></div>
                            <div className="flex space-x-2">
                                {vote.voterImages?.slice(0, 4).map((image, index) => {
                                    const opacity = 1 - (index * 0.25);
                                    return (
                                        <img
                                            key={index}
                                            src={image}
                                            alt="Voter"
                                            height={40}
                                            width={40}
                                            className="rounded-full border-2 border-gray-300"
                                            style={{ opacity }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4 text-center sm:text-right">
                            <div className="text-xl text-white">Votes: {vote.voterIDs?.length}</div>
                            {!vote.voterIDs?.includes(user.userId!.toString()) && (
                                <PostVoteForm userId={user.userId!.toString()} pollingId={vote.id} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotePage;
