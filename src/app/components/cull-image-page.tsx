import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { artId: number }) {

    const image = await getImage(props.artId);
    const uploaderInfo = await clerkClient.users.getUser(image.userId);

    return (
        <div className="flex w-full h-full">
            <div className="flex-shrink flex justify-center items-center">
                <img src={image.url} alt={image.name} className="object-contain flex-shrink" />
            </div>
            <div className="w-48 flex flex-col flex-shrink-0 border-l">
                <div className="text-2xl border-b text-center">{image.name}</div>
                <div className="flex flex-col p-2">
                    <span>Uploaded by:</span>
                    <span>{uploaderInfo.fullName}</span>
                </div>
                <div className="flex flex-col p-2">
                    <span>Submitted on:</span>
                    <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
