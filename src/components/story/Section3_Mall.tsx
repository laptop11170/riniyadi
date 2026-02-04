import React, { useRef, useState } from 'react';
import { Droplet, IceCream } from 'lucide-react';

export const Section3_Mall = () => {
    const [theme, setTheme] = useState<'default' | 'ocean'>('default');
    const [dodges, setDodges] = useState(0);
    const [iceCreamCaught, setIceCreamCaught] = useState(false);
    const iceCreamBtnRef = useRef<HTMLButtonElement>(null);

    const handleScentSelect = () => {
        setTheme('ocean');
    };

    const handleIceCreamHover = () => {
        if (iceCreamCaught || dodges >= 3 || !iceCreamBtnRef.current) return;

        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 100;
        iceCreamBtnRef.current.style.transform = `translate(${x}px, ${y}px)`;
        setDodges(prev => prev + 1);
    };

    const handleIceCreamClick = () => {
        setIceCreamCaught(true);
        if (iceCreamBtnRef.current) iceCreamBtnRef.current.style.transform = 'translate(0,0)';
    };

    return (
        <section className={`min - h - screen py - 24 p - 8 relative overflow - hidden transition - colors duration - 1000 ${theme === 'ocean' ? 'bg-indigo-950 font-sans' : 'bg-[#151212]'} `}>

            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <span className={`text - xs uppercase tracking - [0.3em] font - medium block mb - 4 ${theme === 'ocean' ? 'text-blue-300' : 'text-rose-500'} `}>Chapter 3: The Cold Hands and The Mall</span>
                    <p>Hunger struck. The group gravitated toward a famous non-veg biryani joint. We sat down, but I froze.</p>
                    <p>"Rini," I whispered. "You don't eat chicken, right? You're partially vegetarian?"</p>
                    <p>She nodded. "Fish and eggs are okay. No chicken."</p>
                    <p>The place only had chicken. She looked at me, "It's fine, I'm comfortable, really."</p>
                    <p>"No," I said firmly. "I'm not comfortable with you not eating. Let's go to Haldiram's. It's nearby."</p>
                    <p>Chaitanya joined us, and we hopped into a tuk-tuk. The wind was biting cold. Rini sat beside me, looking like a painting—hydrated, smooth skin, lovely eyebrows, a soothing smile. But her hands were freezing. I took them in mine again, rubbing them, trying to transfer my body heat to her.</p>
                    <p>At Haldiram's, we ordered the winter special: Palak Chat & Chhole Bhature. She loved it. "This is really good," she said, savoring the warmth of the food.</p>
                    <p>After eating and freshening up, we stood outside. "Where to now?" I asked.</p>
                    <p>"I don't go out much," she admitted. "I have no idea."</p>
                    <p>"Omaxe Mall," I said, remembering it was just a minute away. "It's walking distance. You'll like it."</p>
                    <p>She took my hand again. That pause—just a second of connection before we started walking—felt so good.</p>
                    <p>The mall was a stark contrast to the streets outside. The interior was royal, grand, and shimmering. "This doesn't even feel like Chandni Chowk," she whispered, looking around with wide eyes.</p>
                    <p className="font-serif italic text-2xl text-center py-4 text-white">"Mashallah"</p>
                    <p>I whispered to myself, looking at her eyes reflecting the lights.</p>
                    <p>We found a jewelry stall. I tried to buy her a bracelet again. "Sir, these are for children," the shopkeeper said. I looked at Rini. "Well, you are a child too." We laughed at the lame joke and moved on.</p>
                </div>

                {/* Scent Interaction */}
                <div className={`p - 8 rounded - 2xl border transition - all duration - 500 ${theme === 'ocean' ? 'bg-blue-900/20 border-blue-500/30' : 'bg-white/5 border-white/10'} `}>
                    <p className="text-lg mb-6 text-gray-300">We found a perfume shop... She picked an "Ocean" fragrance.</p>
                    <div className="flex flex-col items-center gap-4">
                        <button
                            disabled={theme === 'ocean'}
                            onClick={handleScentSelect}
                            className={`px - 8 py - 4 rounded - xl border flex items - center gap - 4 transition - all hover: scale - 105 ${theme === 'ocean' ? 'bg-blue-500 text-white border-blue-400' : 'bg-white/5 border-white/20 text-white/50 hover:bg-white/10 hover:text-white'} `}
                        >
                            <Droplet className="w-6 h-6" />
                            <span className="uppercase tracking-widest text-sm">Select Ocean Scent</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <p>I bought it for her. Then she chose one for me. The best one. We walked out with cute little paper bags, smelling amazing.</p>
                    <p>Next was the Turkish Ice Cream stall. I wanted her to experience the tricks. "No, make Chaitanya do it!" she laughed. "It's for you," I insisted. She picked blueberry.</p>
                </div>

                {/* Ice Cream Prank Interaction */}
                <div className="my-12 py-12 flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative min-h-[250px]">
                    <p className="text-white/60 mb-8 italic">The vendor did his routine—spinning the cone, taking it away...</p>

                    {!iceCreamCaught ? (
                        <button
                            ref={iceCreamBtnRef}
                            onMouseEnter={handleIceCreamHover}
                            onClick={handleIceCreamClick}
                            className="px-6 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg transition-transform duration-100 ease-linear flex items-center gap-2 z-20"
                        >
                            <IceCream className="w-5 h-5" />
                            {dodges < 3 ? "Grab Ice Cream" : "Okay, take it!"}
                        </button>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                                <IceCream className="w-8 h-8 text-rose-500" />
                            </div>
                            <p className="text-white text-lg font-serif">"Your smile here made my day."</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6 text-lg md:text-xl font-light leading-loose text-gray-300">
                    <p>She laughed the whole time, her smile lighting up the room. I recorded a video of it, capturing her joy.</p>
                    <p>We retreated to McDonald's to sit. I got Chaitanya another ice cream. We sat there, taking photos with our cone, unable to finish the massive Turkish treat. She looked so happy, so relaxed. Seeing her comfortable made my day.</p>
                </div>
            </div>

            {theme === 'ocean' && <div className="absolute inset-0 pointer-events-none bg-blue-500/5 mix-blend-overlay z-0" />}
        </section>
    );
};
