"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "~/components/ui/theme-toggle";

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
        <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-background border-b border-border shadow-lg`}>
            <div className="flex justify-between items-center font-semibold text-xl p-4 text-foreground max-w-7xl mx-auto">
                <div className="flex flex-row space-x-4">
                    <Link href="/">Drawdle</Link>
                    <SignedIn>
                        <Link href="/draweek" className="text-secondary-foreground">Draweek</Link>
                        <Link href="/mydrawdle" className="text-secondary-foreground">My Drawdle</Link>
                    </SignedIn>
                </div>
                <div className="flex flex-row gap-4">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <ModeToggle />
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
