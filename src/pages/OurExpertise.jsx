import React, { useState, useEffect, useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "framer-motion";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const tabs = [
  {
    label: "Architectural Design",
    slug: "architectural-design",
    images: [
      "./asset/architectural design-1.webp",
      "./asset/architectural design-2.webp",
      "./asset/architectural.svg",
    ],
    heading: "Design Excellence for Every Space",
    description:
      "With an extensive portfolio built over three glorious decades, spanning a wide range of residential, commercial, educational, landscape, governmental and industrial projects, we have won the hearts of our clients, one design at a time. Dasnurkar Associates’ design process, based on research, analysis, and problem-solving approach, helps us maximise creative potential in every project. Designing in context is one of our driving strategies. We understand the unique needs and challenges presented by each project and we address them with sensitivity. We understand each project’s unique demands and problems, and we treat them sensitively.",
  },
  {
    label: "Sanctioning",
    slug: "sanctioning",
    images: [
      "./asset/sanctioning-1.webp",
      "./asset/sanctioning-2.webp",
      "./asset/sanctioning.svg",
    ],
    heading: "Efficient sanctions for a smooth project development",
    description:
      "For any sound and seamless project completion, legalities and accurate compliances need to be worked out. With our robust experience of working in the industry, we have developed strong bonds with government and town-planning agencies across the country. Our efficient teams, with a pragmatic legal approach, take care of all relevant legal formalities, documentation, permissions and approvals, and clearances from authorities. We are the facilitators between our clients and multiple codependent agencies to ensure a smooth and hassle free experience.",
  },
  {
    label: "Interior Design",
    slug: "interior-design",
    images: [
      "./asset/interior-1.webp",
      "./asset/interior-2.webp",
      "./asset/interior.svg",
    ],
    heading: "Designing timeless spaces that tell your story",
    description:
      "Interior design transforms spaces into functional works of art, creating environments that are both aesthetic and practical. It is about crafting spaces that enhance the quality of life and reflect personal tastes while optimising space, light, and ventilation. From conceptualisation to execution, we pay attention to the tiniest details to ensure your living experience is top-notch. Whether an office, a commercial space, a residence or a institution – we curate contextual designs to stimulate functional fluency.",
  },
  {
    label: "Landscape Architecture",
    slug: "landscape-architecture",
    images: [
      "./asset/landscape-1.webp",
      "./asset/landscape-2.webp",
      "./asset/landscape.svg",
    ],
    heading: "A natural marvel engineered to perfection",
    description:
      "We bridge the gap between architecture and nature through research and practicality. Landscape architecture is a requisite step taken towards managing the pressure that urban scapes exert over ecology. We create an oasis in the urban concrete desert encouraging sustainability. Our focus lies in developing strategic processes involving artistic composition and technique, horticultural finesse and expertise. We have completed successful landscape projects of varying scales and challenges.",
  },
];

export default function OurExpertise() {
  const location = useLocation();
  const navigate = useNavigate();
   const query = useQuery();

   const heroRef = useRef(null); // <-- Define heroRef
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 }); 

  const [activeTab, setActiveTab] = useState(0);
  const [hoveredImg, setHoveredImg] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { images, heading, description } = tabs[activeTab];

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabSlug = params.get("tab");
    const foundIndex = tabs.findIndex((tab) => tab.slug === tabSlug);
    if (foundIndex !== -1) setActiveTab(foundIndex);
  }, [location.search]);

 
//   useEffect(() => {
//   const timeout = setTimeout(() => {
//     const tab = tabs[activeTab].slug;
//     const element = document.getElementById(tab);
//     if (element) {
//       const yOffset = -100;
//       const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   }, 100); // Delay to ensure DOM elements are rendered

