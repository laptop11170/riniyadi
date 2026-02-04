import React, { useRef, useState } from 'react';
import { Heart, ThermometerSun } from 'lucide-react';

export const Section4_Terrace = () => {
    const [warmth, setWarmth] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startWarming = () => {
        if (warmth >= 100) return;
        intervalRef.current = setInterval(() => {
            setWarmth(prev => {
                if (prev >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
    };

    const stopWarming = () => {
        if (warmth < 100 && intervalRef.current) {
            clearInterval(intervalRef.current);
            const coolDown = setInterval(() => {
                setWarmth(p => {
                    if (p <= 0 || p >= 100) {
                        clearInterval(coolDown);
                        return p >= 100 ? 100 : 0;
                    }
                    return p - 5;
                });
            }, 50);
        }
    };

    return (
        <section className="min-h-screen py-24 p-8 relative overflow-hidden bg-[#050b14]">

            {/* Background city lights parallax placeholder */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-900/20 to-transparent" />
                <div className="absolute top-10 right-20 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
            </div>

            {/* Frost Overlay */}
            <div
                className="fixed inset-0 pointer-events-none transition-opacity duration-1000 z-40 border-[50px] border-white/10 blur-xl mix-blend-screen"
                style={{
                    opacity: 1 - (warmth / 100),
                    boxShadow: 'inset 0 0 200px rgba(200, 230, 255, 0.3)'
                }}
            />

            <div className="relative z-30 max-w-3xl mx-auto space-y-12">
                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <span className="text-rose-500 text-xs uppercase tracking-[0.3em] font-medium block mb-4">Chapter 4: The Terrace</span>
                    <p>It was getting late, and Starbucks had closed, so we took the elevator to the top floor. We found our way to the terrace, which doubled as a parking lot.</p>
                    <p>It was quiet, cold, and beautiful.</p>
                    <p>We could see all of Old Delhi laid out before us—the Red Fort, the minarets of Jama Masjid, the Gurudwara, the lights of the market. "Chale?" I asked, pointing to a small, slightly restricted-looking staircase going even higher. "Chalo," she said.</p>
                    <p>We went up. The view was ultimate. We stargazed as well. The temperature dropped, the air was crisp, and the atmosphere turned heavy with romance. A little thrill ran through us because we probably weren't supposed to be there.</p>
                    <p>"This is the best memory," she told me, leaning against the railing. "All my best memories in Delhi are with people who aren't from Delhi."</p>
                    <p>I looked at her. The beauty of nature. That’s what I called her in my head. Her lips, her neck, the way she stood there. It was the perfect moment to kiss her—to just lean in and make it cinematic. But I didn't. It might have made things awkward, and I didn't want to break the spell.</p>
                    <p>"Does Chaitanya know about your ex?" she asked suddenly. "Yes," I said. "He met her. But that's history."</p>
                    <p>We stood there for fifteen minutes, just us and the skyline. Chaitanya was waiting downstairs, giving us privacy. It felt like a dream, but her cold hand in mine proved it was real.</p>
                </div>

                {/* Warmth Interaction */}
                <div className="py-12 flex flex-col items-center gap-6 border-y border-white/5">
                    {warmth < 100 ? (
                        <>
                            <p className="text-blue-200/80 italic text-center">"Her cold hand in mine proved it was real."</p>
                            <button
                                onMouseDown={startWarming}
                                onMouseUp={stopWarming}
                                onMouseLeave={stopWarming}
                                onTouchStart={startWarming}
                                onTouchEnd={stopWarming}
                                className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center relative overflow-hidden active:scale-95 transition-transform"
                            >
                                <div
                                    className="absolute bottom-0 left-0 w-full bg-rose-500 transition-all duration-100 ease-linear"
                                    style={{ height: `${warmth}%` }}
                                />
                                <ThermometerSun className="w-8 h-8 text-white relative z-10" />
                            </button>
                            <p className="text-xs uppercase tracking-widest text-white/40 animate-pulse">Hold to Warm Hands</p>
                        </>
                    ) : (
                        <div className="animate-in fade-in duration-1000 flex flex-col items-center gap-6 text-center">
                            <div className="p-8 bg-rose-500/10 rounded-full border border-rose-500/30">
                                <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
                            </div>
                            <p className="text-2xl font-serif text-white">"The best view wasn't the city. It was you."</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <p>We took one last photo close together and headed down. We saw another locked staircase that looked easy to trespass, but we decided against pressing our luck. We found Chaitanya, joked around in the elevator, and finally exited the mall.</p>
                </div>
            </div>

        </section>
    );
};
