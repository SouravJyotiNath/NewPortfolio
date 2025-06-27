import { useState, useRef, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { experienceCards } from "../constants/";

const CARD_WIDTH = 520;
const CARD_HEIGHT = 520;

function FadeInBlock({ children, delay = 0, active }) {
  return (
    <span
      className={`fade-in-block${active ? " fade-in-block-animate" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}

const EXPERIENCE_TEXT_COLOR = "#cbd5e1";

const Experience = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? experienceCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === experienceCards.length - 1 ? 0 : prev + 1));
  };

  const getOffset = (idx) => {
    let offset = idx - current;
    const half = Math.floor(experienceCards.length / 2);
    if (offset > half) offset -= experienceCards.length;
    if (offset < -half) offset += experienceCards.length;
    return offset;
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`flex-center md:mt-40 mt-20 section-padding xl:px-0 transition-all duration-700 ${
        visible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 translate-y-10 pointer-events-none"
      }`}
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Experience" sub="💼 My Work Experience" />
        <div className="mt-32 relative flex flex-col items-center">
          <div className="relative w-full max-w-5xl flex items-center justify-center min-h-[540px] perspective-[2000px]">
            <button
              onClick={handlePrev}
              className="plain-btn absolute left-0 z-10 p-3 rounded-full transition top-1/2 -translate-y-1/2 shadow-lg"
              aria-label="Previous"
            >
              <svg width="32" height="32" fill="none" stroke="currentColor">
                <path d="M21 26l-9-10 9-10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="relative w-full flex justify-center items-center" style={{ height: CARD_HEIGHT }}>
              {experienceCards.map((card, idx) => {
                const offset = getOffset(idx);
                const isActive = offset === 0;

                let style = {
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  minHeight: CARD_HEIGHT,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: `
                    translate(-50%, -50%)
                    scale(${offset === 0 ? 1 : 0.85})
                    rotateY(${offset * 50}deg)
                    translateX(${offset * (CARD_WIDTH / 1.3)}px)
                  `,
                  zIndex: 10 - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                  transition: "all 0.6s cubic-bezier(.4,2,.3,1)",
                  pointerEvents: offset === 0 ? "auto" : "none",
                  display: Math.abs(offset) > 2 ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  cursor: card.link ? "pointer" : "default",
                };

                const CardContent = (
                  <div
                    className="glass-card-content flex flex-col items-center justify-center w-full h-full p-8 relative z-10"
                  >
                    <div
                      className={`w-24 h-24 flex items-center justify-center rounded-full shadow mb-4
                        ${card.logo.includes("LearnHill.png") ? "bg-black" : "bg-white"}`}
                    >
                      <img
                        src={card.logo}
                        alt={card.company + " logo"}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div className="w-full text-center flex flex-col items-center justify-center flex-1 overflow-y-auto" style={{ maxHeight: CARD_HEIGHT - 120 }}>
                      <h2
                        className="text-2xl font-extrabold mb-2 transition-colors duration-300 three-d-glass"
                        style={{
                          fontFamily: `'Segoe UI', 'Roboto', 'Arial', 'sans-serif'`,
                          color: EXPERIENCE_TEXT_COLOR
                        }}
                      >
                        <FadeInBlock delay={isActive ? 0.1 : 0} active={isActive}>{card.company}</FadeInBlock>
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 justify-center mb-2">
                        <span
                          className="bg-gray-200 text-gray-900 px-4 py-1 rounded-lg text-base font-bold three-d-glass-sm"
                          style={{ fontFamily: `'Segoe UI', 'Roboto', 'Arial', 'sans-serif'` }}
                        >
                          <FadeInBlock delay={isActive ? 0.3 : 0} active={isActive}>{card.designation}</FadeInBlock>
                        </span>
                        <span
                          className="text-base three-d-glass-sm"
                          style={{
                            fontFamily: `'Segoe UI', 'Roboto', 'Arial', 'sans-serif'`,
                            color: EXPERIENCE_TEXT_COLOR
                          }}
                        >
                          <FadeInBlock delay={isActive ? 0.5 : 0} active={isActive}>{card.duration}</FadeInBlock>
                        </span>
                      </div>
                      <p
                        className="mt-3 text-lg three-d-glass-sm"
                        style={{
                          fontFamily: `'Segoe UI', 'Roboto', 'Arial', 'sans-serif'`,
                          color: EXPERIENCE_TEXT_COLOR
                        }}
                      >
                        <FadeInBlock delay={isActive ? 0.7 : 0} active={isActive}>{card.about}</FadeInBlock>
                      </p>
                      {card.projects && (
                        <ul
                          className="list-disc ml-6 mt-3 text-left inline-block three-d-glass-sm"
                          style={{
                            fontFamily: `'Segoe UI', 'Roboto', 'Arial', 'sans-serif'`,
                            color: EXPERIENCE_TEXT_COLOR
                          }}
                        >
                          {card.projects.map((proj, i) => (
                            <li key={i} className="text-base">
                              <FadeInBlock delay={isActive ? 0.9 + i * 0.2 : 0} active={isActive}>{proj}</FadeInBlock>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );

                const CardWithGlow = (
                  <GlowCard card={card} index={idx}>
                    {CardContent}
                  </GlowCard>
                );

                return card.link ? (
                  <a
                    key={card.company}
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <div style={style}>{CardWithGlow}</div>
                  </a>
                ) : (
                  <div key={card.company} style={style}>
                    {CardWithGlow}
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleNext}
              className="plain-btn absolute right-0 z-10 p-3 rounded-full transition top-1/2 -translate-y-1/2 shadow-lg"
              aria-label="Next"
            >
              <svg width="32" height="32" fill="none" stroke="currentColor">
                <path d="M11 6l9 10-9 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;