import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Decorations = () => {
  const container = useRef();

  useGSAP(() => {
    const items = gsap.utils.toArray(".float");

    items.forEach((el, i) => {
      gsap.to(el, {
        y: -20 - i * 5,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.3,
      });
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {/* 🔵 Glow Top Left */}
      <div className="float absolute -left-20 top-[10%] w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      {/* 🔵 Glow Bottom Right */}
      <div className="float absolute right-[-60px] bottom-[10%] w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full" />

      {/* 🔵 Circle */}
      <div className="float absolute left-[8%] top-[40%] w-32 h-32 border border-blue-500/20 rounded-full" />

      {/* 🔵 Lines */}
      <svg
        className="float absolute right-[-80px] top-[8%] w-[300px] opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M20 100 Q100 20, 180 100"
          stroke="rgb(59,130,246)"
          strokeWidth="1"
        />
        <path
          d="M20 120 Q100 40, 180 120"
          stroke="rgb(59,130,246)"
          strokeWidth="0.6"
          strokeDasharray="4 6"
        />
      </svg>

      {/* 🔵 Grid dots */}
      <div className="float absolute right-[8%] top-[45%] grid grid-cols-4 gap-2 opacity-30">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        ))}
      </div>

      {/* 🔵 Wave */}
      <svg
        className="float absolute left-[-50px] bottom-[10%] w-[300px] opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M0 100 Q50 50, 100 100 T200 100"
          stroke="rgb(59,130,246)"
          strokeWidth="1"
        />
      </svg>

      {/* ✨ Particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="float absolute rounded-full bg-blue-400/30"
          style={{
            width: 4 + i,
            height: 4 + i,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 12}%`,
          }}
        />
      ))}
    </div>
  );
};

export default Decorations;