import React from "react";
import { Link } from "react-router-dom";
import ProjectCategorySlider from "./ProjectCategorySlider"; // only needed if used directly, safe to keep
import { PiArrowCircleRightThin } from "react-icons/pi";

export default function ProjectMenu({ onLinkClick }) {
  const categories = [
    {
      title: "RESIDENTIAL",
      desc: "Experience comfort and class",
      img: "/Regency-Astra-1.webp",
    },
    {
      title: "COMMERCIAL",
      desc: "Witness to your success story",
      img: "/Nyati-Unitree-1.webp",
    },
    {
      title: "INTERIORS",
      desc: "Art of crafting idyllic spaces",
      img: "/interior-img-e1730015643813.webp",
    },
    {
      title: "LANDSCAPE",
      desc: "Uniting Nature and Technology",
      img: "/landscape-img.webp",
    },
    {
      title: "EDUCATIONAL",
      desc: "Spaces that inspire learning",
      img: "/Suryadatta-Institute-Campus-1.webp",
    },
    {
      title: "OTHERS",
      desc: "More of our creative potential",
      img: "/Swastik-1.webp",
    },
  ];

  return (
    <div className="flex flex-col space-y-2 sidebar-content">
      {/* Header */}
      <div
        className="flex justify-between items-center text-[1.15rem] font-medium text-black border-b pb-4"
        style={{ fontFamily: "FrieghtNeo" }}
      >
       <span> <a href="/projectcategoryslider">Browse all Categories</a></span>
        <a href="/projectcategoryslider">
          <button className=" text-black">
           <PiArrowCircleRightThin className="text-[2.5rem]" />
          </button>
        </a>
      </div>

      {/* Category List */}
      {categories.map((item, index) => (
        <a
          key={item.title}
          href={`/projectgallery/${item.title.toLowerCase()}`}
          onClick={onLinkClick}
          className="flex items-center gap-5 border-b pb-6 w-full pt-4"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            className="w-[48%] h-28 bg-cover bg-center rounded-md mobile-side-img"
            style={{ backgroundImage: `url('${item.img}')` }}
          ></div>
          <div className="w-[48%]">
            <h3
              className="text-[1.2rem] font-medium text-center text-gray-900 mobile-side-title"
              style={{ fontFamily: "FrieghtNeo", letterSpacing: "0.05rem" }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm text-black text-center mobile-side-desc slide-up"
              style={{
                fontFamily: "Gothic",
                animationDelay: index * 0.2 + "s",
              }}
            >
              {item.desc}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
