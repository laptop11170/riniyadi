import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Search, User, Scroll } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Section1_Tomb = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [verseRevealed, setVerseRevealed] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Blur to clear animation
            gsap.fromTo(imageRef.current,
                { filter: "blur(20px)", scale: 1.1 },
                {
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 2,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "center center",
                        scrub: 1
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-8 py-24 relative overflow-hidden bg-[#0c0a0a]">

            <div className="relative z-10 max-w-3xl w-full space-y-12">

                {/* Intro Text */}
                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <span className="text-rose-500 text-xs uppercase tracking-[0.3em] font-medium block mb-4">Chapter 1: The Arrival</span>
                    <p>Let’s rewind the clock. It was the 12th of January, a day that the calendar might treat as ordinary, but for me, it was the beginning of a memory I never wanted to end.</p>
                    <p>I was standing at the entrance of Humayun’s Tomb. I had dressed with intention—black formal shirt, black trousers, a black jacket, and a scarf wrapped around my neck to ward off the Delhi chill. My sunglasses were on, hiding eyes that were anxiously scanning every vehicle that pulled up. I had spoken to the guard, secured the tickets, and cleared the path. Now, all that was missing was her.</p>
                    <p><span className="text-white font-serif italic text-2xl block my-4 border-l-2 border-rose-500 pl-4">Then, she arrived.</span></p>
                </div>

                {/* Interactive Image Break */}
                <div className="relative group w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl my-12">
                    <div ref={imageRef} className="w-full h-full bg-gradient-to-b from-gray-800 to-black relative">
                        {/* Content of the blurred image/background if any */}
                    </div>

                    {/* Hover Points - Now outside the blurred container so text stays crisp */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 pointer-events-auto group-hover:opacity-100 opacity-0 transition-opacity duration-500 cursor-help">
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white border border-white/20 shadow-lg">
                                "Time didn't just slow down; it stopped."
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-0 w-full text-center text-white/40 text-xs uppercase tracking-widest pointer-events-none">
                        Hover to see thoughts
                    </div>
                </div>

                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <p>She stepped in from the main gate, and for a second, the chaotic noise of Delhi’s traffic seemed to mute itself. She was wearing a pink shirt layered under a black jacket, paired with black jeans and boots. But it wasn’t just the clothes; it was her. Her hair was a cascade of black, shiny silk that caught the light. Her eyes, lined with black kajal, were so magnetic I knew instantly I wouldn’t be able to look anywhere else for the rest of the day.</p>
                    <p>She was on her phone, her nails painted a deep maroon, looking around, searching for me.</p>
                    <p>"I’m here," I said into the phone, watching her. "Entrance. All black."</p>
                    <p>I spotted her first. That single frame—her looking for me, confused but beautiful—locked itself into my mind forever. When she finally saw me, her face lit up. She walked toward me, and the first words out of her mouth weren't a hello, but a stunned, "You look hot."</p>
                    <p>I laughed, feeling the heat rise in my cheeks despite the cold. "Look at you," I replied, genuinely in awe. "You are... amazing. And so tall."</p>
                    <p>I had a red rose hidden away, bought specifically for this moment, but the place was a tomb which didn't feel like the right stage for it. I kept it a secret for now. We started walking in, side by side, moving with the energy of a power couple. I could feel the weight of eyes on us; people were staring, but I was too busy drowning in the details of her—her tiny earrings, the way she walked, the sound of her voice.</p>
                    <p>We met up with my group of friends inside the park complex. I introduced her, watching as they greeted her with surprised, admiring smiles. They wished us the best as they split off to head toward the nearby Dargah, leaving Rini and me to our own world.</p>
                    <p>"I’m sorry I’m late," she said as we walked toward the monument. "I totally overslept."</p>
                    <p>"It happens," I smiled. Honestly, she could have been three hours late, and I wouldn't have minded once I saw her smile. We walked into the architectural marvel, discussing the history of the Mughals, the stones, the centuries that had passed here.</p>
                </div>

                {/* Verse Interaction Break */}
                <div className="my-12 p-8 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <Scroll className="w-6 h-6 text-rose-400" />
                        <p className="text-white font-serif text-lg">We stopped in front of an inscription.</p>
                    </div>
                    <p className="text-gray-400 italic mb-6">"Can you read this?" she asked. "I can read the script, but I don’t understand the meaning fully."</p>

                    {!verseRevealed ? (
                        <button
                            onClick={() => setVerseRevealed(true)}
                            className="w-full py-4 border border-rose-500/30 rounded-xl text-rose-300 hover:bg-rose-500/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                        >
                            <Search className="w-4 h-4" /> Read the Verse Aloud
                        </button>
                    ) : (
                        <div className="text-center animate-in fade-in duration-700 space-y-6">
                            <div className="space-y-2">
                                <p className="font-serif text-3xl text-rose-200 leading-relaxed font-arabic" dir="rtl">كُلُّ مَنْ عَلَيْهَا فَانٍۢ</p>
                                <p className="font-serif text-3xl text-rose-200 leading-relaxed font-arabic" dir="rtl">وَيَبۡقَىٰ وَجۡهُ رَبِّكَ ذُو ٱلۡجَلَـٰلِ وَٱلۡإِكۡرَامِ</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-white/60 text-sm italic">"Kullu man ‛alayhā fānin"</p>
                                <p className="text-white/60 text-sm italic">"wa yabqā wajhu rabbika dhū al-jalāli wa-l-ikrām"</p>
                            </div>

                            <p className="text-white/80 text-sm max-w-lg mx-auto border-t border-white/10 pt-4 mt-4">
                                "All that is on the earth will perish, And there will remain the Face of your Lord, Owner of Majesty and Honour."
                            </p>

                            <p className="text-gray-400 mt-4 text-sm">She smiled at my effort, and that smile was better than any history lesson.</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <p>It was the golden hour. The sun was dipping low, casting a magical, amber glow over everything. But Rini... she looked ethereal. The light hit her skin, and she glowed. I found myself staring at her, drinking in the sight of her whenever she looked away, trying not to be caught admiring her so openly.</p>
                    <p>We took photos, asking a stranger to click one for us. When he handed the phone back, I looked at the screen. We looked good together. Really good.</p>
                    <p>We moved to a high porch area for a seated photo. She tried to hop up, but the ledge was too high for her boots and jeans.</p>
                    <p>"Can I lift you?" I asked, the question slipping out before I could overthink it.</p>
                    <p>"If you can," she challenged playfully.</p>
                    <p>"Of course."</p>
                    <p>My mind went blank. How do I do this gently? I hesitated, wanting to be respectful, and instead of grabbing her waist, I awkwardly but firmly lifted her by her shoulders. It wasn't the smooth, movie-star lift I had planned, but it worked. She sat there, laughing, and we took the photos. They turned out perfect.</p>
                </div>

            </div>
        </section>
    );
};
