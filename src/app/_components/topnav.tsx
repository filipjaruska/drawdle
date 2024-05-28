"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
    const router = useRouter();
    return (
        <nav className="flex justify-between items-center border-b font-semibold text-xl p-4 bg-gray-800 text-white">
            <div className="flex flex-row space-x-4">
                <p>Drawdle</p>
                <SignedIn>
                    <p className="hidden sm:block text-gray-300">MyGaleryifsignin</p>
                    <p className="hidden sm:block text-gray-300">Download APK</p>
                </SignedIn>
            </div>
            <div className="flex flex-row">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={() => {
                            router.refresh();
                        }}
                    />
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}