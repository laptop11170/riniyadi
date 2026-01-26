"use client";

import RiniYadiWorldScene from "@/components/RiniYadiWorldScene";
import { MadeWithDyad } from "@/components/made-with-dyad";
import React, { useEffect } from "react";
import { gsap } from "gsap";

const Index = () => {
  useEffect(() => {
    // Animate in the subtle text after the main scene loads
    const subtleTextElement = document.querySelector('.absolute.bottom-8');
    if (subtleTextElement) {
      gsap.to(subtleTextElement, {
        opacity: 1,
        delay: 5, // Show after a few seconds
        duration: 2,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden relative">
      <RiniYadiWorldScene />
      <div className="absolute bottom-4 right-4 z-10">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;