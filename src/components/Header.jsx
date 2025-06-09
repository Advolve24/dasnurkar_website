import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ProjectMenu from "./ProjectMenu";
import AboutMenu from "./AboutMenu";
import ExpertiseMenu from "./ExpertiseMenu";
import EnquiryPopup from "./EnquiryPopup";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shouldRenderSidebar, setShouldRenderSidebar] = useState(false);
  const [openMenu, setOpenMenu] = useState("projects");
  const sidebarRef = useRef();

  const transitionDuration = 800; // Slow & smooth

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => setShouldRenderSidebar(false), transitionDuration);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const openSidebar = () => {
    setShouldRenderSidebar(true);
    setTimeout(() => setSidebarOpen(true), 50); // Delay to let mount apply smoothly
  };

  const handleMenuClick = (menu) => {
    if (openMenu !== menu) {
      setOpenMenu(menu);
    }
  };

  return (
    <>
      <EnquiryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-transparent px-8 py-6 flex justify-between items-center header">
        <img
          src="/Group-131390.png"
          alt="MySite Logo"
          className="h-11 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={openSidebar}
          aria-label="Open menu"
          className="text-4xl text-white focus:outline-none"
        >
          <RxHamburgerMenu />
        </button>
      </header>

      {/* Overlay */}
      {shouldRenderSidebar && (
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity duration-700 ${
            sidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Sidebar */}
      {shouldRenderSidebar && (
        <aside
          ref={sidebarRef}
          className={`mobile-sidebar fixed top-0 right-0 h-full w-full sm:w-[390px] bg-white z-50 shadow-lg flex flex-col transform transition-all duration-700 ease-in-out ${
            sidebarOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{ transitionProperty: "transform, opacity" }}
        >
          {/* Tabs */}
          <div
            className="flex justify-around text-[1.2rem] font-medium text-gray-800 bg-white flex-shrink-0 sticky top-0 z-10 shadow-lg p-1"
            style={{ fontFamily: "FrieghtNeo", letterSpacing: "0.05rem" }}
          >
            {["projects", "about", "expertise"].map((menu) => (
              <button
                key={menu}
                onClick={() => handleMenuClick(menu)}
                className={`py-3 w-full capitalize ${
                  openMenu === menu ? "font-bold" : "font-normal"
                }`}
              >
                {menu}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-4" data-lenis-prevent>
            {openMenu === "projects" && <ProjectMenu />}
            {openMenu === "about" && <AboutMenu />}
            {openMenu === "expertise" && <ExpertiseMenu />}
          </div>

          {/* Footer */}
          <footer className="px-4 py-3 flex-shrink-0 bg-white text-[1.15rem]">
            <div
              className="flex flex-col sm:flex-row items-center text-black mb-4 border-b border-t border-gray-700 p-1 justify-between mobile-side-footer"
              style={{ fontFamily: "FrieghtNeo", letterSpacing: "0.05rem" }}
            >
              <div className="w-[50%] h-[30px] flex flex-row items-center justify-between border-r border-gray-600">
                <div>
                  <a href="/blog">Blog</a>
                </div>
                <div className="" style={{ paddingRight: "40px" }}>
                  <a href="/contact">Contact</a>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="flex items-center gap-2 text-black p-1"
                >
                  <img
                    src="/telegram-24.png"
                    alt="Telegram Icon"
                    className="w-5 h-5 object-contain"
                  />
                  <span>Enquire Now</span>
                </button>
              </div>
            </div>
            <div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-black text-[0.7rem] gap-2"
              style={{ fontFamily: "Gothic" }}
            >
              <span>Powered by ADVOLVE | All Rights Reserved 2024</span>
              <div className="flex gap-3 text-lg">
                <a href="https://www.facebook.com/dasnurkarassociates/?_rdr">
                  <i className="fab fa-facebook" />
                </a>
                <a href="https://www.instagram.com/dasnurkar_associates/?hl=en">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="https://in.linkedin.com/company/dasnurkar-associates">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </footer>
        </aside>
      )}
    </>
  );
}
