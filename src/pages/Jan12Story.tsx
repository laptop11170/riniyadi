import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

import { Section1_Tomb } from '../components/story/Section1_Tomb';
import { Section2_Market } from '../components/story/Section2_Market';
import { Section3_Mall } from '../components/story/Section3_Mall';
import { Section4_Terrace } from '../components/story/Section4_Terrace';
import { Section5_Walk } from '../components/story/Section5_Walk';

gsap.registerPlugin(ScrollTrigger);

const Jan12Story = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const goldenThreadRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Golden Thread Progress Bar
        gsap.to(goldenThreadRef.current, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-[#050505] text-[#e0e0e0] font-sans selection:bg-rose-500/30 overflow-x-hidden relative">

            {/* Navigation Header */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center transition-all duration-300 mix-blend-difference pointer-events-none">
                <button
                    onClick={() => navigate('/enter-world')}
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group pointer-events-auto"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm tracking-widest uppercase font-sans">Back</span>
                </button>
                <div className="flex items-center gap-2 text-white/30">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Dream Above Delhi</span>
                </div>
            </div>

            {/* The Golden Thread (Left Border/Line) */}
            <div className="fixed left-0 top-0 bottom-0 w-1 bg-white/5 z-40 hidden md:block">
                <div ref={goldenThreadRef} className="w-full bg-gradient-to-b from-rose-500 via-amber-200 to-rose-900 h-0" />
            </div>

            {/* SECTIONS */}
            <Section1_Tomb />
            <Section2_Market />
            <Section3_Mall />
            <Section4_Terrace />
            <Section5_Walk />

        </div>
    );
};

export default Jan12Story;
