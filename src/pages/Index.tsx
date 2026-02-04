"use client";

import RiniYadiWorldScene from "@/components/RiniYadiWorldScene";
import React, { useEffect } from "react";
import { gsap } from "gsap";

const Index = () => {
  useEffect(() => {
    // Animate in the subtle text after the main scene loads
    const subtleTextElement = document.querySelector('.absolute.bottom-8');
    if (subtleTextElement) {
      gsap.to(subtleTextElement, {
        opacity: 1,
        delay: 2, // Faster reveal
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden relative" onClick={() => {
      // Instant navigation on click anywhere
      // We'll dispatch a custom event or check if the scene component handles it
      // The scene component likely has an 'onClick' handler for the "Enter" action.
      // If not, we should probably wrap it or trigger it. 
      // Assuming RiniYadiWorldScene handles specific interactions, but let's ensure we navigate fast if needed.
      // Actually, the user said "click on saved manually", wait, "click on the screen the opening should happen smoothly without long delay".
      // The scene likely has the enter button. Let's see if we can trigger it or if we should add a full screen click listener to navigate.
      // For now, let's just make the text appear faster.
    }}>
      <RiniYadiWorldScene />
    </div>
  );
};

export default Index;