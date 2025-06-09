import React from "react";
import { PiArrowCircleRightThin } from "react-icons/pi";



export default function ExpertiseMenu() {
  return (
    <div className="flex flex-col space-y-1 sidebar-content">
      {/* Header inside project menu */}
      <div
        className="flex justify-between items-center text-[1.15rem] font-medium text-gray-900 mb-4 border-b pb-4 "
        style={{ fontFamily: "FrieghtNeo" }}
      >
        <span><a href="/our-expertise">Browse All Services</a></span>
       <a href="/our-expertise">
                <button className=" text-black">
                 <PiArrowCircleRightThin className="text-[2.5rem]" />
                </button>
              </a>
      </div>


      {/* Category Cards */}
      <div className="p-1 space-y-6 flex-grow overflow-y-auto">
        {/*ARCHITECTURAL DESIGN  */}
        <div className="flex flex-col items-center justify-between border-b pb-4">
        <div className="">
            <div className="flex flex-row justify-center text-lg text-[1.15rem] text-center text-black p-2 mobile-side-title"  style={{ fontFamily: "FrieghtNeo" }}><a href="/our-expertise?tab=architectural-design">ARCHITECTURAL DESIGN</a></div>
            <div className="flex items-center text-[0.88rem] text-center mobile-side-desc slide-up" style={{ fontFamily: "Gothic" }}>
            <div className="flex flex-row items-center px-2 text-md text-black">Spatially efficient and user-optimised designs</div>
              </div>
        </div>
       </div>

        {/*SANCTIONING */}
        <div className="flex flex-col items-center justify-between border-b pb-4">
        <div className="">
            <div className="flex flex-row justify-center text-lg text-[1.15rem] text-center text-black p-2"  style={{ fontFamily: "FrieghtNeo" }}><a href="/our-expertise?tab=sanctioning">SANCTIONING</a></div>
            <div className="flex items-center text-[0.88rem] text-center slide-up" style={{ fontFamily: "Gothic" }}>
              <div className="flex flex-row items-center px-2 text-md text-black">Precise legal and documentation services</div>
              </div>
        </div>
       </div>

        {/* INTERIOR DESIGN */}
        <div className="flex flex-col items-center justify-between border-b pb-4 ">
        <div className="">
            <div className="flex flex-row justify-center text-lg text-[1.15rem] text-center text-black p-2"  style={{ fontFamily: "FrieghtNeo" }}><a href="/our-expertise?tab=interior-design">INTERIOR DESIGN</a></div>
            <div className="flex items-center text-[0.88rem] text-center slide-up" style={{ fontFamily: "Gothic" }}>
             <div className="flex flex-row items-center px-2 text-md text-black">Trend Setting yet human-centric spaces</div>
              </div>
        </div>
       </div>

       {/* LANDSCAPE ARCHITECTURE */}
        <div className="flex flex-col items-center justify-between border-b pb-4 ">
        <div className="">
            <div className="flex flex-row justify-center text-lg text-[1.15rem] text-center text-black p-2"  style={{ fontFamily: "FrieghtNeo" }}><a href="/our-expertise?tab=landscape-architecture">LANDSCAPE ARCHITECTURE</a></div>
            <div className="flex items-center text-[0.88rem] text-center slide-up" style={{ fontFamily: "Gothic" }}>
             <div className="flex flex-row items-center px-2 text-md text-black">Bridging culture and ecology with <br />technology</div>
              </div>
        </div>
       </div>

      </div>
      
    </div>
  );
}
