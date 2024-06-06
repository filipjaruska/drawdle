'use client';
import React, { useEffect, useState } from 'react'

const DraweekCountdown = () => {
    const [timeRemaining, setTimeRemaining] = useState<number>();

    useEffect(() => {
        const now = new Date();
        const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()), 23, 59, 59);
        setTimeRemaining(endOfWeek.getTime() - now.getTime());
        const intervalId = setInterval(() => {
            setTimeRemaining(prevTime => prevTime! - 1000);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (milliseconds: number) => {
        if (milliseconds <= 0) return "00:00:00";
        const totalSeconds = Math.floor(milliseconds / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        if (hours > 168) {
            hours = hours - 168
        }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (
        <div className="text-gray-300">Time Remaining: {formatTime(timeRemaining!)}</div>
    )
}

export default DraweekCountdown