import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const categories = [
  'ALL', 'RESIDENTIAL', 'COMMERCIAL', 'INTERIORS', 'LANDSCAPE', 'EDUCATIONAL', 'OTHERS',
];
 const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/projects';
export default function ProjectGallery() {
 
  const { category } = useParams();
  const navigate = useNavigate();

  const selectedCategory = category ? category.toUpperCase() : 'ALL';
  const [selectedScale, setSelectedScale] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const isResidential = selectedCategory === 'RESIDENTIAL';

  // Ref to store category tab buttons
  const tabRefs = useRef({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/projects?title=${selectedCategory}`);
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  // Scroll active tab into view on mobile/tablet
  useEffect(() => {
    if (window.innerWidth <= 788) {
      const activeTab = tabRefs.current[selectedCategory];
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedCategory]);

  const filteredProjects = isResidential && selectedScale
    ? projects.filter((project) => project.scale === selectedScale)
    : projects;

  return (
    <div
      className="text-white mt-10 px-6 py-8 project-body "
      style={{ backgroundColor: '#141414', fontFamily: 'FrieghtNeo', letterSpacing: '0.05rem' }}
    >
      {/* Category Tabs */}
      <div className="flex gap-[35px] overflow-x-auto no-scrollbar text-[1.38rem] font-medium border-b border-gray-700 mb-9 mt-5 project-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            ref={el => (tabRefs.current[cat] = el)}  // Assign ref here
            onClick={() => {
              navigate(`/projectgallery/${cat.toLowerCase()}`);
              setSelectedScale(null);
            }}
            className={`pb-2 ${
              selectedCategory === cat
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scale Filter - only for RESIDENTIAL */}
      {isResidential && (
        <div className="flex gap-[20px] text-[1.1rem] font-normal text-gray-500 mb-9 mt-5 uppercase scale-filter">
          {['LARGE', 'MEDIUM', 'SMALL'].map((scale) => (
            <span
              key={scale}
              onClick={() => setSelectedScale((prev) => (prev === scale ? null : scale))}
              className={`cursor-pointer hover:text-white ${
                selectedScale === scale ? 'text-white' : ''
              }`}
            >
              {scale.toLowerCase()} scale
            </span>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center mt-20 text-gray-400">Loading projects...</div>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-3 gap-6 project-grid">
          {filteredProjects.length === 0 ? (
            <div className="text-gray-500 col-span-full text-center mt-10">
              No projects found for selected filters.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Link key={project._id} to={`/project/${project._id}`} className="break-inside-avoid mb-6 block">
                <div className="relative group rounded-lg overflow-hidden shadow-lg bg-gray-900 project-card">
                  <div className="relative w-full h-[230px] sm:h-auto md:h-auto">
                    <img
                      src={project.mainImage || 'https://via.placeholder.com/500'}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent"></div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white bg-opacity-30 backdrop-blur-xs rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-4 md:h-8 md:w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black bg-opacity-70 backdrop-blur-xs p-2 md:p-4  project-footer-text">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0">
                        <div className="w-full md:w-[50%] text-white text-[0.9rem] sm:text-[1.2rem] font-semibold md:mb-0">
                          {project.name}
                        </div>
                        <div className="w-full md:w-[50%] text-[0.9rem] sm:text-[1.2rem] text-white text-left md:text-right">
                          {project.location}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
