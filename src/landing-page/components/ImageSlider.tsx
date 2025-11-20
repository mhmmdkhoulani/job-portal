'use client';

import { useEffect, useState } from 'react';

export default function ImageSlider() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((prev) => (prev + 1) % 100); // Adjust speed and reset logic as needed
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden grid grid-cols-2 gap-4">
            {/* Column 1 - Moving Up */}
            <div className="flex flex-col gap-4 animate-scroll-up">
                {[1, 2, 3, 4].map((i) => (
                    <div key={`col1-${i}`} className="w-full h-[300px] bg-white/10 rounded-2xl flex-shrink-0 border border-white/5"></div>
                ))}
                {/* Duplicate for seamless loop */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={`col1-dup-${i}`} className="w-full h-[300px] bg-white/10 rounded-2xl flex-shrink-0 border border-white/5"></div>
                ))}
            </div>

            {/* Column 2 - Moving Down */}
            <div className="flex flex-col gap-4 animate-scroll-down">
                {[1, 2, 3, 4].map((i) => (
                    <div key={`col2-${i}`} className="w-full h-[300px] bg-white/10 rounded-2xl flex-shrink-0 border border-white/5"></div>
                ))}
                {/* Duplicate for seamless loop */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={`col2-dup-${i}`} className="w-full h-[300px] bg-white/10 rounded-2xl flex-shrink-0 border border-white/5"></div>
                ))}
            </div>
        </div>
    );
}
