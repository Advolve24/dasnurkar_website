import React, { useState } from "react";
import { RiPhoneFill } from "react-icons/ri";
import { TiMail , TiLocation  } from "react-icons/ti";
import { BiLogoTelegram } from "react-icons/bi";
import EnquiryPopup from "./EnquiryPopup";



export default function Footer() {
   const [isPopupOpen, setIsPopupOpen] = useState(false);


  return (
    <div className="relative mt-20">

      {/* Popup rendered here only if triggered */}
      <EnquiryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      {/* Top gray section */}
      <div className="bg-[#2b2b2b] h-[150px] w-full"></div>

      {/* Bottom black section (footer content container) */}
      <footer className="bg-[#212121] text-white text-sm rounded-t-3xl w-full sm:max-w-7xl max-w-[20rem] mx-auto relative -mt-20 z-10 shadow-2xl">

        <div>

          {/* Top Section */}
          <div className="flex flex-col sm:flex-row">
            {/* Left Logo Section */}
           <div className="w-full sm:w-[23%] pl-[2.3rem] pr-[2rem] pt-[2rem] border-b border-white/50 sm:border-b-0 sm:border-r mb-0 sm:mb-0">
                {/* Desktop Logo */}
                 <a href="/"><img src="/Group-131407.svg" alt="Dasnurkar-logo" className="h-[200px] hidden sm:block" /></a>

                {/* Mobile Logo Centered */}
                <div className="sm:hidden flex justify-center items-center w-full pb-4">
                  <a href="/"><img src="/Group-131437.svg" alt="Dasnurkar-logo" className="h-[130px]" /></a>
                </div>
              </div>


            {/* Right Section: Links and Social */}
            <div className="sm:w-[77%] flex flex-col justify-between pt-0 sm:pt-[2rem]" style={{ fontFamily: "Gothic" }}>
              {/* Links */}
              <div className="flex flex-col sm:flex-row justify-between p-1 mb-0 sm:mb-6 sm:gap-6 text-[1rem] text-gray-200 mt-0  pr-[1rem] sm:pr-[2rem] border-white/50 border-b sm:border-none pb-2 pl-[1rem]">
  {/* Navigation Section - Hidden on mobile */}
              <div className="hidden sm:flex flex-row w-[30%] justify-between pl-[2rem]">
                <div className="flex flex-col gap-[25px]">
                  <a href="/" className="hover:text-white">Home</a>
                  <a href="/about" className="hover:text-white">About</a>
                  <a href="/projectcategoryslider" className="hover:text-white">Projects</a>
                  <a href="/our-expertise" className="hover:text-white">Expertise</a>
                </div>
                <div className="flex flex-col gap-[25px] pl-[2rem]"> 
                  <a href="/about?tab=clients" className="hover:text-white">Clients</a>
                  <a href="/blog" className="hover:text-white">Blog</a>
                  <a href="/contact" className="hover:text-white">Contact</a>
                </div>
              </div>

              {/* Social + Enquire Row: stack in sm view, row in mobile */}
              <div className="flex flex-col sm:flex-col  sm:items-end text-[0.88rem]">
                {/* One row only on mobile */}
                <div className="flex justify-between items-center sm:flex-col sm:items-end gap-[90px] w-full sm:w-auto">
                  <div className="flex gap-6 text-lg">
                    <a href="https://www.facebook.com/dasnurkarassociates/?_rdr"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/dasnurkar_associates/?hl=en"><i className="fab fa-instagram"></i></a>
                    <a href="https://in.linkedin.com/company/dasnurkar-associates"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                  <button
                      onClick={() => setIsPopupOpen(true)}
                      className="text-white flex items-center gap-2 hover:text-white whitespace-nowrap"
                    >
                     
                      <BiLogoTelegram /> Enquire Now
                    </button>
                </div>
              </div>
            </div>

             
             {/* Bottom Contact Info with full-width top border */}
              <div className="w-full">
                {/* Full-width border at the top of this section */}
               <div className="hidden sm:block border-t border-white/50 w-full"></div>


                {/* Inner content of the bottom footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full py-3  px-0 sm:px-2 text-xs text-gray-400 ">
                  {/* Contact Info */}
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-[10px] text-sm text-gray-300 text-[0.85rem] border-b-2 border-white/50 sm:border-b-0">
                   <div className="flex items-center gap-1 pl-4 sm:pl-0">
                    <span className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[1.5px] border-white text-white text-[0.8rem]">
                       <a href="tel:+912024530461">
                      <RiPhoneFill />
                      </a>
                    </span>
                    <a href="tel:+912024530461" className="text-white">
                      +91 20 2453 0461 /62/ 63
                    </a>
                  </div>

                  <div className="flex items-center gap-1 text-[0.85rem] pl-4 sm:pl-0">
                    <span className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[1.5px] border-white text-white text-[1.1rem]">
                      <a href="mailto:info@dasnurkar.in">
                      <TiMail />
                      </a>
                    </span>
                    <a href="mailto:info@dasnurkar.in" className="text-white">
                      info@dasnurkar.in
                    </a>
                  </div>

                    <div className="flex items-center gap-1 text-[0.85rem] pl-4 pb-4 sm:pb-0 sm:pl-0">
                        <span className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[1.5px] border-white text-white text-[0.8rem]">
                          <a
                          href="https://www.google.com/maps/place/Laxmi+Park+Colony,+Sadashiv+Peth,+Pune,+Maharashtra+411030/@18.503734,73.843751,16z/data=!4m6!3m5!1s0x3bc2c00ae932e4b7:0xf60b5da3df763ba0!8m2!3d18.5035416!4d73.8441118!16s%2Fg%2F1wn_4kbw?hl=en&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer">
                          <TiLocation />
                          </a>
                        </span>
                        <a
                          href="https://www.google.com/maps/place/Laxmi+Park+Colony,+Sadashiv+Peth,+Pune,+Maharashtra+411030/@18.503734,73.843751,16z/data=!4m6!3m5!1s0x3bc2c00ae932e4b7:0xf60b5da3df763ba0!8m2!3d18.5035416!4d73.8441118!16s%2Fg%2F1wn_4kbw?hl=en&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          35, LAXMI PARK, NAVI PETH, PUNE 30
                        </a>
                      </div>

                  </div>

                  {/* Copyright */}
                  <div className="mt-4 sm:mt-0 text-white pl-4 sm:pl-[2rem]">
                    Powered by ADVOLVE | All Rights Reserved 2024
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
