import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Loader = ({ onFinish, onHalfway }) => {
  const [show, setShow] = useState(true);
  const digitRefs = useRef(Array.from({ length: 5 }, () => []));
  const loaderRef = useRef();
  const word1Ref = useRef();
  const word2Ref = useRef();
  const dividerRef = useRef();
  const spinnerRef = useRef();
  const logoWrapperRef = useRef();
  const blockRefs = useRef([]);

  const counterDigits = [
    ["0", "0"],
    ["2", "5"],
    ["5", "0"],
    ["7", "5"],
    ["9", "9"],
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      delay: -0.6,
      onComplete: () => {
        onFinish?.();
        setShow(false);
      },
    });

    gsap.set(logoWrapperRef.current, { opacity: 0 });

    digitRefs.current.forEach((digitGroup, index) => {
      const h1s = digitGroup.map((el) => el?.querySelector("h1")).filter(Boolean);

      tl.to(
        h1s,
        {
          y: "10%",
          duration: 1.9,
          stagger: 0.1,
          ease: "sine.inOut",
        },
        index * 0.7
      );

      tl.to(
        h1s,
        {
          y: "-150%",
          duration: 1.9,
          stagger: 0.1,
          ease: "sine.inOut",
        },
        index * 0.7 + 0.1
      );
    });

    tl.to(spinnerRef.current, { opacity: 0, duration: 0.3 }, "+=0.2");

    tl.to(
      [word1Ref.current?.querySelector("h1"), word2Ref.current?.querySelector("h1")],
      {
        y: "0%",
        opacity: 1,
        delay: -1.2,
        duration: 1,
        ease: "hop",
        onStart: () => onHalfway?.(), // ✅ Trigger halfway callback
      },
      "+=0.1"
    );
    tl.to(logoWrapperRef.current, { opacity: 1, duration: 0.5 }, "<");

    tl.to(dividerRef.current, {
      scaleY: 1,
      duration: 1,
      ease: "hop",
      onComplete: () => gsap.to(dividerRef.current, { opacity: 0, duration: 0.4, delay: 0.3 }),
    });

    tl.to(word1Ref.current?.querySelector("h1"), {
      y: "100%",
      duration: 1,
      ease: "hop",
    });

    tl.to(
      word2Ref.current?.querySelector("h1"),
      {
        y: "-100%",
        duration: 1,
        ease: "hop",
      },
      "<"
    );

    tl.to(logoWrapperRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
    });

    tl.to(blockRefs.current[0], {
      y: "100%",
      duration: 1,
      delay: -1,
      ease: "hop",
    });

    tl.to(blockRefs.current[1], {
      y: "-100%",
      duration: 1,
      delay: -1,
      ease: "hop",
    });
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black text-white font-sans overflow-hidden" ref={loaderRef}>
      <div className="absolute inset-0 flex">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="w-full h-full bg-[#383838]" ref={(el) => (blockRefs.current[i] = el)} />
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        {counterDigits.map((pair, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex"
          >
            {pair.map((digit, j) => (
              <div
                key={j}
                className="overflow-hidden h-[12rem] w-[10rem]"
                ref={(el) => el && digitRefs.current[i].push(el)}
              >
                <h1 className="text-[15rem] font-medium font-[Frightneo] translate-y-[120%] leading-none text-white">
                  {digit}
                </h1>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div
          ref={spinnerRef}
          className="w-12 h-12 border-[1.4px] border-white border-t-[1.4px] border-t-[#ffffff20] rounded-full animate-spin"
        />
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 z-20 font-[Frightneo]"
        ref={logoWrapperRef}
      >
        <div className="relative -left-2 pr-1" ref={word1Ref}>
          <h1 className="text-4xl translate-y-[-120%] opacity-0 ml-[2rem]">WEL</h1>
        </div>
        <div ref={word2Ref}>
          <h1 className="text-4xl translate-y-[120%] opacity-0">COME</h1>
        </div>
      </div>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white origin-top scale-y-0 z-10"
        ref={dividerRef}
      />
    </div>
  );
};

export default Loader;
