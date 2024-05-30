import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function TopNav() {
    return (
        <nav className="flex justify-between items-center border-b font-semibold text-xl p-4 bg-gray-800 text-white">
            <div className="flex flex-row space-x-4">
                <Link href={"/"}>Drawdle</Link>
                <SignedIn>
                    <Link href={"/draweek"} className="text-gray-300">Draweek</Link>
                    <Link href={"/mydrawdle"} className="text-gray-300">My Drawdle</Link>
                    <p className="hidden sm:block text-gray-300">Download APK</p>
                </SignedIn>
            </div>
            <div className="flex flex-row">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}