import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const colorClasses = [
  "bg-gradient-to-br from-blue-50 via-white to-blue-100 border-blue-100",
  "bg-gradient-to-br from-green-50 via-white to-green-100 border-green-100",
  "bg-gradient-to-br from-pink-50 via-white to-pink-100 border-pink-100",
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 60, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.07,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(el, {
            opacity: 0,
            y: 60,
            scale: 0.92,
            duration: 0.5,
            ease: "power3.in",
          });
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="w-full px-4 md:px-16 pt-24 pb-24 relative bg-transparent"
    >
      <TitleHeader
        title="Tech Stack"
        sub="🛠️ Technologies & Tools I Use"
      />
      <div className="w-full flex flex-wrap justify-center gap-8 mt-16">
        {techStackImgs.map((tech, idx) => (
          <div
            key={tech.name}
            ref={el => (cardRefs.current[idx] = el)}
            className={`techstack-card flex flex-col items-center justify-between min-w-[120px] max-w-[170px] w-[150px] h-[180px] rounded-xl shadow-lg border ${colorClasses[idx % colorClasses.length]} transition-all duration-300`}
            style={{
              opacity: 0,
              marginBottom: "1.5rem",
              marginTop: "0.5rem",
              boxSizing: "border-box",
              backgroundClip: "padding-box",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <span className="techstack-glow"></span>
            <div
              className="flex items-center justify-center mt-6 mb-2 z-10"
              style={{
                width: "70px",
                height: "70px",
                background: "rgba(255,255,255,0.85)",
                borderRadius: "1.25rem",
                boxShadow: "0 2px 16px #bae6fd88",
              }}
            >
              <img
                src={tech.imgPath}
                alt={tech.name}
                className="object-contain"
                style={{
                  width: "48px",
                  height: "48px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: "0.75rem",
                  background: "#fff",
                  transition: "transform 0.5s cubic-bezier(.22,1.61,.36,1)",
                }}
              />
            </div>
            <p
              className={`tech-label text-neutral-900 font-bold text-center px-2 pt-1 pb-4 z-20 whitespace-normal leading-tight drop-shadow
                ${tech.name.length > 16 ? "text-[0.95rem]" : "text-[1.05rem]"}
              `}
              style={{
                wordBreak: "break-word",
                lineHeight: "1.15",
                minHeight: "2.5rem",
                maxWidth: "90%",
                margin: "0 auto",
              }}
            >
              {tech.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;