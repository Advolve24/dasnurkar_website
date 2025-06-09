import React, { useEffect, useState } from "react";

const Preloader = ({ onFinish }) => {
  const [count, setCount] = useState(0);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setSlideOut(true), 500); // trigger slide out animation after 0.5s
        setTimeout(onFinish, 1500); // call onFinish after 1.5s to remove preloader
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-transform duration-1000 ${
        slideOut ? "translate-y-full" : ""
      }`}
    >
      <div className="relative">
        {/* Faded outlined number */}
        <h1 className="text-transparent text-[12vw] font-semibold tracking-widest stroke-text select-none pointer-events-none">
          {count}%
        </h1>

        {/* White fill text overlaying from bottom */}
        <h1
          className="absolute top-0 left-0 text-white text-[12vw] font-semibold tracking-widest overflow-hidden select-none pointer-events-none"
          style={{
            clipPath: `inset(${100 - count}% 0 0 0)`,
            WebkitClipPath: `inset(${100 - count}% 0 0 0)`,
          }}
        >
          {count}%
        </h1>
      </div>
    </div>
  );
};

export default Preloader;
