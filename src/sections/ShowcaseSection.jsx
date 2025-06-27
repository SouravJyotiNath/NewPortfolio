import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            scrub: false,
          },
        }
      );
    }

    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div ref={headerRef}>
        <TitleHeader
          title="Projects"
          sub="🚀 My Project Portfolio"
        />

        <div className="mt-32 w-full flex flex-col items-center">
          <div className="showcaselayout">
            <div ref={rydeRef} className="first-project-wrapper">
              <a
                href="https://okeanos-hotel-booking.vercel.app/home"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="image-wrapper project-3d-hover">
                  <img src="/images/project1.png" alt="Ryde App Interface" />
                </div>
              </a>
              <div className="text-content">
                <a
                  href="https://github.com/SouravJyotiNath/Hotel-Management-Backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <h2>
                    Comprehensive Hotel Management and Booking Platform called Okeanos
                  </h2>
                </a>
                <p className="text-white-50 md:text-xl">
                  A WebApp built with Spring Boot, Spring Security, MySQL, and React.js for a secure, full-stack web experience.
                </p>
              </div>
            </div>

            <div className="project-list-wrapper overflow-hidden">
              <div className="project" ref={libraryRef}>
                <a
                  href="https://admin-dashboard-sourav-jyoti-naths-projects.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="image-wrapper bg-[#FFEFDB] project-3d-hover">
                    <img
                      src="/images/project2.png"
                      alt="Library Management Platform"
                    />
                  </div>
                </a>
                <a
                  href="https://github.com/SouravJyotiNath/Admin_Dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <h2>The Admin Dashboard powered by React.</h2>
                </a>
              </div>

              <div className="project" ref={ycDirectoryRef}>
                <a
                  href="home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="image-wrapper bg-[#FFE7EB] project-3d-hover">
                    <img src="/images/project33.png" alt="YC Directory App" />
                  </div>
                </a>
                <a
                  href="home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <h2>My portfolio website built with JavaScript, React, Vite, and Tailwind CSS.</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;