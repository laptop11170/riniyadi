import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EnterWorld = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const photos = [
    { id: 1, color: 'bg-rose-500', span: 'col-span-1 md:col-span-2 row-span-2', title: 'Serenity' },
    { id: 2, color: 'bg-blue-500', span: 'col-span-1 row-span-1', title: 'Dreams' },
    { id: 3, color: 'bg-amber-500', span: 'col-span-1 row-span-1', title: 'Warmth' },
    { id: 4, color: 'bg-emerald-500', span: 'col-span-1 md:col-span-2 row-span-1', title: 'Nature' },
    { id: 5, color: 'bg-violet-500', span: 'col-span-1 row-span-2', title: 'Mystic' },
    { id: 6, color: 'bg-cyan-500', span: 'col-span-1 row-span-1', title: 'Clarity' },
    { id: 7, color: 'bg-fuchsia-500', span: 'col-span-1 row-span-1', title: 'Vibrant' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for the grid items
      gsap.from(".bento-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5
      });

      // Animate the title
      gsap.from(".page-title", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      // Animate back button
      gsap.from(".back-button", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#0a0a0a] text-white p-4 md:p-8 overflow-y-auto">
      <button 
        onClick={() => navigate('/')}
        className="back-button absolute top-6 left-6 md:top-8 md:left-8 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="max-w-6xl mx-auto pt-20 pb-10">
        <header className="mb-12 text-center">
          <h1 className="page-title text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            The Gallery
          </h1>
          <p className="page-title text-gray-400 text-lg opacity-80">
            A collection of moments frozen in time.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`bento-item group relative rounded-2xl overflow-hidden ${photo.span} ${photo.color} cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Placeholder for actual image */}
                <span className="text-white/80 font-medium text-xl tracking-wider group-hover:scale-110 transition-transform duration-500">
                  {photo.title}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium">View Details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnterWorld;
