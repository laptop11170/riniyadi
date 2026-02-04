import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dog, Lightbulb, Heart, Gift, Truck, Plane, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export const Section5_Walk = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dogRef = useRef<HTMLDivElement>(null);
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const [lampsLit, setLampsLit] = useState<number[]>([]);
    const [stage, setStage] = useState<'initial' | 'hug_replay' | 'poetic_message' | 'gift_box' | 'delivery' | 'proposal' | 'celebration'>('initial');
    const [roseBursts, setRoseBursts] = useState<number[]>([]);
    const navigate = useNavigate();

    const triggerRoseBlast = (e: React.MouseEvent | React.TouchEvent | any) => {
        e.stopPropagation();
        setRoseBursts(prev => [...prev, Date.now()]);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Dog follows scroll
            gsap.to(dogRef.current, {
                y: 1500, // Distance of walk adjusted for longer text
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: true
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const toggleLamp = (idx: number) => {
        if (!lampsLit.includes(idx)) setLampsLit(prev => [...prev, idx]);
    };

    const handleReplayHug = () => {
        setStage('hug_replay');
        setTimeout(() => {
            setStage('poetic_message');
        }, 3000); // 3 seconds of "hug" before message
    };

    const handleOpenGift = () => {
        setStage('delivery');
        // Truck animation time
        setTimeout(() => {
            setStage('proposal');
        }, 4000);
    };

    const handleNoHover = () => {
        if (noButtonRef.current) {
            // Much faster and wider range
            const x = (Math.random() - 0.5) * 600;
            const y = (Math.random() - 0.5) * 600;
            gsap.to(noButtonRef.current, {
                x,
                y,
                duration: 0.1,
                ease: "power1.out"
            });
        }
    };

    const handleYesClick = () => {
        setStage('celebration');
        /* 
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#e11d48', '#fbbf24', '#ffffff']
        });
        */
    };

    return (
        <section ref={containerRef} className="min-h-[200vh] py-24 p-8 relative overflow-hidden bg-[#080808]">

            <div className="relative z-10 max-w-3xl mx-auto space-y-12 pl-12 md:pl-0">

                {/* Dog Companion (Sticky-ish via GSAP) */}
                <div ref={dogRef} className="absolute -left-4 md:-left-20 top-32 p-3 bg-white text-black rounded-full shadow-[0_0_20px_white] z-20 pointer-events-none">
                    <Dog className="w-5 h-5" />
                </div>

                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 md:left-[-40px]" />

                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <span className="text-rose-500 text-xs uppercase tracking-[0.3em] font-medium block mb-4">Chapter 5: The Long Walk Home</span>
                    <p>It was late. "I'll drop you home," I said. I told Chaitanya to head to our hotel and not to wait up.</p>
                    <p>Rini booked a cab to Old Rajendra Nagar—the UPSC hub. During the 20-minute ride, we talked about traffic rules, government policies... she was so intelligent, so emotionally mature.</p>
                    <p>When we arrived, the streets were filled with the quiet buzz of aspirants. Students smoking at tea stalls, libraries glowing in the night. She showed me her world—where she studied, the coaching center she liked.</p>
                    <p>"Let's get tea," she said.</p>

                    <div
                        onMouseEnter={() => toggleLamp(0)}
                        className={`transition-all duration-700 p-6 border-l-2 ${lampsLit.includes(0) ? 'border-yellow-500 bg-yellow-500/5' : 'border-white/10'}`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Lightbulb className={`w-5 h-5 ${lampsLit.includes(0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                            <span className="text-sm uppercase tracking-widest text-white/50">Checkpoint: The Tea Stall</span>
                        </div>
                        <p>We stood on the street, the temperature hovering around 10 degrees. We bought tea and cigarettes. I had quit smoking a year ago, but tonight was an exception.</p>
                        <p className="mt-4">I lit mine, but my hands were so numb from the cold that the cigarette slipped from my fingers and hit the ground.</p>
                        <p>She laughed gently. "Throw it away. Get a new one."</p>
                    </div>

                    <p>I did. We stood there, smoking and sipping tea, talking about everything. She told me about her roommates, the "ghost" in her apartment, how much she hated the Delhi pollution. She told me that after she clears her UPSC exam, she would take me to Mussoorie.</p>
                    <p>"Deal," I said, excitedly.</p>
                    <p>The police patrolled by, telling shops to close. It was 1:30 AM. We moved to the stairs of a closed shop. She opened her gallery to show me photos—Pondicherry, friends, memories. Then, scrolling through, she found photos of me that I had sent her ages ago.</p>
                    <p>"Do you know my birthday?" I teased. She scrolled through the gallery, found the date on an old file, and announced it triumphantly. We laughed.</p>
                    <p>The police van came back. We scrambled up to leave, walking away. "Where is your bag?" she asked after two minutes. "Oh god." I ran back, laughing. The gift bag was still sitting on the stairs. Safe.</p>
                    <p>"I should go to my room now," she said. "I'll walk you." "It's nearby, we can just walk if you aren't tired?" "Walking and talking? Let's go."</p>

                    <div
                        onMouseEnter={() => toggleLamp(1)}
                        className={`transition-all duration-700 p-6 border-l-2 ${lampsLit.includes(1) ? 'border-yellow-500 bg-yellow-500/5' : 'border-white/10'}`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Lightbulb className={`w-5 h-5 ${lampsLit.includes(1) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                            <span className="text-sm uppercase tracking-widest text-white/50">Checkpoint: The 1.5km Walk</span>
                        </div>
                        <p>It was a 1.5 km walk. The road was silent, the streetlights sparse. We crossed the main road, my hand holding hers tight. I walked on the road side, keeping her on the footpath. We reached a roundabout and ran across it, laughing like kids.</p>
                    </div>

                    <p>Finally, we reached her lane. There was a tiny, dark way—maybe two feet wide. "People use this," she said. "But... it's too dark, let it be", she said.</p>
                    <p>We reached her apartment building and sat on the steps outside. A white street dog trotted up to us, wagging its tail. He kept trying to nuzzle Rini, and I kept gently blocking him, protecting her even from a friendly dog.</p>
                    <p>We sat there for thirty minutes, just delaying the bye-bye. Finally, she booked a cab for me.</p>
                    <p>I stood up and hugged her from behind. It was warm, solid, real. I walked her to the very gate of her building. Two other dogs started barking aggressively at us, blocking the path. I whistled to our white dog friend. He trotted over, and the other two immediately stopped barking and pretended to sleep.</p>
                    <p className="text-center text-2xl font-serif italic text-white py-8">Safe.</p>
                </div>

                {/* Final Interaction Stage Manager */}
                <div className="py-20 flex flex-col items-center gap-8 border-t border-white/10 min-h-[500px] justify-center">

                    {/* Stage 0: Initial */}
                    {stage === 'initial' && (
                        <div className="text-center space-y-8 animate-in fade-in">
                            <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                                <p>At the gate, she turned to me. She hugged me tightly. Time stopped again. I held her, breathing in her scent, feeling the comfort of her existence. I didn't want to let go. My eyes closed while hugging her, it felt heavenly.</p>
                                <p>As the cab pulled away, I realized it wasn't a dream. She was real. The cold was real. And that day? That day was perfect.</p>
                            </div>
                            <button
                                onClick={handleReplayHug}
                                className="group relative px-12 py-6 rounded-full bg-rose-600 text-white uppercase tracking-widest text-sm font-bold hover:bg-rose-500 transition-all shadow-[0_0_40px_rgba(225,29,72,0.4)] hover:scale-105 hover:shadow-[0_0_60px_rgba(225,29,72,0.6)]"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Heart className="w-5 h-5 fill-current" /> Replay The Hug
                                </span>
                            </button>
                        </div>
                    )}

                    {/* Stage 1: Hug Replay (Transition) */}
                    {stage === 'hug_replay' && (
                        <div className="text-center animate-in zoom-in duration-1000">
                            <div className="flex items-center justify-center gap-[-15px] mb-8">
                                <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-[#080808] z-10 shadow-2xl animate-pulse" />
                                <div className="w-24 h-24 rounded-full bg-rose-900 border-4 border-rose-500 -ml-8 z-20 shadow-[0_0_40px_rgba(225,29,72,0.6)] animate-pulse" />
                            </div>
                            <p className="text-rose-300 font-serif text-2xl italic">Holding on...</p>
                        </div>
                    )}

                    {/* Stage 2: Poetic Message & Reveal */}
                    {stage === 'poetic_message' && (
                        <div className="text-center animate-in slide-in-from-bottom duration-1000 space-y-6 max-w-lg">
                            <p className="text-2xl font-serif text-rose-200 italic my-6">"But wait... the story doesn't end with a goodbye."</p>
                            <p className="text-white/60">A small piece of my heart was left with you, and a gift is coming to you.</p>

                            <button
                                onClick={() => setStage('gift_box')}
                                className="mt-8 px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm uppercase tracking-widest text-white/50 hover:text-white"
                            >
                                What did you leave?
                            </button>
                        </div>
                    )}

                    {/* Stage 3: Mystery Box */}
                    {stage === 'gift_box' && (
                        <div className="text-center animate-in zoom-in duration-700 cursor-pointer" onClick={handleOpenGift}>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-rose-500 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                                <Gift className="w-32 h-32 text-rose-400 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_white]" />
                                <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-300 animate-bounce" />
                            </div>
                            <p className="mt-8 text-white/50 text-sm uppercase tracking-widest animate-pulse">Tap to Open</p>
                        </div>
                    )}

                    {/* Stage 4: Delivery Truck */}
                    {stage === 'delivery' && (
                        <div className="w-full relative h-[200px] overflow-hidden">
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-white/10" />
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 animate-[drive_4s_linear_forwards] flex items-center gap-4">
                                <Truck className="w-16 h-16 text-white" />
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                                    <p className="text-xs uppercase tracking-widest text-green-400">Order is on the way!</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stage 5: Proposal */}
                    {stage === 'proposal' && (
                        <div className="text-center space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
                            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                                May I be someone<br />
                                <span className="text-rose-500 italic">you smile with?</span>
                            </h3>

                            <div className="flex items-center justify-center gap-8 relative h-20">
                                <button
                                    onClick={handleYesClick}
                                    className="px-10 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-green-500/50 transition-all hover:scale-110 z-10"
                                >
                                    Yes <Heart className="w-4 h-4 inline-block ml-2 fill-current" />
                                </button>

                                <button
                                    ref={noButtonRef}
                                    onMouseEnter={handleNoHover}
                                    className="px-10 py-4 bg-gray-700 text-gray-400 rounded-full font-bold uppercase tracking-widest absolute transition-all duration-100"
                                    style={{ left: 'calc(50% + 80px)' }}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Stage 6: Celebration */}
                    {stage === 'celebration' && (
                        <div className="text-center space-y-8 animate-in zoom-in duration-500 relative w-full select-none">
                            {/* Persistent Roses Rain */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 h-[500px]">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="absolute text-2xl animate-[fall_4s_linear_infinite]" style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        opacity: Math.random() * 0.5 + 0.5
                                    }}>🌹</div>
                                ))}
                                {/* Dynamic Burst Roses */}
                                {roseBursts.map(burst => (
                                    // Burst 15 roses per click
                                    [...Array(15)].map((_, i) => (
                                        <div key={`${burst}-${i}`} className="absolute text-3xl animate-[fall_2s_linear_forwards]" style={{
                                            left: `${Math.random() * 100}%`,
                                            top: -50,
                                            animationDuration: `${Math.random() * 1.5 + 1.5}s`,
                                            opacity: 1
                                        }}>🌹</div>
                                    ))
                                ))}
                            </div>

                            <h3 className="text-3xl md:text-5xl font-serif text-white font-bold leading-relaxed">
                                Stop smiling Rini madam...<br />
                                <span className="text-rose-400 text-2xl">you are blushinggggg so much cutieeeee!</span>
                            </h3>

                            <p className="text-white/60 mt-4">Here is another rose for you pyaari Riniiiiiii (Tap it!)</p>

                            <div className="flex justify-center mt-4">
                                <button onClick={triggerRoseBlast} className="text-8xl animate-bounce hover:scale-110 transition-transform active:scale-90 cursor-pointer outline-none bg-transparent border-none">
                                    🌹
                                </button>
                            </div>

                            <button
                                onClick={() => navigate('/enter-world')}
                                className="mt-12 text-white/30 text-xs hover:text-white uppercase tracking-widest underline decoration-white/30 hover:decoration-white transition-all"
                            >
                                Return to World
                            </button>
                        </div>
                    )}

                </div>

            </div>

            <style>{`
                @keyframes drive {
                    0% { transform: translate(-100px, -50%) }
                    100% { transform: translate(120vw, -50%) }
                }
                @keyframes fall {
                    0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
                }
            `}</style>
        </section>
    );
};
