"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TopNav() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.innerWidth < 768) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-gray-800 border-b border-gray-700 shadow-lg`}>
            <div className="flex justify-between items-center font-semibold text-xl p-4 text-white max-w-7xl mx-auto">
                <div className="flex flex-row space-x-4">
                    <Link href="/">Drawdle</Link>
                    <SignedIn>
                        <Link href="/draweek" className="text-gray-300">Draweek</Link>
                        <Link href="/mydrawdle" className="text-gray-300">My Drawdle</Link>
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
            </div>
        </nav>
    );
}