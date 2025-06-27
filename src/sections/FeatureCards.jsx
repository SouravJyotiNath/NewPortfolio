import { useState, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";
import { abilities } from "../constants";

const DISPLAY_TIME = 4000;

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const colorClasses = [
  "bg-gradient-to-br from-blue-50 via-white to-blue-100 border-blue-100",
  "bg-gradient-to-br from-green-50 via-white to-green-100 border-green-100",
  "bg-gradient-to-br from-pink-50 via-white to-pink-100 border-pink-100",
];

const FeatureCards = () => {
  const [visibleIdx, setVisibleIdx] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIdx((prev) => (prev + 1) % abilities.length);
    }, DISPLAY_TIME);
    return () => clearInterval(interval);
  }, []);

  const firstIdx = visibleIdx;
  const secondIdx = (visibleIdx + 1) % abilities.length;
  const backIdx = (visibleIdx + 2) % abilities.length;

  return (
    <section
      className="w-full px-2 sm:px-4 md:px-16 pt-8 pb-16 sm:pt-10 sm:pb-24"
      id="soft-skills"
      style={{ marginTop: 0 }}
    >
      <TitleHeader
        title="Soft Skills"
        sub="✨ My Core Abilities"
      />
      <div
        className="mt-10 sm:mt-16 mx-auto flex justify-center items-center relative min-h-[260px] sm:min-h-[340px]"
        style={{ height: "min(340px, 60vw)" }}
      >
        {abilities.map(({ imgPath, title, desc }, idx) => {
          let cardStyle = "opacity-0 scale-90 z-0 pointer-events-none";
          let translateX = 0;
          let translateY = 0;
          let rotate = 0;
          let isVisible = false;
          let colorClass = colorClasses[idx % colorClasses.length];

          if (isMobile) {
            if (idx === firstIdx) {
              cardStyle = "opacity-100 scale-100 z-20 pointer-events-auto";
              translateX = 0;
              translateY = 0;
              rotate = 0;
              isVisible = true;
            } else if (idx === secondIdx) {
              cardStyle = "opacity-40 scale-90 z-10 pointer-events-none";
              translateX = 0;
              translateY = 40;
              rotate = 0;
              isVisible = true;
            }
          } else {
            if (idx === firstIdx) {
              cardStyle = "opacity-100 scale-100 z-20 pointer-events-auto";
              translateX = -180;
              rotate = -4;
              isVisible = true;
            } else if (idx === secondIdx) {
              cardStyle = "opacity-100 scale-100 z-20 pointer-events-auto";
              translateX = 180;
              rotate = 4;
              isVisible = true;
            } else if (idx === backIdx) {
              cardStyle = "opacity-40 scale-90 z-10 pointer-events-none";
              translateX = 0;
              translateY = 60;
              rotate = 0;
              isVisible = true;
            }
          }

          return (
            <div
              key={title}
              className={`card-border rounded-xl p-5 sm:p-8 flex flex-col gap-4 feature-card-anim absolute left-1/2 top-1/2 transition-all duration-700 ease-in-out ${cardStyle} ${colorClass} border`}
              style={{
                minWidth: 220,
                maxWidth: 340,
                width: "90vw",
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${(isMobile && idx === secondIdx) || (!isMobile && idx === backIdx) ? 0.92 : 1})`,
                boxShadow: (isMobile
                  ? idx === firstIdx
                  : idx === firstIdx || idx === secondIdx
                )
                  ? "0 8px 32px 0 #67e8f9cc, 0 2px 8px 0 #0284c733"
                  : "0 2px 24px 0 #0284c71a, 0 1.5px 0 #fff2",
                opacity: isVisible ? (isMobile && idx === secondIdx ? 0.4 : (!isMobile && idx === backIdx ? 0.4 : 1)) : 0,
                pointerEvents: isVisible && ((isMobile && idx === firstIdx) || (!isMobile && idx !== backIdx)) ? "auto" : "none",
                backdropFilter: "blur(8px)",
              }}
              tabIndex={isVisible && ((isMobile && idx === firstIdx) || (!isMobile && idx !== backIdx)) ? 0 : -1}
              aria-hidden={!isVisible || (!isMobile && idx === backIdx) || (isMobile && idx === secondIdx)}
            >
              <div className="size-12 sm:size-14 flex items-center justify-center rounded-full mx-auto">
                <img src={imgPath} alt={title} className="max-h-12 sm:max-h-14" />
              </div>
              <h3 className="text-neutral-900 text-xl sm:text-2xl font-semibold mt-2 text-center">{title}</h3>
              <p className="text-neutral-700 text-base sm:text-lg text-center">{desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureCards;