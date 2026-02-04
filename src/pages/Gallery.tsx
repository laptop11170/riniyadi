
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder } from 'lucide-react';

const Gallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [activeFolder, setActiveFolder] = useState('All');

    const folders = ['All', 'By Yadish', 'By Rini', 'Notes'];

    const photos = [
        { id: 1, color: 'bg-rose-500', span: 'col-span-1 md:col-span-2 row-span-2', title: 'Serenity', author: 'Rini' },
        { id: 2, color: 'bg-blue-500', span: 'col-span-1 row-span-1', title: 'Dreams', author: 'Yadish' },
        { id: 3, color: 'bg-amber-500', span: 'col-span-1 row-span-1', title: 'Warmth', author: 'Rini' },
        { id: 4, color: 'bg-emerald-500', span: 'col-span-1 md:col-span-2 row-span-1', title: 'Nature', author: 'Yadish' },
        { id: 5, color: 'bg-violet-500', span: 'col-span-1 row-span-2', title: 'Mystic', author: 'Rini' },
        { id: 6, color: 'bg-cyan-500', span: 'col-span-1 row-span-1', title: 'Clarity', author: 'Yadish' },
        { id: 7, color: 'bg-fuchsia-500', span: 'col-span-1 row-span-1', title: 'Vibrant', author: 'Rini' },
    ];

    const filteredPhotos = activeFolder === 'All'
        ? photos
        : activeFolder === 'Notes'
            ? [] // Placeholder for notes images
            : photos.filter(p => activeFolder.includes(p.author));

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5
            });

            gsap.from(".folder-chip", {
                y: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.3
            });
        }, containerRef);

        return () => ctx.revert();
    }, [activeFolder]);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-[#0a0a0a] text-white p-4 md:p-8 overflow-y-auto">
            <button
                onClick={() => navigate('/enter-world')}
                className="back-button absolute top-6 left-6 md:top-8 md:left-8 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="max-w-6xl mx-auto pt-20 pb-10">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-4">
                        Our Gallery
                    </h1>
                    <p className="text-gray-400 text-lg opacity-80 mb-8">
                        Moments frozen in time, organized with love.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {folders.map(folder => (
                            <button
                                key={folder}
                                onClick={() => setActiveFolder(folder)}
                                className={`folder-chip px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFolder === folder
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'
                                    }`}
                            >
                                {folder}
                            </button>
                        ))}
                    </div>
                </header>

                {filteredPhotos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                        {filteredPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className={`bento-item group relative rounded-2xl overflow-hidden ${photo.span} ${photo.color} cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300`}
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white/80 font-medium text-xl tracking-wider group-hover:scale-110 transition-transform duration-500">
                                        {photo.title}
                                    </span>
                                </div>
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/30 backdrop-blur-md rounded-lg text-xs font-medium text-white/70">
                                    By {photo.author}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 opacity-50">
                        <Folder className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                        <p className="text-xl text-gray-400">No photos in {activeFolder} yet.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Gallery;
