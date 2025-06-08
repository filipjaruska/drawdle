"use client";
import React, { useEffect, useState } from "react";

const DraweekCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endOfWeek = new Date(now);

      endOfWeek.setDate(now.getDate() + ((7 - now.getDay()) % 7));
      endOfWeek.setHours(23, 59, 59, 999);

      const diff = endOfWeek.getTime() - now.getTime();

      setTimeRemaining(Math.max(diff, 0));
    };

    calculateTimeRemaining();

    const intervalId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (milliseconds: number) => {
    if (milliseconds <= 0) return "00:00:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-gray-300">
      Time Remaining: {formatTime(timeRemaining)}
    </div>
  );
};

export default DraweekCountdown;
