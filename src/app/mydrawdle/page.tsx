import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import FunnyButton from "../_components/funny-button";

export default async function MyDrawdle() {
    const images = await getMyImages();

    // This is pain
    const user = auth();
    if (!user.userId) throw new Error("User not authorized");
    const uploaderInfo = await clerkClient.users.getUser(user.userId);
    if (!uploaderInfo) throw new Error("User not found");
    const canUpload = uploaderInfo.privateMetadata["can-upload"]

    function formatTimestamp(timestamp: number | null) {
        if (timestamp === null) {
            return "💀";
        }
        const date = new Date(timestamp);
        return date.toLocaleString('cs-CZ', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
        });
    }

    async function Images() {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {images.map((image) => (
                    <div key={image.id} className="relative p-4 border-4 border-gray-200 border-opacity-80 rounded-lg bg-slate-700 shadow-md">
                        <Link href={`/art/${image.id}`}>
                            <Image alt={image.name} width={192} height={192} src={image.url} className="w-full h-auto rounded-lg" />
                        </Link>
                        <div className="text-xl text-center mt-2 text-white">{image.name}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <SignedOut>
                <div className="w-full h-full text-2xl text-center ">Please sign in above.</div>
            </SignedOut>
            <SignedIn>
                <div className="container mx-auto p-4">
                    <div className="border-4 border-gray-200 border-opacity-80 m-4 rounded-lg flex bg-slate-700 gap-4 p-4 justify-between">
                        <div className="flex gap-4">
                            <div style={{ userSelect: 'none' }} className="relative">
                                <img
                                    src={uploaderInfo.imageUrl}
                                    alt="user profile image"
                                    width={54}
                                    height={54}
                                    className="rounded-full"
                                />
                                <div className="absolute -top-1 -right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                                    0
                                </div>
                                <div className="absolute -left-1 -bottom-1 flex items-center justify-center">{canUpload ? "🟢" : "🔴"}</div>
                            </div>
                            <div className="flex flex-col justify-center text-white">
                                <div className="text-lg font-semibold">{uploaderInfo.fullName}</div>
                                <div className="text-gray-400">Last online at: {formatTimestamp(uploaderInfo.lastActiveAt)}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <FunnyButton title="Button" message="Azumanga Daioh" />
                        </div>
                    </div>
                    <Images />
                </div>
            </SignedIn>
        </>
    );
}
