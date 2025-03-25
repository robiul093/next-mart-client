"use client";

import { useState, useEffect } from "react";


const Countdown = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const calculateTimeLeft = () => {
        const difference = new Date(midnight).getTime() - new Date().getTime();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="flex gap-4 text-lg font-medium items-center">
            {/* <div className="bg-white/50 rounded-full px-5 py-2">{timeLeft.days}Day</div>: */}
            <div className="bg-white/50 rounded-full px-5 py-2">{timeLeft.hours} Hour</div>:
            <div className="bg-white/50 rounded-full px-5 py-2">{timeLeft.minutes} Minutes</div>:
            <div className="bg-white/50 rounded-full px-5 py-2 border-red-500 border-2">{timeLeft.seconds} Seconds</div>
        </div>
    );
};

export default Countdown;
