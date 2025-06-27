import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { educationCards } from "../constants"

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [popupImg, setPopupImg] = useState(null);

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.18,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(el, {
            opacity: 0,
            y: 80,
            scale: 0.92,
            duration: 0.6,
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
      id="education"
      className="w-full px-4 md:px-16 pt-55 pb-24 relative bg-transparent"
    >
      <TitleHeader
        title="Education"
        sub="🎓 My Academic Journey"
      />
      <div className="relative flex flex-col items-center mt-20">
        <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-full z-0 pointer-events-none" style={{ transform: "translateX(-50%)" }} />
        <div className="w-full flex flex-col gap-24 z-10">
          {educationCards.map((card, idx) => (
            <div
              key={card.title}
              ref={el => (cardRefs.current[idx] = el)}
              className="relative flex flex-col md:flex-row items-center md:items-stretch justify-center group"
              style={{ minHeight: 220, opacity: 0 }}
            >
              <div className="flex flex-col items-center md:items-end md:w-1/2 pr-0 md:pr-12">
                <div
                  className="edu-img-glow mb-4 md:mb-6 cursor-pointer"
                  onClick={() => setPopupImg(card.img)}
                  tabIndex={0}
                  aria-label={`View image of ${card.title}`}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") setPopupImg(card.img);
                  }}
                  role="button"
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-2xl shadow-xl border-2 border-blue-100"
                  />
                </div>
                <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl px-6 py-4 shadow-lg border-l-4 border-blue-200 edu-card-anim">
                  <h3 className="text-neutral-900 text-lg md:text-xl font-bold mb-1 drop-shadow">{card.title}</h3>
                  <p className="text-neutral-900 text-base md:text-lg font-semibold drop-shadow">{card.degree}</p>
                  <p className="text-neutral-700 text-sm md:text-base mt-1 drop-shadow">{card.details}</p>
                </div>
              </div>
              <div className="flex flex-col items-center z-10 mx-0 md:mx-6">
                <span className="relative flex h-8 w-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-gradient-to-br from-blue-200 to-blue-400 border-4 border-white shadow-lg"></span>
                </span>
                {idx < educationCards.length - 1 && (
                  <span className="flex-1 w-1 bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-full" style={{ minHeight: 60, margin: "0 auto" }} />
                )}
              </div>
              <div className="flex flex-col items-center md:items-start md:w-1/2 pl-0 md:pl-12 mt-6 md:mt-0">
                <div className="bg-gradient-to-br from-green-50 via-white to-green-100 rounded-xl px-6 py-4 shadow-lg border-l-4 border-green-200 edu-card-anim">
                  <p className="text-neutral-900 text-base md:text-lg font-bold drop-shadow">{card.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popupImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPopupImg(null)}
          tabIndex={-1}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-2"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-500 font-bold z-10"
              onClick={() => setPopupImg(null)}
              aria-label="Close image"
            >
              &times;
            </button>
            <img
              src={popupImg}
              alt="Institute"
              className="max-w-full max-h-[80vh] rounded-xl"
              style={{ display: "block", margin: "0 auto" }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;