//   return () => clearTimeout(timeout);
// }, [activeTab]);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tabSlug = params.get("tab");
  const foundIndex = tabs.findIndex((tab) => tab.slug === tabSlug);
  if (foundIndex !== -1) {
    setActiveTab(foundIndex);
    setExpandedIndex(foundIndex); // <-- Expand that tab on mobile too

    // Scroll to it (for mobile)
    const element = document.getElementById(tabSlug);
    if (element) {
      const yOffset = -80; // Adjust for fixed headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
}, [location.search]);


  const handleTabChange = (index) => {
    const slug = tabs[index].slug;
    setActiveTab(index);
    setHoveredImg(null);
    navigate(`?tab=${slug}`);
  };

  return (
    <>
      {/* Banner Section */}
      <div className="w-full bg-[#141414] text-white px-5 md:px-20 pt-24">
        <div  ref={heroRef} 
        className="w-full mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-5 pb-8">
          <div className="w-full md:w-[20%]">
            <h2 className="text-3xl md:text-4xl font-normal mb-4 font-[FrieghtNeo]">
              OUR <br /> EXPERTISE
            </h2>
          </div>

          <div className="hidden md:block h-[90px] w-px bg-gray-300"></div>
          <hr className="w-[80%] -mt-5 md:hidden" />

          <div className="w-full md:w-[70%] flex flex-col items-center md:items-start gap-2">
            <p className="w-[65%] text-lg md:text-2xl uppercase font-normal font-[FrieghtNeo] tracking-wider">
              Building Your Vision, Crafting Your Future
            </p>
            <img
              src="https://dasnurkar.in/wp-content/uploads/2024/09/architecture-design-hd-image-architects-hd-image.jpg"
              alt="Expertise Banner"
              className="md:hidden w-full h-[120px] rounded-2xl shadow-lg mt-3 mb-3"
            />
            <p className="text-sm md:text-base text-white font-thin font-[Gothic] leading-loose">
              With a diverse set of expertise and an in-depth understanding of the design process, we provide customised solutions to your architectural requirements through provable methods and design that stand the test of time.
            </p>
          </div>
        </div>
        <img
          src="https://dasnurkar.in/wp-content/uploads/2024/09/architecture-design-hd-image-architects-hd-image.jpg"
          alt="Expertise Banner"
          className="hidden md:block md:rounded-2xl shadow-lg"
        />
      </div>

      {/* Desktop Layout */}
      <div id={tabs[activeTab].slug} className="hidden md:block w-full h-full bg-[#141414] text-white px-[5rem] py-16">
        <div className="flex justify-between border-b border-gray-500 px-10 mb-12 flex-wrap ">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`text-2xl transition-all duration-300 pb-5 font-[FrieghtNeo] font-medium ${
                activeTab === index
                  ? "text-white border-b-2 border-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div
        className={`fixed bottom-6 right-6 sm:right-[55px] transition-opacity duration-300 ${
          isHeroInView ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          className="bg-black text-xl sm:text-[1.7rem] border border-black rounded-full text-white w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </div>
    </div>

        <div className="flex flex-col md:flex-row items-center justify-between md:items-start">
          <div className="relative w-full md:w-[50%] h-[420px]">
            <img
              src={images[0]}
              alt=""
              onMouseEnter={() => setHoveredImg(0)}
              onMouseLeave={() => setHoveredImg(null)}
              className={`absolute top-0 left-0 rounded-[10%] rounded-tl-none rounded-br-none shadow-xl border-solid border-[7px] border-[#141414] 
              w-[490px] h-[350px] transition-all duration-500
              ${hoveredImg === 0 ? "z-20 scale-[1.03]" : "z-10"}
              ${hoveredImg !== null && hoveredImg !== 0 ? "scale-95 opacity-80" : ""}`}
            />
            <img
              src={images[1]}
              alt=""
              onMouseEnter={() => setHoveredImg(1)}
              onMouseLeave={() => setHoveredImg(null)}
              className={`absolute top-40 right-0 rounded-[10%] rounded-tl-none shadow-xl border-solid border-[7px] border-[#141414]
              w-[420px] h-[290px] transition-all duration-500
              ${hoveredImg === 1 ? "z-20 scale-[1.03]" : "z-10"}
              ${hoveredImg !== null && hoveredImg !== 1 ? "scale-95 opacity-80" : ""}`}
            />
          </div>

          <div className="w-full flex flex-col md:w-[45%] gap-10">
            <div className="w-full flex justify-between border-b border-white pb-5">
              <div className="w-[60%]">
                <h2 className="text-3xl font-medium mb-4 font-[FrieghtNeo]">
                  {heading}
                </h2>
              </div>
              <div className="w-[25%] flex align-middle justify-end">
                <img src={images[2]} alt="" className="object-contain" />
              </div>
            </div>
            <p className="text-white leading-relaxed font-[Gothic]">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full bg-[#141414] text-white px-5 py-10 space-y-5">
        {tabs.map((tab, index) => (
          <div key={index} id={tab.slug} className="p-4">
            <h2 className="text-2xl font-semibold text-center mb-2 font-[FrieghtNeo]">
              {tab.label}
            </h2>
            <hr className="border-gray-700 mb-4" />
            <div className="flex flex-col items-center space-y-3 mb-4">
              <img
                src={tab.images[2]}
                alt="icon"
                className="w-[120px] h-[50px]"
              />
              <p className="text-center font-[FrieghtNeo] text-xl">
                {tab.heading}
              </p>
            </div>
            <div className="relative">
              <img
                src={tab.images[0]}
                alt="img1"
                className="w-full h-[200px] object-cover rounded-[15%] rounded-tl-none rounded-br-none"
              />
              <img
                src={tab.images[1]}
                alt="img2"
                className="w-[80%] h-[165px] absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 object-cover rounded-[15%] rounded-tl-none rounded-br-none border-[5px] border-[#141414]"
              />
            </div>
            <div className="mt-20 text-center">
              <button
                onClick={() => toggleReadMore(index)}
                className="text-white focus:outline-none"
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>
              {expandedIndex === index && (
                <p className="mt-3 text-sm text-gray-300 font-[Gothic] leading-relaxed">
                  {tab.description}
                </p>
              )}
            </div>
          </div>
        ))}

        <div
        className={`z-30 fixed bottom-6 right-6 sm:right-[55px] transition-opacity duration-300 ${
          isHeroInView ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          className="bg-black text-xl sm:text-[1.7rem] border border-black rounded-full text-white w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </div>
      </div>
    </>
  );
}
