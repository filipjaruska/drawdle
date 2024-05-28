import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function TopNav() {
    return (
        <nav className="flex justify-between items-center border-b font-semibold text-xl p-4 bg-gray-800 text-white">
            <div className="flex flex-row space-x-4">
                <p>Drawdle</p>
                <SignedIn>
                    <p className="text-gray-300">MyDrawdlilngs</p>
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