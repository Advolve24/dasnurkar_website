import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectGallery from "./pages/ProjectGallery";
import ProjectDetail from "./pages/ProjectDetail";
import HeroSection from "./pages/About";
import ProjectCategorySlider from "./components/ProjectCategorySlider";
import OurExpertise from "./pages/OurExpertise";
import ContactSection from "./pages/Contact";
import BlogDetail from "./components/BlogDetail";
import TeamSection from "./components/TeamSection";
import BlogList from "./pages/BlogList";
import Home from "./pages/Home";

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  const hideFooterRoutes = ["/projectcategoryslider", "/"];
  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  const noPaddingRoutes = ["/projectcategoryslider"];
  const shouldRemovePadding = noPaddingRoutes.includes(pathname);

  return (
    <>
      <Header />

      {pathname === "/" ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <main
          className={`${shouldRemovePadding ? "" : "p-2"}`}
          style={{ backgroundColor: "#141414" }}
        >
          <Routes>
            <Route path="/about" element={<HeroSection />} />
            <Route path="/projectgallery/:category" element={<ProjectGallery />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/projectcategoryslider" element={<ProjectCategorySlider />} />
            <Route path="/our-expertise" element={<OurExpertise />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/team-section" element={<TeamSection />} />
            <Route path="/blog" element={<BlogList />} />
          </Routes>
        </main>
      )}

      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
