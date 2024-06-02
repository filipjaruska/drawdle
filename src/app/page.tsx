"use client";
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const [timeRemaining, setTimeRemaining] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()), 23, 59, 59);
    setTimeRemaining(endOfWeek.getTime() - now.getTime());
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => prevTime! - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const FunnyButton = () => { // DELETE USE CLIENT AND THIS BUTTON LATER
    return (
      <Button
        onClick={() => toast("Hi!", { duration: 4000 })}
      >
        Funny Button
      </Button>
    )
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <>
      <SignedIn>
        <div className='border-4 border-gray-200 border-opacity-80 m-4 rounded-lg flex bg-slate-700'>
          <div className='w-1/2 border-r-4 border-gray-200 p-4 flex flex-col items-center justify-center gap-4'>
            <h1 className="text-4xl text-center">Current Draweek</h1>
            <div className="text-gray-300">Time Remaining {formatTime(timeRemaining!)}</div>
            <div className="flex justify-center items-center">
              <Button onClick={() => router.push("draweek/current")}>Visit Current Draweek</Button>
            </div>
          </div>
          <div className='w-1/2 p-4'>
            <h1 className="text-4xl text-center">Vote on Future Draweek</h1>
            {/* Voting content goes here */}
          </div>
        </div>
        <div className="text-center">THE TIME REMAINING DOESNT WORK ON SUNDAY AND DELETE BUTTON THROWS AN ERROR</div>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-2xl">(Drawdle is being constructed.)</div>
            <div className=" text-gray-500">Feel free to log in and checkout whats finish.</div>
            <FunnyButton />
          </div>
        </div>
      </SignedOut>
    </>
  );
}
