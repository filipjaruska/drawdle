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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2" >
                {images.map((image) => (
                    <div key={image.id} className="p-4 border-dashed border-2 border-sky-700 divide-y divide-blue-200">
                        {/* use next Image for the competition, costs money if used too much, nextConfig needs to allow for mnow */}
                        <Link href={`/art/${image.id}`}>
                            <Image alt={image.name} width={192} height={192} src={image.url} className="p-2 w-full h-5/6" />
                        </Link>
                        <div className="text-xl">{image.name}</div>
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
                <div className="border-4 border-gray-200 border-opacity-80 m-4 rounded-lg flex bg-slate-700'">
                    <img src={uploaderInfo.imageUrl} alt="user profile image" width={50} height={50} className="rounded-full" />
                    <div className="flex flex-col">
                        <div>Username: {uploaderInfo.fullName}</div>
                        <div>Upload rights: {canUpload ? "true" : "false"}</div>
                    </div>
                </div>
                <Images />
            </SignedIn>
        </>
    );
}
