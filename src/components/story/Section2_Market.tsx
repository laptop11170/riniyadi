import React, { useEffect, useRef, useState } from 'react';
import { Bird, Flower2 } from 'lucide-react';

export const Section2_Market = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pigeons, setPigeons] = useState<Array<{ id: number, x: number, y: number }>>([]);
    const [roseFound, setRoseFound] = useState(false);

    // Initialize scattered pigeons
    useEffect(() => {
        const initialPigeons = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 90 + 5,
            y: Math.random() * 90 + 5
        }));
        setPigeons(initialPigeons);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return; // Pigeons persist, so no roseFound check here

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        setPigeons(prev => prev.map(p => {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 15) { // Repulsion radius
                const angle = Math.atan2(dy, dx);
                return {
                    ...p,
                    x: p.x + Math.cos(angle) * 2,
                    y: p.y + Math.sin(angle) * 2
                };
            }
            return p;
        }));
    };

    return (
        <section ref={containerRef} onMouseMove={handleMouseMove} className="min-h-screen py-24 p-8 relative overflow-hidden bg-[#111]">

            {/* Pigeons Overlay Background */}
            {pigeons.map(p => (
                <div
                    key={p.id}
                    className="absolute transition-all duration-300 ease-out pointer-events-none opacity-20"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                    <Bird className="w-8 h-8 text-gray-500" />
                </div>
            ))}

            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <span className="text-rose-500 text-xs uppercase tracking-[0.3em] font-medium block mb-4">Chapter 2: The Kabutar Market</span>
                    <p>As we walked toward the exit, the conversation flowed effortlessly. She walked fast—maybe a habit, maybe a hurry. Outside, I called my friends to coordinate.</p>
                    <p>"Where are you guys?"</p>
                    <p>"We split up," one of them said. "Two went to Hazrat Nizamuddin Dargah, two went shopping, and four of us are at... the Kabutar Market."</p>
                    <p>I relayed this to Rini. She started giggling, her nose crinkling. "Kabutar Market? What is that? Do they want to buy pigeons?"</p>
                    <p>We both burst out laughing, fueled by curiosity and the absurdity of the name. We decided to walk toward the Hazrat Nizamuddin Dargah road to find them. Crossing the busy street, I reached out and held her hand.</p>
                    <p className="text-white italic text-2xl border-l-2 border-rose-500 pl-4 py-2">It was electric. A jolt went through me. Her hand was cold, so cold, fitting perfectly in mine.</p>
                    <p>Even after we crossed and I let go to follow the "side rule"—me walking closest to the traffic to shield her—I could still feel the phantom pressure of her fingers.</p>
                    <p>We reached an unofficial entrance to the Dargah. The vibe shifted instantly. Aggressive shopkeepers began yelling at us to remove our shoes at their stall so that we could buy flowers from them. "We can keep our shoes at the last shop," I suggested to Rini, knowing it was a long walk barefoot.</p>
                    <p>We ignored the first few touts, but a teenage boy at a stall started yelling at us, aggressive and rude. He wanted our business by force. I saw Rini flinch; she looked scared, uncomfortable. A dark, protective anger surged in me. I wanted to switch personalities, to yell back, to put the kid in his place. He thinks it’s my first time here, I thought. He has no idea.</p>
                    <p>But I looked at Rini. I didn't want a scene. I controlled the fire inside, grabbed her arm gently, and steered her away. "Let's go. We're cancelling the Dargah."</p>
                    <p>"Yeah," she breathed, looking relieved as we walked away from the chaos and the crowd.</p>
                    <p>We met up with Rahil and Adeeba at a different entrance and booked a cab. It was finally the right time.</p>
                </div>

                {/* The Rose Interaction Break */}
                <div className="my-12 py-12 flex flex-col items-center justify-center border-y border-white/5 bg-white/2 rounded-3xl">
                    <p className="text-white font-serif italic text-xl mb-6">"I have something for you," I said softly.</p>

                    {!roseFound ? (
                        <div
                            className="relative w-48 h-48 flex items-center justify-center group cursor-pointer"
                            onClick={() => setRoseFound(true)}
                        >
                            <p className="absolute -top-8 text-xs text-white/30 uppercase tracking-widest group-hover:text-rose-500 transition-colors">Tap to give Rose</p>
                            <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all" />
                            <Flower2 className="w-16 h-16 text-white/20 group-hover:text-rose-500 transition-all duration-500 scale-90 group-hover:scale-110" />
                        </div>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-500">
                            <Flower2 className="w-24 h-24 text-rose-500 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
                            <p className="text-rose-200">"Her reaction was everything."</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <p>I pulled out the red rose. I hadn't given it to her at the tomb, but here, in the quiet safety of the cab, it felt right. Her reaction was everything. She looked at that single flower as if it were a diamond and stars, her eyes wide with genuine happiness. We smiled at each other, a silent language developing between us.</p>
                    <p>The driver took us to the mysterious "Kabutar Market." We were all making jokes—even the driver didn't know what it was. Rini was convinced it was a pet market.</p>
                    <p>We arrived behind Chandni Chowk in Old Delhi. The first thing we saw? Literal pigeons for sale.</p>
                    <p>"See!" Rini laughed.</p>
                    <p>But as we explored, we realized my friend was right—it was actually a local market famous for men's clothes. We wandered through the narrow, bustling lanes near Jama Masjid. Rini stopped, bending down to adjust her boots for the fifth time today.</p>
                    <p>"What's wrong?" I asked.</p>
                    <p>"It's the boots," she grimaced. "I'm not wearing socks. They're rubbing."</p>
                    <p>She spotted a street vendor selling socks, bought a pair, and put them on right there. "Much better," she sighed.</p>
                    <p>We continued exploring, hand in hand now. I kept insisting she buy earrings or a trinket. "Pick whatever you like," I urged. She refused the earrings but eventually agreed to look for a bracelet. We hunted through shop after shop, but nothing caught her eye. It didn't matter. We were roaming the chaotic streets of Old Delhi, holding hands, and she looked comfortable. I looked at her, really looked at her, and she was smiling in that attractive, unguarded way.</p>
                    <p>Suddenly, we ran into the rest of our friend group. They saw us—fingers intertwined, smiling like idiots—and they cheered. They looked happy for me. I guess it was obvious on my face.</p>
                </div>
            </div>
        </section>
    );
};
