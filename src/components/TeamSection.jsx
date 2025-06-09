import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const profiles = [
  {
    name: "Ar. Rohit Dasnurkar",
    image: "./asset/Rohit-Dasnurkar-1.webp",
    title:
      "Master of Urban Design, Newcastle University, UK. Bachelor of Architecture, University of Pune.",
    desc: "Ar. Rohit Dasnurkar’s technical prowess, futuristic vision, global perspective, and deep grasp of current architectural and planning practices elevate our designs to a higher standard. His strong interest in Mass Housing Design and Urban Planning is evident from his work. His work on the Quayside revitalisation project for South Shields City Council and Copenhagen City Council, as well as other UK projects, helped him bring a distinctive vision back home and he is pivotal in developing high-level strategies and guiding our planning and design teams.",
  },
  {
    name: "Ar. Shirish Dasnurkar",
    image: "./asset/Shirish-Dasnurkar1.webp",
    title: "Bachelor of Architecture, University of Pune.",
    desc: "With his holistic perception and interpretation of technicalities, Shirish leads Dasnurkar Associates on the path to success. With his diverse experience in residential, governmental, industrial and institutional projects he comes up with comprehensive design solutions. He is also an ardent reader, traveller, teacher and philanthropist.",
  },
  {
    name: "Ar. Madhura Dasnurkar",
    image: "./asset/Madhura-Dasnurkar1.webp",
    title: "Master of Landscape Architecture, CEPT University, Ahmedabad.",
    desc: "Madhura is passionate about landscape urbanism and planning. Her extensive experience honed her ability to design and implement projects of varying scales. She aims to utilise landscape architecture as a tool to bridge the gap between ecology and community with practicality and research-oriented designs.",
  },
  {
    name: "Ar. Anuradha Sathe",
    image: "./asset/Anuradha-Sathe1.webp",
    title: "Bachelor of Architecture, University of Pune.",
    desc: "Anuradha is our trusted expert in architectural planning and elevations. She excels in drafting outstanding layouts for multidisciplinary projects. She believes architecture isn’t spontaneous— it’s a thoughtful response to client needs and environmental context, achieving a perfect balance between form and functionality.",
  },
  {
    name: "Ar. Hiral Shah | Pushkar Solanki",
    image: "./asset/Hiral-Shah-Pushkar-Solanki.webp",
    title: "",
    desc: "Hiral and Pushkar with their extensive experience, design and execute impactful niche interior spaces. From luxury interiors to chic restaurants, their design solutions are optimum, efficient and refined. Their design philosophy demonstrates the capacity for something simple to evolve into something magnificent. ",
  },
  {
    name: "Sandeep Desai",
    image: "./asset/Sandeep-Desai1.webp",
    title: "Diploma in Civil Engineering, University of Pune.",
    desc: "Sandeep is a versatile liaison specialist who has mastery over all aspects of legality and documentation. His holistic approach to overseeing the entire architectural development operation optimises the project’s legal framework. He prioritises customised sustainable solutions that are legally ideal and ethically planned.",
  },
];

export default function TeamSection() {
  const desktopRefs = useRef([]);
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  useEffect(() => {
    if (window.innerWidth < 1024) return; // Only run GSAP on desktop

    desktopRefs.current.forEach((ref, idx) => {
      if (!ref) return;

      const left = leftRefs.current[idx];
      const right = rightRefs.current[idx];
      const middle = ref.querySelector(".middle");

      gsap.set([left, right], { opacity: 0, x: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref,
            start: "top 90%",
            end: "bottom center",
            scrub: true,
          },
        })
        .fromTo(middle, { scale: 1.2 }, { scale: 1, duration: 1 })
        .to(left, { x: "-33vw", opacity: 1, duration: 1 }, "<")
        .to(right, { x: "33vw", opacity: 1, duration: 1 }, "<");
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="w-full">
      {/*<div className="w-full h-screen bg-black" /> */}

      {/* Desktop Version */}
      <div className="hidden lg:block">
        {Array.from({ length: 2 }).map((_, i) => {
          const mid = i * 3;
          return (
            <section
              key={i}
              ref={(el) => (desktopRefs.current[i] = el)}
              className="w-full relative min-h-screen bg-[#141414] text-white px-20 py-20 flex flex-col justify-between items-center overflow-hidden"
            >
              <div className="relative w-full flex flex-col justify-between items-center">
                {/* Middle */}
                <div className="middle relative z-10 w-full max-w-md md:w-[31%] flex flex-col gap-10 overflow-hidden">
                  <ImageCard profile={profiles[mid]} />
                </div>

                {/* Left */}
                <div
                  ref={(el) => (leftRefs.current[i] = el)}
                  className="absolute top-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-md md:w-[31%] flex flex-col gap-10 overflow-hidden"
                >
                  <ImageCard profile={profiles[mid + 1]} />
                </div>

                {/* Right */}
                <div
                  ref={(el) => (rightRefs.current[i] = el)}
                  className="absolute top-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-md md:w-[31%] flex flex-col gap-10 overflow-hidden"
                >
                  <ImageCard profile={profiles[mid + 2]} />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Mobile Version */}
      <div className="block w-full lg:hidden bg-[#141414] text-white py-10 space-y-12">
        {profiles.map((p, idx) => (
          <MobileCard key={idx} profile={p} />
        ))}
      </div>
    </div>
  );
}

function ImageCard({ profile }) {
  return (
    <>
    <div>
      <div
        className="relative h-[460px] bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url('${profile.image}')` }}
      >
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center rounded-2xl">
          <h2 className="text-white text-3xl font-medium font-[FrieghtNeo]">
            {profile.name}
          </h2>
          {profile.title && (
            <p className="text-white text-sm mt-1 whitespace-pre-line">
              {profile.title}
            </p>
          )}
        </div>
      </div>
      <div className="px-3 mt-7">
        <p className="text-center text-[13px] text-[#959595] font-[Gothic]">
          {profile.desc}
        </p>
      </div>
    </div>
    </>
  );
}

function MobileCard({ profile }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-black rounded-2xl">
      <div
        className="relative h-[400px] bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url('${profile.image}')` }}
      >
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/100 via-black/100 to-transparent p-4 text-center">
          <h2 className="text-white text-2xl font-medium font-[FrieghtNeo]">
            {profile.name}
          </h2>
          {profile.title && (
            <p className="text-white text-xs mt-1 whitespace-pre-line">
              {profile.title}
            </p>
          )}
        </div>
      </div>
      <div className="px-2 pb-5 text-center bg-black rounded-2xl">
        {show && (
          <p className="text-[13px] text-[#959595] font-[Gothic] mb-2">
            {profile.desc}
          </p>
        )}
        <button
          onClick={() => setShow(!show)}
          className="text-sm text-white"
        >
          {show ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}

