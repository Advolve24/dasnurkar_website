import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LogoCarousel = () => {
  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    draggable: true,
    swipeToSlide: true,
    arrows: false,
    responsive: [
    {
      breakpoint: 578, 
      settings: {
        slidesToShow: 3,
      },
    },
  ],
  };

 const logos = [
  { src: "/Kundan-spaces.webp", link: "https://kundanspaces.com" },
  { src: "/Belvalkar.webp", link: "https://belvalkarhousing.com" },
  { src: "/Columbia-Asia.webp", link: "https://columbiaasia.com" },
  { src: "/Regency-1.webp", link: "https://regencygroup.com" },
  { src: "/Corinthians.webp", link: "https://thecorinthianspune.com" },
  { src: "/Nyati.png", link: "https://nyatigroup.com" },
  { src: "/Pandit-Javdekar.webp", link: "https://panditjavdekar.com" },
  { src: "/Bharti-vidyapeeth.webp", link: "https://bharatividyapeeth.edu" },
];


  return (
   <div className="logo-carousel">
  <Slider {...settings}>
    {logos.map((logo, index) => (
      <div key={index} className="logo-slide">
        <a href={logo.link} target="_blank" rel="noopener noreferrer">
          <img src={logo.src} alt={`Logo ${index + 1}`} />
        </a>
      </div>
    ))}
  </Slider>
</div>

  );
};

export default LogoCarousel;
