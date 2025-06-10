import React, { useEffect } from 'react';
import "../pages/Home.css";
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import LogoCarousel from '../components/LogoCarousel';




gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    useEffect(() => {
        const settings = {
            trigger: document.querySelector('.gallery'),
            containers: document.querySelectorAll('.gallery_container'),
            lerp: 0.1,
        };

        const galleryEnding = document.querySelectorAll('.gallery_ending_title > h1')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id; // e.g., 'div1'
                    const heading = document.querySelector(`.heading-${id.slice(-1)}`); // 'heading-1'

                    if (heading) {
                        if (entry.isIntersecting) {
                            heading.style.opacity = '1';
                        } else {
                            heading.style.opacity = '0';
                        }
                    }
                });
            },
            {
                threshold: 0.5, // 50% visibility
            }
        );

        // Observe all divs
        for (let i = 1; i <= 7; i++) {
            const target = document.querySelector(`#div${i}`);
            if (target) observer.observe(target);
        }



        const timain = gsap.timeline({
            scrollTrigger: {
                trigger: settings.trigger,
                start: 'top top',
                end: '+=2000 bottom',
                scrub: 4,
                pin: true,
                markers: false,
            },
        });

        const animateMedia = () => {
            gsap.set(galleryEnding, { yPercent: 100 });

            settings.containers.forEach((element) => {
                const thumbnails = element.querySelector('.gallery_thumbnail');
                const medias = element.querySelectorAll('.gallery_media');
                const heading = {
                    title: element.querySelectorAll('.gallery_heading_title'),
                    roles: element.querySelectorAll('.gallery_heading_roles > span'),
                    cases: element.querySelectorAll('.gallery_heading_cases > span'),
                };

                gsap.set(thumbnails, { xPercent: 0 });
                gsap.set(medias, { clipPath: 'inset(0 0 0 0)' });
                gsap.set([heading.title, heading.roles, heading.cases], { yPercent: 0 });

                timain.to(thumbnails, { duration: 2, yPercent: -100, ease: 'none' });

                const images = [
                    ['.img-1', -500, -500],
                    ['.img-2', -300, -300],
                    ['.img-3', 400, -500],
                    ['.img-4', 700, -600],
                    ['.img-5', -300, 900],
                    ['.img-6', 500, 900],
                    ['.img-7', 500, 700],
                    ['.m-img-1', -300, 300],
                    ['.m-img-2', 300, 200],
                    ['.m-img-3', -200, 700],
                    ['.m-img-4', -600, 1900],
                    ['.m-img-5', 400, 1900],
                    ['.m-img-6', -800, 2900],
                    ['.m-img-7', 800, 2900],
                ];

                images.forEach(([selector, x, y]) => {
                    timain.to(selector, {
                        duration: 4,
                        xPercent: x,
                        yPercent: y,
                        ease: 'none',
                    }, 0);
                });

                timain.to('.heading', {
                    duration: 4,
                    scale: 1.3,
                    ease: 'none',
                }, 0);

                timain.to('.three-heading', {
                    duration: 4,
                    scale: 1.3,
                    fontSize: '0.1rem',
                    marginTop: '1rem',
                    ease: 'none',
                }, 0);
            });
        };

        const animateHeading = () => {
            gsap.fromTo('.heading',
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
            );
        };

        const animateThreeHeading = () => {
            gsap.fromTo('.three-heading',
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
            );
        };

        const lenis = new Lenis({
            lerp: settings.lerp,
            smoothWheel: true,
            smoothTouch: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on('scroll', () => {
            ScrollTrigger.update();
        });


        gsap.to('.last-gallery-img', {
            y: -100, // 80 -> -80
            ease: 'none',
            scrollTrigger: {
                trigger: '.last-section', // Make sure this section scrolls
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                // markers: true, // Uncomment to debug
            },
        });





        animateMedia();
        animateHeading();
        animateThreeHeading();

        document.querySelectorAll('.parallax-section').forEach(section => {
            gsap.to(section, {
                backgroundPositionY: '50%',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });


        setTimeout(() => {
            const images = document.querySelectorAll('.gallery_thumbnail_image');
            images.forEach(image => image.classList.add('active'));
        }, 100);


        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            
        };
    }, []);

    return (
        <>
            <div id="main-section">
                <main className="app">
                    <section className="gallery">
                        <div className="gallery_container">
                            <div className="gallery_thumbnail">
  {/* .webp images (img-1 to img-7) */}
  {[1, 2, 3, 4, 5, 6, 7].map(n => (
    <img
      key={n}
      className={`gallery_thumbnail_image img-${n}`}
      src={
        n === 7
          ? "https://dasnurkar.in/wp-content/uploads/2025/06/img-7-1.webp"
          : `https://dasnurkar.in/wp-content/uploads/2024/10/img-${n}.webp`
      }
      alt=""
    />
  ))}

  {/* .png images (m-img-1 to m-img-7) */}
  {[1, 2, 3, 4, 5, 6, 7].map(n => (
    <img
      key={`m-${n}`}
      className={`gallery_thumbnail_image m-img-${n}`}
      src={
        n === 7
          ? "https://dasnurkar.in/wp-content/uploads/2025/06/img-7-1.webp"
          : `https://dasnurkar.in/wp-content/uploads/2024/10/Img-${[
              "One",
              "Two-1",
              "Three-1",
              "Four",
              "Five-1",
              "Six-1",
              "Group-131437"
            ][n - 1]}.png`
      }
      alt=""
    />
  ))}
</div>

                        </div>

                       <div className="heading_container">
                        <img
                            className="heading sm:mt-0"
                            src="https://dasnurkar.in/wp-content/uploads/2024/10/Group-3948.svg"
                            alt=""
                        />

                        <div className="three-heading sm:mt-0 mt-2">
                            <a href="/projectgallery/residential"><h1 className="three-h1">Architecture</h1></a>
                            <a href="/projectgallery/interiors"><h1 className="three-h2">Interiors</h1></a>
                            <a href="/projectgallery/landscape"><h1 className="three-h3">Landscape</h1></a>
                        </div>
                        </div>
                    </section>
                </main>
            </div>

            <div id="main-section1" style={{fontFamily: 'FrieghtNeo' }}>
                <div id='div1' className='parallax-section cursor-pointer'style={{
    backgroundImage: `url('/Elysia.webp')`}} onClick={() => window.location.href = '/project/68426231458c44d38022745a'} >
                    <div className='fixed-heading heading-1'>
                        <a>Nyati Elysia</a>
                        <p>Kharadi, Pune</p>
                        <img className='fixed-heading-arrow' src='\Group-131408.svg' />
                    </div>
                </div>
                <div id='div2' className='parallax-section cursor-pointer' style={{
    backgroundImage: `url('/Corianthisis.webp')`}} onClick={() => window.location.href = '/project/68426394458c44d38022745d'}>
                    <div className='fixed-heading heading-2'>
                        <a>The Corinthians Club</a>
                        <p>Undri, Pune</p>
                        <img className='fixed-heading-arrow' src='\Group-131408.svg' />
                    </div>
                </div>
                <div id='div3' className='parallax-section cursor-pointer' style={{
    backgroundImage: `url('/Patel-Mundhawa.webp')`}} onClick={() => window.location.href = '/project/68426231458c44d38022745a'}>
                    <div className='fixed-heading heading-3'>
                        <a>Eastern Front</a>
                        <p>Mundhwa, Pune</p>
                       <img className='fixed-heading-arrow' src='\Group-131408.svg' />
                    </div>
                </div>
                <div id='div4' className='parallax-section cursor-pointer'style={{
    backgroundImage: `url('/Nature Pride.png')`}} onClick={() => window.location.href = '/project/684264e1458c44d380227463'}>
                    <div className='fixed-heading heading-4'>
                        <a>Nature’s Pride</a>
                        <p>Makhmalabad, Nashik</p>
                       <img className='fixed-heading-arrow' src='\Group-131408.svg' />
                    </div>
                </div>
                <div id='div5' className='parallax-section cursor-pointer' style={{
    backgroundImage: `url('/Unitree.webp')`}} onClick={() => window.location.href = '/project/68426588458c44d380227466'}>
                    <div className='fixed-heading heading-5'>
                        <a>Nyati Unitree</a>
                        <p>Baner, Pune</p>
                        <img className='fixed-heading-arrow' src='\Group-131408.svg' />
                    </div>
                </div>
                <div id='div6' className='parallax-section cursor-pointer' style={{
    backgroundImage: `url('/Mahesh-Bhai.webp')`}} onClick={() => window.location.href = '/project/68426627458c44d380227469'}>
                    <div className='fixed-heading heading-6'>
                        <a>Regency Astra</a>
                        <p>Yerawada, Pune</p>
                       <img className='fixed-heading-arrow' src='\Group-131408.svg' />
                    </div>
                </div>
                <div id='div7' className='parallax-section cursor-pointer'style={{
    backgroundImage: `url('/Spa-Villas.webp')`}} onClick={() => window.location.href = '/project/6842675b458c44d38022746c'}>
                    <div className='fixed-heading heading-7'>
                        <a>Nyati Spa Villas</a>
                        <p>Kudje, Pune</p>
                        <img className='fixed-heading-arrow' src='\Group-131408.svg' />
                    </div>
                </div>

                <div className='last-section'>
                    <LogoCarousel />
                     {/* Desktop Home gallery */}
                    <div className='last-gallery'>
                        <div className='gallery-div'>
                            <img src='\Group-131373.png' className='last-gallery-img' />
                            <img src='\Group-131374.png' />
                        </div>
                        <div className='gallery-div'>
                            <img src='\Group-131375.png' />
                        </div>
                        <div className='gallery-div-middle'>
                            <div className='gallery-middle-content'>
                                <h1 className='sm:text-[3.2rem] text-[2.5rem]'>Creations</h1>
                                <p className=""style={{fontFamily: 'Gothic' }}>that mark an era</p>
                                <img src='\Group-131408.svg' />
                                <button style={{fontFamily: 'Gothic' }}>View all projects</button>
                            </div>
                            <img src='\home-page-img.webp' className='last-gallery-img' />
                        </div>
                        <div className='gallery-div gallery-div-last'>
                            <img src='\Group-131377.png' />
                        </div>
                        <div className='gallery-div'>
                            <img src='\Group-131378.png' className='last-gallery-img' />
                            <img src='\Group-131379.png' />
                        </div>
                    </div>

                    {/* Mobile Home gallery */}
                    <div className='last-gallery-mobile'>
                        <div className='lastm-gallery-div'>
                             <img src='\Group-131373.png' className='last-gallery-img' />
                            <img src='\Group-131374.png' />
                        </div>
                        <div className='lastm-gallery-div'>
                            <div className='lastm-gallery-div-content'>
                                <h1>CREATIONS</h1>
                                <p>that mark an era</p>
                                <img src='\Group-131408.svg' />
                                <button>View all projects</button>
                            </div>
                            <img src='\Group-131375.png' />
                        </div>
                        <div className='lastm-gallery-div'>
                             <img src='\Group-131378.png' className='last-gallery-img' />
                            <img src='\Group-131379.png' />
                        </div>

                    </div>
                    <div className='last-gallery-images'>
                         <img src='\Home-page-3-768x576.webp'/>
                         <img src='\Home-page-img-2-768x543.webp'/>
                    </div>
                </div>

                


            </div>

        </>
    );
};

export default Home;
