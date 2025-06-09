import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamSlides = [
 {
    title: "Architecture",
    subtitle: "Team",
    text: "Dynamic individuals with a creative flair reinforced with technical proficiency form our design teams.They master the skill of balancing client requirements, aesthetic appeal, structural recommendations, and building services.The team works closely with a network of professionals, from engineers to urban planners, to ensure a seamless design and construction process.With a focus on sustainability and innovation, they create spaces that not only meet today’s needs but also anticipate future challenges.",
    image: "/Architecture team.jpeg",
  },
   {
    title: "Architecture",
    subtitle: "Team",
    text: "Dynamic individuals with a creative flair reinforced with technical proficiency form our design teams.They master the skill of balancing client requirements, aesthetic appeal, structural recommendations, and building services.The team works closely with a network of professionals, from engineers to urban planners, to ensure a seamless design and construction process.With a focus on sustainability and innovation, they create spaces that not only meet today’s needs but also anticipate future challenges.",
    image: "/Architecture team1.jpeg",
  },
  {
    title: "Sanctioning",
    subtitle: "Team",
    text: "At Dasnurkar Associates, we have a strong team of sanctioning experts that play a  vital role in navigating the complex approval processes required for project completion. They work out all legalities, paperwork, authorizations, and clearance for advancing development. By meticulously preparing and submitting documentation, addressing regulatory feedback, and securing approvals, the sanctioning team helps avoid project delays and ensures that architectural designs are executed within legal parameters.",
    image: "/Sanctioning team.jpeg",
  },
  {
    title: "Engineering",
    subtitle: "Team",
    text: "Our engineering team plays a critical role in turning design concepts into structurally sound realities. Expert engineers, in collaboration with other teams, design structural systems that ensure stability, longevity and compliance with design regulations. They focus on the technical aspects of each project, while integrating innovative solutions to optimise performance and sustainability. Working in tandem with architects, the engineering team brings a deep understanding of materials, construction techniques, etc. ensuring project durability and performance.",
    image: "/engineering team.jpeg",
  },
   {
    title: "Admin",
    subtitle: "Team",
    text: "Our competent Admin team serves as the operational core, maintaining order and functions as the organisational hub. They handle office operations, client communication, project support, financial management and document control and filing, which ensures the operations of all other teams, remains uncompromised. Their contribution is essential to the firm’s overall efficiency, helping to create a well-structured environment where creativity can thrive.",
    image: "/admin team.webp",
  },
   {
    title: "Supporting",
    subtitle: "Team",
    text: "Our ensemble is incomplete without our support team. From managing contracts and project files to handling billing and correspondence, they keep the office organised and compliant. Their attention to detail and administrative support contribute to the smooth running of the firm and help streamline project workflows.",
    image: "/Support team.webp",
  },
];

export default function TeamSlider() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const prev = () => setIndex((prev) => (prev === 0 ? teamSlides.length - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev === teamSlides.length - 1 ? 0 : prev + 1));

  const { title, subtitle, text, image } = teamSlides[index];

  return (
    <div className="bg-[#141414] text-white px-4 sm:px-6 py-12" style={{ fontFamily: "Gothic" }}>
      <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-8 items-center text-center">

        {/* Desktop View */}
        <div className="hidden sm:flex w-full items-start justify-between gap-4">
          {/* Left Arrow */}
          <button onClick={prev} className="bg-[#141414] p-4 rounded-full transition mt-2">
            <ChevronLeft size={24} />
          </button>

          {/* Title, Subtitle, and Description in Row */}
          <div className="flex flex-row items-start justify-between gap-8 w-full text-left">
            <div className="flex flex-col items-start gap-4 justify-center flex-shrink-0 min-w-[200px] pl-2">
              <h2 className="text-3xl font-bold" style={{ fontFamily: "FrieghtNeo" }}>{title}</h2>
              <p className="text-xl">{subtitle}</p>
            </div>
            <div className="border-l-2 border-white/30 pl-4 text-[0.9rem] leading-relaxed max-w-4xl">
              {text}
            </div>
          </div>

          {/* Right Arrow */}
          <button onClick={next} className="bg-[#141414] p-4 rounded-full transition mt-2">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile View */}
        <div className="flex sm:hidden w-full flex-col items-center gap-4">
          {/* Title + Arrows inline */}
          <div className="flex items-center justify-center gap-[70px]">
            <button onClick={prev} className="bg-[#141414] p-2 rounded-full transition">
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col items-center gap-[10px]">
              <h2 className="text-xl font-bold" style={{ fontFamily: "FrieghtNeo" }}>{title}</h2>
              <p className="text-base">{subtitle}</p>
            </div>
            <button onClick={next} className="bg-[#141414] p-2 rounded-full transition">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Description: Show More / Less */}
          
        </div>

        {/* Image Section */}
        <div className="w-full max-w-full sm:max-w-6xl">
          <img
            src={image}
            alt={`${title} ${subtitle}`}
            className="w-full rounded-lg shadow-lg bg-white object-contain"
          />
        </div>

        <div className="text-[1rem] sm:hidden max-w-md text-center" style={{ fontFamily: "FrieghtNeo" }}>
            {!showMore ? (
              <button
                onClick={() => setShowMore(true)}
                className=" text-white block mx-auto"
              >
                Read More
              </button>
            ) : (
              <>
                <p className="mt-4 leading-relaxed text-[0.85rem]"style={{ fontFamily: "Gothic" }}>{text}</p>
                <button
                  onClick={() => setShowMore(false)}
                  className="font-semibold text-white block mx-auto mt-2"
                >
                  Show Less
                </button>
              </>
            )}
          </div>
      </div>
    </div>
  );
}
