import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { IoMdShare } from "react-icons/io";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import "yet-another-react-lightbox/styles.css";

const WorkspaceGallery = () => {
  const workspaceImages = [
    "./workspace/Office-Interior-1-1.webp",
    "./workspace/03.webp",
    "./workspace/04-scaled.jpg",
    "./workspace/05.webp",
    "./workspace/06.webp",
    "./workspace/07.webp",
    "./workspace/08-A.webp",
    "./workspace/09.webp",
    "./workspace/10.webp",
    "./workspace/12-1-e1729676779845.webp",
    "./workspace/13.webp",
    "./workspace/14.webp",
    "./workspace/15.webp",
    "./workspace/Office-Interior-2-1.webp",
    "./workspace/Office-Interior-3.webp",
    "./workspace/Office-Interior-4-1.webp",
    "./workspace/Office-Interior-4.webp",
    "./workspace/Office-Interior-5.webp",
    "./workspace/Office-Interior-6.webp",
    "./workspace/Office-Interior-7.webp",
    "./workspace/Office-Interior-8.webp",
    "./workspace/Office-Interior-9.webp",
    "./workspace/Office-Interior-10.webp"
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleViewChange = ({ index }) => {
    setCurrentIndex(index);
    setZoomed(false);
    setPosition({ x: 50, y: 50 });
  };

  return (
    <div className="bg-[#141414] text-white px-4 sm:px-6 sm:py-16 py-4 text-center">
      <div className="w-screen h-[100px] bg-[#2d2c2c] flex justify-center items-center text-[1.5rem] sm:text-[2rem] font-bold mb-6 -mx-14" style={{ fontFamily: "FrieghtNeo" }}>
            OUR WORKSPACE
            </div>

      <p className="max-w-4xl mx-auto text-[0.85rem] sm:text-[1rem] leading-relaxed mb-6" style={{ fontFamily: "Gothic", wordSpacing: "0.05rem" }}>
        Our well-equipped and curated office space is a vault of creative ideations.
        Dasnurkar Associates’ approach to Innovation and Elegance is reflected in the workspace.
        It is well-connected and surrounded by peace and nature. A concept prospers to brilliance
        in such conducive environments.
      </p>

      {/* Masonry Grid */}
      <div className="columns-2 sm:columns-2 md:columns-3 gap-4 space-y-4 -mx-4">
        {workspaceImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Office ${index + 1}`}
            className="w-full rounded-lg shadow-lg mb-4 break-inside-avoid cursor-pointer "
            onClick={() => {
              setCurrentIndex(index);
              setLightboxOpen(true);
            }}
          />
        ))}
        
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
          setPosition({ x: 50, y: 50 });
          setZoomed(false);
        }}
        index={currentIndex}
        on={{ view: handleViewChange }}
        slides={workspaceImages.map((img) => ({ src: img }))}
        render={{
          slide: ({ slide }) => (
            <div
              className="light-image relative w-full h-[600px] max-w-[900px] mx-auto flex items-center justify-center overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              {/* Controls */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 z-50 text-white">
                <div className="bg-black bg-opacity-30 px-3 py-1 rounded text-sm">
                  {currentIndex + 1} / {workspaceImages.length}
                </div>
                <div className="flex gap-4 bg-black bg-opacity-60 px-3 py-1 rounded text-lg items-center">
                  <button
                    title="Share"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: "Dasnurkar Workspace", url: slide.src });
                      } else {
                        navigator.clipboard.writeText(slide.src);
                        alert("Image link copied to clipboard!");
                      }
                    }}
                    className="hover:text-gray-400 transition"
                  >
                    <IoMdShare className="text-xl" />
                  </button>
                  <button
                    title={zoomed ? "Zoom Out" : "Zoom In"}
                    onClick={() => setZoomed(!zoomed)}
                    className="hover:text-gray-400 transition"
                  >
                    {zoomed ? <BsZoomOut className="text-xl" /> : <BsZoomIn className="text-xl" />}
                  </button>
                </div>
              </div>

              {/* Zoomable Image */}
              <img
                src={slide.src}
                alt={`Workspace ${currentIndex + 1}`}
                className={`transition-transform duration-300 ease-in-out ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                style={{
                  transform: zoomed ? `scale(2)` : "scale(1)",
                  transformOrigin: `${position.x}% ${position.y}%`,
                }}
                onClick={() => setZoomed(!zoomed)}
              />
            </div>
          ),
        }}
      />
    </div>
  );
};

export default WorkspaceGallery;
