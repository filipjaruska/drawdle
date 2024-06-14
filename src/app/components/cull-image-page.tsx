'use server';
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";

export default async function FullPageImageView(props: { artId: number, bgOn: boolean }) {

    //if images exist fetch or something to fix it fetching when it shouldn't
    const image = await getImage(props.artId);
    const uploaderInfo = await clerkClient.users.getUser(image.userId);

    const user = auth();

    return (
        <div className={`z-50 flex items-center justify-center p-4 ${props.bgOn ? 'fixed inset-0 bg-black bg-opacity-50' : ''}`}>
            <div className="bg-slate-800 border-4 border-gray-200 border-opacity-80 rounded-lg shadow-lg p-6 max-w-7xl w-full sm:flex sm:space-x-6">
                <div className="flex-shrink-0 flex justify-center items-center mb-4 sm:mb-0 w-full sm:w-3/4">
                    <img src={image.url} alt={image.name} className="object-contain rounded-lg w-full" />
                </div>
                <div className="w-full sm:w-1/4 flex flex-col flex-shrink-0 border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 pl-0 sm:pl-4">
                    <div className="text-2xl border-b border-gray-400 pb-2 mb-4 text-center sm:text-left text-white">
                        {image.name}
                    </div>
                    <div className="flex flex-col p-2 text-white">
                        <span className="font-semibold">Uploaded by:</span>
                        <span>{uploaderInfo.fullName}</span>
                    </div>
                    <div className="flex flex-col p-2 text-white">
                        <span className="font-semibold">Submitted on:</span>
                        <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                    </div>
                    {user.userId === uploaderInfo.id &&
                        <div className="p-2">
                            <form action={async () => {
                                "use server";
                                await deleteImage(image.id);
                            }}>
                                <p className="text-gray-400 text-center">Button rework in patch 0.6</p>
                                <button
                                    type="submit"
                                    className="cursor-not-allowed w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    disabled
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
