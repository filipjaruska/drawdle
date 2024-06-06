import { SignedIn, SignedOut } from "@clerk/nextjs";
import UploadImage from "../_components/UploadImage";
import { getImage, getMyImages } from "~/server/queries";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";

export default async function MyDrawdle() {
    const images = await getMyImages();

    // This is pain
    const user = auth();
    if (!user.userId) throw new Error("User not authorized");
    const uploaderInfo = await clerkClient.users.getUser(user.userId);
    if (!uploaderInfo) throw new Error("User not found");
    const canUpload = uploaderInfo.privateMetadata["can-upload"]


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
                {/* <UploadImage h1Name="text" /> */}
                <div className="container mx-auto p-4">
                    <div className="border-4 border-gray-200 border-opacity-80 m-4 rounded-lg flex bg-slate-700 gap-4 p-4 items-center">
                        <div className="relative">
                            <img
                                src={uploaderInfo.imageUrl}
                                alt="user profile image"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div className="absolute top-0 right-0 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                                0
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-white">
                            <div className="text-lg font-semibold">{uploaderInfo.fullName}</div>
                            <div>Upload rights: {canUpload ? "true" : "false"}</div>
                        </div>
                    </div>
                    <Images />
                </div>
            </SignedIn>
        </>
    );
}
