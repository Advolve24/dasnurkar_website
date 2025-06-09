import React from "react";
import { Link } from "react-router-dom";
import { PiArrowCircleRightThin } from "react-icons/pi";

export default function AboutMenu() {
  return (
    <div className="flex flex-col space-y-1 sidebar-content">
      {/* Header inside project menu */}
      <div
        className="flex justify-between items-center text-[1.15rem] font-medium text-gray-900 mb-4 border-b pb-4 "
        style={{ fontFamily: "FrieghtNeo" }}
      >
        <span><a href="/about">Know More About Us</a></span>
         <a href="/about">
          <button className=" text-black">
           <PiArrowCircleRightThin className="text-[2.5rem]" />
          </button>
        </a>
      </div>


      {/* Category Cards */}
      <div className="p-1 space-y-6 flex-grow overflow-y-auto">
        {/* Our Vision */}
        <div className="flex flex-col items-center justify-between border-b pb-8 slide-up ">
        <div className="">
            <div className="flex flex-row justify-center text-lg text-[1.15rem] text-center text-black p-2 mobile-side-title"  style={{ fontFamily: "FrieghtNeo" }}><a href="/about?tab=vision">
            OUR VISION
          </a></div>
            <div className="flex items-center text-[0.88rem] mobile-side-desc text-center" style={{ fontFamily: "Gothic" }}>
            <div className="flex flex-row items-center  border-r border-gray-600 px-2 text-md text-black">Efficiency</div>
             <div className="flex flex-row items-center border-r border-gray-600 px-2 text-md text-black">Elegance</div>
              <div className="flex flex-row items-center px-2 text-md text-black">Excellence</div>
              </div>
        </div>
       </div>

        {/* Our Team */}
        <div className="flex flex-col items-center justify-between border-b pb-8 slide-up">
        <div className="">
            <div className="flex flex-row justify-center text-lg text-[1.15rem] text-center text-black p-2 mobile-side-title"  style={{ fontFamily: "FrieghtNeo" }}><a href="/about?tab=team">
            OUR TEAM
          </a></div>
            <div className="flex items-center text-[0.88rem] mobile-side-desc text-center" style={{ fontFamily: "Gothic" }}>
              <div className="flex flex-row items-center px-2 text-md text-center text-black">Masters Of Space and Structures</div>
              </div>
        </div>
       </div>

        {/* Our Clients */}
        <div className="flex flex-col items-center justify-between slide-up ">
        <div className="">
            <div className="flex flex-row justify-center text-lg text-[1.15rem] text-center text-black p-2 mobile-side-title"  style={{ fontFamily: "FrieghtNeo" }}><a href="/about?tab=clients">
            OUR CLIENTS
          </a></div>
            <div className="flex items-center text-[0.88rem] mobile-side-desc" style={{ fontFamily: "Gothic" }}>
             <div className="flex flex-row items-center px-2 text-md text-center text-black">Our Partners in Success</div>
              </div>
        </div>
       </div>

      </div>
      
    </div>
  );
}