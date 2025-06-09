import { useParams, useNavigate } from 'react-router-dom';  
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { IoMdShare } from "react-icons/io";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import Masonry from 'react-masonry-css';
import { PiArrowCircleLeftThin } from "react-icons/pi";

export default function ProjectDetail() {
   const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/projects';
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error loading project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-20">Loading project...</div>;
  if (!project) return <div className="text-white text-center mt-20">Project not found.</div>;

  const cat = project.title.toUpperCase();

  const handleMouseMove = (e) => {
    if (!zoomed) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setPosition({ x, y });
  };

  const handleViewChange = ({ index }) => {
    setCurrentIndex(index);
    setPosition({ x: 50, y: 50 });
    setZoomed(false);
  };

  return (
    <div className="p-3 sm:p-6 text-white mt-16" style={{ backgroundColor: '#141414', fontFamily: 'FrieghtNeo' }}>
      
      {/* Header */}
      <div className="project-header flex flex-col md:flex-row md:items-center border-t border-gray-300 justify-between text-sm py-2 sm:py-8 mb-2 gap-4 md:gap-0">
  {/* Left Side: Back Button + Project Name */}
  <div className="flex items-center space-x-4 w-full md:w-auto border-b md:border-b-0 border-gray-300 pb-2 md:pb-0">
    <button
      onClick={() => navigate(`/projectgallery/${cat.toLowerCase()}`)}
      className=""
    >
     <img
  src="/arrow-svg.svg"
  alt="Next Arrow"
  className="w-10 h-10 sm:w-12 rotate-180 sm:ml-2"
/>

    </button>
    <div className="project-name text-xl md:text-[1.8rem] font-medium p-2">{project.name}</div>
  </div>

  {/* Info Blocks */}
  <div className="info-blocks flex flex-col md:flex-row items-start md:items-center w-full md:w-auto text-white text-base md:text-[1.1rem] gap-4 md:gap-0" style={{ fontFamily: "Gothic" }}>
    
    {/* Client */}
    <div className="flex flex-row items-center w-full md:w-auto justify-start md:justify-between md:border-l md:border-r border-gray-300 md:px-5">
      <div className="flex flex-row justify-between w-full md:gap-3">
        <div className="font-semibold min-w-[60px] text-[1rem] sm:text-[1.1rem]">CLIENT</div>
        <div className=" text-[0.9rem] sm:text-[1rem]">{project.client}</div>
      </div>
    </div>

    {/* Location */}
    <div className="flex flex-row items-center w-full md:w-auto justify-start md:justify-between md:px-2">
      <div className="flex flex-row justify-between w-full md:gap-3">
        <div className="font-semibold min-w-[60px] text-[1rem] sm:text-[1.1rem]">LOCATION</div>
        <div className=" text-[0.9rem] sm:text-[1rem]">{project.location}</div>
      </div>
    </div>

    {/* Size */}
    <div className="flex flex-row items-center w-full md:w-auto justify-start md:justify-between md:border-l border-gray-300 md:px-5">
      <div className="flex flex-row justify-between w-full md:gap-3">
        <div className="font-semibold min-w-[60px] text-[1rem] sm:text-[1.1rem]">SIZE</div>
        <div className=" text-[0.9rem] sm:text-[1rem]">{project.size}</div>
      </div>
    </div>
   
  </div>
</div>


      {/* Masonry Image Grid */}
<Masonry
  breakpointCols={{ default: 3, 1100: 2, 700: 2 }}
  className="flex w-auto -ml-2" // reduced from -ml-6
  columnClassName="pl-2 sm:pl-6 bg-clip-padding" // reduced from pl-6
>
  {project.subImages?.map((img, index) => (
    <div
      key={index}
      className="mb-3 sm:mb-6 group cursor-pointer relative" // reduced from mb-6
      onClick={() => {
        setCurrentIndex(index);
        setPosition({ x: 50, y: 50 });
        setLightboxOpen(true);
        setZoomed(false);
      }}
    >
      <img
        src={img}
        alt={`Project ${index + 1}`}
        className="w-full rounded-lg shadow-md object-cover transition duration-300"
      />
      <div className="absolute inset-0 bg-[#141414] bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg" />
    </div>
  ))}
</Masonry>


      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
          setPosition({ x: 50, y: 50 });
          setZoomed(false);
        }}
        index={currentIndex}
        on={{
          view: handleViewChange,
        }}
        slides={project.subImages.map((img) => ({ src: img }))}
        render={{
          slide: ({ slide }) => (
            <div
              className="light-image relative w-full h-[600px] max-w-[900px] mx-auto flex items-center justify-center overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              {/* Top Controls */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 z-50 text-white">
                <div className="bg-black bg-opacity-30 px-3 py-1 rounded text-sm">
                  {currentIndex + 1} / {project.subImages.length}
                </div>

                <div className="flex gap-4 bg-black bg-opacity-60 px-3 py-1 rounded text-lg items-center">
                  <button
                    title="Share"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: project.name, url: slide.src });
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

              {/* Image */}
              <img
                src={slide.src}
                alt={`Project ${currentIndex + 1}`}
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
}
