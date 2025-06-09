import React, { useRef, useState, useEffect } from "react";
import { useSearchParams,useLocation,useNavigate } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import ArchitectureSlider from "../components/ArchitectureSlider";
import WorkspaceGallery from "../components/WorkspaceGallery";
import TeamSection from "../components/TeamSection";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function CountUp({ target, suffix = "+", duration = 1 }) {
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    controls.start({
      count: target,
      transition: { duration, ease: "easeOut" },
    });
  }, [target, controls, duration]);
  

  return (
    <motion.div
      className="text-xl sm:text-[2.5rem] font-bold"
      animate={controls}
      initial={{ count: 0 }}
      onUpdate={(latest) => setCount(Math.floor(latest.count))}
    >
      {count}
      {suffix}
    </motion.div>
  );
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const teamRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "null");

  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const tab = searchParams.get("tab") || "vision";
    setActiveTab(tab);
  }, [searchParams]);


   useEffect(() => {
  const tab = query.get("tab");
  if (tab) {
    const element = document.getElementById(tab);
    if (element) {
      const yOffset = -100; // offset in pixels (negative means scroll up)
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
}, [location]);


//    useEffect(() => {
//   if (location.hash) {
//     const id = location.hash.substring(1); // Remove "#"
//     setActiveTab(id); // This ensures the correct section is rendered

//     // Delay scrolling to allow the section to render
//     setTimeout(() => {
//       const el = document.getElementById(id);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth" });
//       }
//     }, 300); // Slightly longer to ensure rendering
//   }
// }, [location]);

  return (
    <div className="bg-[#141414] flex flex-col mt-20 px-4 sm:px-6 overflow-hidden">
      {/* Hero Content */}
      <div
        ref={heroRef}
        className="relative h-[380px] sm:h-[480px] md:h-[580px] bg-white rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px] rounded-tr-[120px] sm:rounded-tr-[180px] md:rounded-tr-[280px] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-r from-white/70 via-white/20 to-transparent pointer-events-none" />

       <div className="absolute bottom-[1rem] sm:top-[7rem] left-4 sm:left-12 z-20 p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto">

          <div className="flex justify-between text-black text-sm sm:text-xl font-semibold w-full gap-2 sm:gap-[20px]">
            <div className="flex flex-col items-center w-1/3 sm:gap-[10px]">
              <CountUp target={35} />
              <div className="text-xs sm:text-xl font-normal text-black text-center" style={{ fontFamily: "Gothic" }}>
                Years of <br /> Experience
              </div>
            </div>
            <div className="border-l border-black/40 pl-2 sm:pl-6 flex flex-col items-center w-1/3 sm:gap-[10px]">
              <CountUp target={150} />
              <div className="text-xs sm:text-xl font-normal text-black text-center"style={{ fontFamily: "Gothic" }}>
                Contented <br /> Clients
              </div>
            </div>
            <div className="border-l border-black/40 pl-2 sm:pl-6 flex flex-col items-center w-1/3 sm:gap-[10px]">
              <CountUp target={500} />
              <div className="text-xs sm:text-xl font-normal text-black text-center"style={{ fontFamily: "Gothic" }}>
                Finished <br /> Projects
              </div>
            </div>
          </div>
        </div>

        <img
          src="/About_banner.webp"
          alt="Modern architecture"
          className="w-full h-full object-cover object-top z-0"
        />

        <div className="hidden sm:absolute sm:bottom-6 sm:right-3 sm:-translate-x-1/2 sm:z-20 sm:block">
        <button
         onClick={() => {
              document.getElementById('vision-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
         className="text-xl sm:text-3xl border border-black rounded-full text-black w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center cursor-pointer"
          aria-label="Scroll to vision section">
          ↓
        </button>
      </div>

      </div>

      {/* Tabs */}
      <div  className="w-full sm:w-[90%] mx-auto relative">

        {/* ↓ Mobile Arrow Above Tabs */}
          <div className="block sm:hidden w-full flex justify-center mt-6">
           <button
            onClick={() => {
              document.getElementById('vision-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xl border border-white rounded-full text-white w-10 h-10 flex justify-center items-center cursor-pointer"
            aria-label="Scroll to vision section"
          >
            ↓
          </button>

          </div>

        <div  className=" flex flex-wrap justify-between sm:justify-center gap-6 sm:gap-[10rem] text-[1rem] sm:text-[1.5rem] font-semibold border-b border-white mb-8 mt-6 sm:mt-16 text-white relative"  style={{ fontFamily: "FrieghtNeo" }}>
          {["vision", "team", "clients"].map((tab) => (
            <div
              key={tab}
              onClick={() => navigate(`/about?tab=${tab}`)}
              className="relative pb-2 cursor-pointer"
            >
              {tab === "vision" && "OUR VISION"}
              {tab === "team" && "OUR TEAM"}
              {tab === "clients" && "OUR CLIENTS"}
              <span
                className={`absolute -bottom-[2px] bg-white transition-all duration-300
                  ${
                    activeTab === tab
                      ? "w-full sm:w-[calc(100%+30px)] left-0 sm:left-[-8px] h-[4px] opacity-100"
                      : "w-full h-[0px] opacity-0 left-0"
                  }`}
              />

            </div>
          ))}
        </div>
      </div>

      {/* Vision Section */}
      {activeTab === "vision" && (
        <>
        <div id="vision"
           className="bg-[#141414] text-white px-2 sm:px-6 py-1 flex flex-col items-center text-center scroll-mt-[100px]"
          style={{ fontFamily: "FrieghtNeo" }}
        >
          <h2 className="text-md sm:text-[1.9rem] font-bold mb-8">
            ARCHITECTURE | INTERIORS | LANDSCAPE
          </h2>
          <p
            className="max-w-2xl sm:max-w-4xl text-sm sm:text-[1rem] leading-relaxed mb-10"
            style={{ fontFamily: "Gothic", wordSpacing: "0.05rem" }}
          >
            Since 1986, Dasnurkar Associates has been a trusted establishment that
            caters to a multitude of projects in Architectural Design, Interiors,
            Landscape, Sanctioning and Construction. Every space we design is
            sculpted with endless research, analysis, and teamwork. With over 35+
            years of experience and multidisciplinary expertise, we craft efficient,
            effective and eminent spaces. Our success is built on the solid
            foundation of leaders, each with unique experiences and knowledge.
          </p>

          <div className="text-3xl sm:text-5xl font-bold space-y-2 sm:space-y-3">
            <div>WE</div>
            <div>LEVEL UP</div>
            <div>ARCHITECTURE</div>
          </div>
          <div className="w-full">
          <TeamSection />
          </div>
        </div>
        </>
      )}

      {/* Team Section */}
      {activeTab === "team" && (
        <>
          <div
            id="team"
            ref={teamRef}
            className="bg-[#141414] text-white px-2 sm:px-6 pb-4 text-center relative overflow-hidden " 
          >
            <div className="flex items-center justify-center h-[150px] sm:h-[50px]">
              <p
                className="max-w-2xl sm:max-w-4xl text-sm sm:text-[1rem] leading-relaxed"
                style={{ fontFamily: "Gothic", wordSpacing: "0.05rem" }}
              >
                At Dasnurkar Associates, we have a strong team with distinctive skills and experiences.
                Our Management, Architecture, Sanctioning, Engineering, Admin and Support teams are
                proficiently led by resourceful leaders.
              </p>
            </div>

            <div className="w-full flex justify-center mt-4">
              <img
                src="/group.webp"
                alt="Dasnurkar Associates Team"
                className="w-full max-w-4xl sm:max-w-7xl object-cover rounded-lg shadow-lg mt-4"
              />
            </div>
          </div>

          <ArchitectureSlider />

          <WorkspaceGallery />
        </>
            
      )}

      {/* Clients Section */}
      {activeTab === "clients" && (
        <div id="clients" className="bg-[#141414] text-white px-2 sm:px-6 py-2 text-center">
          <p className="max-w-2xl sm:max-w-3xl mx-auto text-sm sm:text-[1rem] mb-10 font-[Gothic]">
            Our diverse range of esteemed clientele includes renowned people, companies, and brands. Together, we create spaces that lead in the industry and endure value for their owners and communities.
          </p>

          <div className="p-6 sm:p-10 bg-white max-w-6xl mx-auto">
            <div className="grid grid-cols-3 sm:flex flex-wrap gap-4 sm:gap-[30px] justify-center items-center">
              {[
                "Nyati-Colour-Logo-1.webp", "PanditJBlack-and-white.webp", "bharati-vidyapeeth-deemed-university-pune-e1729319369984.png",
                "kundan.png", "Belvalkar-Colour-Logo.webp", "Columbia_Asia_Logo-2048x1448.jpg", "Regency-Group-Colour-Logo.webp", "Corianthisis-Logo-e1728502870996.webp",
                "medium-e1728642558246.avif", "PRM.png", "suryadatta.jpeg", "Caelum-high-school-logo-e1728502922632.jpeg", "Deshpande-Logo-e1729322041787.webp", "SR-Cons-Logo.webp", "Bagad-Colour-Logo.webp",
                "Sancheti-Colour-Logo.webp", "Mhada-Logo.webp", "Shri-Balaji-University-Colour-Logo.webp", "Diamond-water-park-logo.webp", "RC.png", "Vishal-group-Colour-logo.webp",
                "Le-meridian-Logo.webp", "Weikfield-Logo.webp", "Unitee-Logo.webp", "truway.png", "Nancy-Hill-View-Colour-Logo.webp", "Tathastu-Colour-Logo.webp", "Delhi-public-school-Logo.webp",
                "Aquatech-Colour-Logo.webp", "Shaswat-Logo.webp", "Qua-Colour-logo.webp", "Sanskar-Pratishthan-1.webp", "Melzer-Colour-Logo.webp", "VidyashilpLogo-1.webp"
              ].map((logo, index) => (
                <div key={index} className="flex justify-center items-center w-full sm:w-[14%]">
                  <img
                    src={`/clients/${logo.trim()}`}
                    alt={`Client ${index + 1}`}
                    className="h-[70px] sm:h-[130px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Scroll to Top Button */}
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
  );
}
