import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PiArrowCircleRightThin } from "react-icons/pi";

const categories = [
  {
    title: "Residential",
    desc: "Experience comfort and class",
    img: "/Nyati-Equinox-6.webp",
  },
  {
    title: "Commercial",
    desc: "Witness to your success story",
    img: "/Nyati-Unitree-1.webp",
  },
  {
    title: "Interiors",
    desc: "Art of crafting idyllic spaces",
    img: "/interior-img-e1730015643813.webp",
  },
  {
    title: "Landscape",
    desc: "Uniting Nature and Technology",
    img: "/landscape-img.webp",
  },
  {
    title: "Educational",
    desc: "Spaces that inspire learning",
    img: "/Suryadatta-Institute-Campus-1.webp",
  },
  {
    title: "Others",
    desc: "More of our creative potential",
    img: "/Swastik-1.webp",
  },
];

const repeatArray = (arr, n) => Array.from({ length: n }, () => arr).flat();
const REPEAT_COUNT = 20; // More repeats for smoother illusion
const repeatedCategories = repeatArray(categories, REPEAT_COUNT);



export default function ProjectCategorySlider() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const userInteractionTimeout = useRef(null);

  const scrollByAmount = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const amount = container.offsetWidth * 0.2;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
    handleUserInteraction();
  };

 useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const scrollToMiddle = () => {
    const totalItems = repeatedCategories.length;
    const originalItems = categories.length;
    const oneSetWidth = container.scrollWidth / (totalItems / originalItems);

    // Temporarily disable scroll behavior to prevent visual jump
    container.style.scrollBehavior = "auto";
    container.scrollLeft = oneSetWidth * Math.floor(REPEAT_COUNT / 2);

    // Re-enable smooth scroll
    requestAnimationFrame(() => {
      container.style.scrollBehavior = "smooth";
    });
  };

  // Wait for layout
  requestAnimationFrame(() => {
    requestAnimationFrame(scrollToMiddle);
  });
}, []);


  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    clearTimeout(userInteractionTimeout.current);
    userInteractionTimeout.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000);
  };

  const handleRedirect = (title) => {
    navigate(`/projectgallery/${title.toLowerCase()}`);
  };

  return (
    <div
      className="relative w-screen h-screen bg-black text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Arrows */}
      <button
        onClick={() => scrollByAmount("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={() => scrollByAmount("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
      >
        <ChevronRight size={32} />
      </button>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleUserInteraction}
        className="w-full h-screen overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar snap-x snap-mandatory"
      >
        {repeatedCategories.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleRedirect(item.title);
              handleUserInteraction();
            }}
            className="inline-block w-[100vw] sm:w-[50vw] lg:w-[25vw] h-full relative cursor-pointer group overflow-hidden snap-start border-x-2 border-black"

          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none group">
              {/* Black Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300 z-10" />

              {/* Bottom Gradient */}
             <div className="w-full h-32 bg-gradient-to-t from-black via-black/70 to-transparent absolute bottom-0 left-0 z-10 pointer-events-none" />

              {/* Description */}
              <div className="p-2 sm:p-4 mt-28 sm:mt-28 md:mt-28 flex flex-wrap w-full justify-center items-center opacity-0 group-hover:opacity-100 text-white  text-wrap text-[1.5rem] md:text-[1.5rem] sm:text-[1.5rem] uppercase transition-all duration-300 z-20 text-center">
                <span style={{ fontFamily: 'FrieghtNeo' }}>{item.desc}</span>
              </div>

              {/* Title + Arrow */}
              <div className="absolute bottom-8 sm:bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition duration-300 z-20">
                <div className="mb-14 sm:mb-12 w-14 h-14 sm:w-14 sm:h-14 md:w-14 md:h-14 bg-opacity-20 flex items-center justify-center text-3xl sm:text-3xl md:text-3xl opacity-0 group-hover:opacity-100 transition duration-300">
                <PiArrowCircleRightThin className="text-[7rem] font-light"/>
                </div>
                <div
                  className="text-white text-[30px] mb-[50px] sm:mb-0 sm:text-base md:text-lg"
                  style={{ fontFamily: "FrieghtNeo" }}
                >
                  <span className="text-[30px] border-b-[1.5px] border-transparent border-white transition-all duration-300">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}
