import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, BookHeart, CalendarHeart, Stars } from 'lucide-react';

const SelectExperience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation - Instant Fast
            gsap.to(".header-reveal", {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });

            // Big Main Card Animation
            gsap.to(".main-card", {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.1, // Minimal delay
                ease: "back.out(1.2)" // Slight pop for snappy feel
            });

            // Sub Cards Animation
            gsap.to(".sub-card", {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                delay: 0.15,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-[#050505] text-white flex flex-col relative overflow-y-auto overflow-x-hidden selection:bg-rose-500/30">

            {/* Absolute Background Elements for "Smooth Premium" feel - No Gradients, just soft glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-rose-500/[0.03] rounded-full blur-[100px]" />
            </div>

            {/* Navigation */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-white/60 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-start pt-24 pb-20 px-4 w-full max-w-7xl mx-auto min-h-screen">

                {/* Header */}
                <div className="text-center mb-16 header-reveal opacity-0 -translate-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
                        <Stars className="w-3 h-3 text-rose-300" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">The Collection</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-6 tracking-tight">
                        Curated Memories
                    </h1>
                    <p className="text-white/40 font-light max-w-md mx-auto leading-relaxed">
                        Choose a path to relive our moments.
                    </p>
                </div>

                {/* Layout: Main Card Top, Two Below */}
                <div className="w-full flex flex-col items-center gap-6 md:gap-8">

                    {/* 1. The MAIN CARD (12th Jan 2026) - Rectangular List Type */}
                    <div className="main-card w-full max-w-4xl opacity-0 translate-y-8 scale-95 origin-center">
                        <div
                            onClick={() => navigate('/jan-12-story')}
                            className="group relative w-full bg-[#0F0F0F] border border-rose-500/30 rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:border-rose-500/60 hover:bg-[#151010] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
                        >

                            {/* Left: Icon & Title */}
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-600 to-rose-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                        <CalendarHeart className="w-8 h-8 text-white" />
                                    </div>
                                    {/* Heartbeat dot */}
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                                </div>

                                <div className="text-left">
                                    <h2 className="text-2xl md:text-3xl font-serif text-white mb-1 group-hover:text-rose-200 transition-colors">
                                        12th January 2026
                                    </h2>
                                    <p className="text-white/60 text-sm font-light">
                                        The day everything changed.
                                    </p>
                                </div>
                            </div>

                            {/* Right: CTA */}
                            <button className="whitespace-nowrap px-8 py-3 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-500 transition-all duration-300 shadow-md text-xs tracking-widest uppercase w-full md:w-auto">
                                Revisit
                            </button>
                        </div>
                    </div>


                    {/* 2. Secondary Cards Row - Visibility Fixed */}
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">

                        {/* Gallery */}
                        {/* Gallery - Coming Soon */}
                        <div className="sub-card relative bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 h-[250px] shadow-lg opacity-0 translate-y-8 overflow-hidden pointer-events-none">

                            {/* Coming Soon Badge */}
                            <div className="absolute top-4 right-4 bg-white/10 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Coming Soon</span>
                            </div>

                            <div className="p-4 rounded-full bg-white/5 border border-white/5 transition-all duration-300 opacity-50">
                                <Image className="w-6 h-6" />
                            </div>
                            <div className="opacity-50">
                                <h3 className="text-xl font-serif text-white mb-1">Our Gallery</h3>
                                <p className="text-white/50 text-xs uppercase tracking-wider">Visual Moments</p>
                            </div>
                        </div>

                        {/* Sweet Memories - Active */}
                        {/* Sweet Memories - Coming Soon */}
                        <div className="sub-card relative bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 h-[250px] shadow-lg opacity-0 translate-y-8 overflow-hidden pointer-events-none">

                            {/* Coming Soon Badge */}
                            <div className="absolute top-4 right-4 bg-white/10 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Coming Soon</span>
                            </div>

                            <div className="p-4 rounded-full bg-white/5 border border-white/5 transition-all duration-300 opacity-50">
                                <BookHeart className="w-6 h-6" />
                            </div>
                            <div className="opacity-50">
                                <h3 className="text-xl font-serif text-white mb-1">Sweet Memories</h3>
                                <p className="text-white/50 text-xs uppercase tracking-wider">Written Notes</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SelectExperience;
