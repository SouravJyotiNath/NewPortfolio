import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { certifications, colorClasses } from "../constants";
 
gsap.registerPlugin(ScrollTrigger);

const CARDS_PER_PAGE = 3;

const CertButton = ({ text, onClick, style = {}, disabled = false, colorIdx = 0 }) => (
  <button
    type="button"
    className={`cert-btn group flex items-center gap-2 px-6 py-2 rounded-full font-bold text-base transition-all duration-300 shadow-md text-neutral-900 drop-shadow ${colorClasses[colorIdx % colorClasses.length]} hover:scale-105 active:scale-95 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    style={style}
    onClick={onClick}
    disabled={disabled}
  >
    <span className="whitespace-nowrap">{text}</span>
    <span className="ml-1 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path d="M7 5l5 5-5 5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  </button>
);

const wobbleKeyframes = [
  "wobble18",
  "wobble22",
  "wobble26",
  "wobble32",
  "wobble14",
  "wobble10"
];

const CertificationSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [popupImg, setPopupImg] = useState(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(certifications.length / CARDS_PER_PAGE);
  const pagedCerts = certifications.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

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
            delay: i * 0.12,
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
  }, [page]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="w-full py-24 px-4 md:px-16"
      style={{ overflow: "hidden", marginBottom: "120px" }}
    >
      <TitleHeader
        title="Certifications & Internships"
        sub="🚀 My Verified Achievements"
      />
      <div className="mt-16 flex flex-row items-center justify-center gap-8 relative flex-wrap">
        {pagedCerts.map((cert, idx) => (
          <div
            key={cert.title + cert.date}
            ref={el => (cardRefs.current[idx] = el)}
            className={`cert-card-img relative flex flex-col items-center justify-end p-6 group border-2 ${colorClasses[(page * CARDS_PER_PAGE + idx) % colorClasses.length]} transition-all duration-300 ${wobbleKeyframes[(page * CARDS_PER_PAGE + idx) % wobbleKeyframes.length]}`}
            style={{
              minHeight: 320,
              minWidth: 220,
              width: 280,
              margin: "0 12px",
              opacity: 0,
              zIndex: 2,
              backgroundClip: "padding-box",
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random()}s`,
            }}
          >
            <button
              className="relative w-24 h-24 rounded-xl overflow-hidden border-2 mb-4 bg-white shadow-lg rotate-hover"
              style={{
                borderColor: "inherit",
                transition: "transform 0.5s cubic-bezier(.22,1.61,.36,1)",
              }}
              onClick={() => setPopupImg(cert)}
              aria-label="View certificate"
              type="button"
              tabIndex={0}
            >
              <img
                src={cert.imgPath}
                alt={cert.title}
                className="w-full h-full object-contain"
                style={{ filter: "brightness(1.08)", transition: "transform 0.5s cubic-bezier(.22,1.61,.36,1)" }}
              />
            </button>
            <div className="flex flex-col justify-center items-center z-10 w-full">
              <h3 className="text-neutral-900 text-base font-bold mb-1 drop-shadow text-center">{cert.title}</h3>
              {cert.org && (
                <p className="text-neutral-700 text-sm font-medium mb-1 drop-shadow text-center">{cert.org}</p>
              )}
              <p className="text-neutral-700 text-xs mb-2 drop-shadow text-center">{cert.date}</p>
              <CertButton
                text="View Certificate"
                style={{ marginTop: 12 }}
                onClick={() => window.open(cert.link, "_blank")}
                colorIdx={page * CARDS_PER_PAGE + idx}
              />
            </div>
            <span
              className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md group-hover:scale-110 transition-transform z-20"
              style={{
                background: "linear-gradient(90deg, #0ea5e9 60%, #f472b6 100%)",
                color: "#fff",
              }}
            >
              {page * CARDS_PER_PAGE + idx === 0 ? "NEW" : "CERT"}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-20 justify-center w-full max-w-xl mx-auto">
        <CertButton
          text="Prev"
          style={{ minWidth: 120 }}
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          colorIdx={0}
        />
        <CertButton
          text="Next"
          style={{ minWidth: 120 }}
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          colorIdx={1}
        />
      </div>

      {popupImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setPopupImg(null)}
        >
          <div
            className="relative rounded-2xl shadow-2xl p-6 flex flex-col items-center max-w-[90vw] max-h-[90vh] bg-white"
            style={{
              border: "2px solid #0ea5e9",
              boxShadow: "0 8px 40px #0ea5e933"
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={popupImg.imgPath}
              alt={popupImg.title}
              className="max-w-[80vw] max-h-[70vh] rounded-xl border-2 shadow-lg bg-white"
              style={{
                borderColor: "#0ea5e9"
              }}
            />
            <div className="mt-4 text-center w-full">
              <h3 className="text-neutral-900 text-lg font-bold mb-1 drop-shadow">{popupImg.title}</h3>
              {popupImg.org && (
                <p className="text-neutral-700 text-base font-medium mb-1 drop-shadow">{popupImg.org}</p>
              )}
              <p className="text-neutral-700 text-xs drop-shadow">{popupImg.date}</p>
              <CertButton
                text="View Certificate"
                style={{ marginTop: 12 }}
                onClick={() => window.open(popupImg.link, "_blank")}
                colorIdx={0}
              />
            </div>
            <button
              className="absolute top-2 right-2 rounded-full p-2 hover:text-black transition"
              style={{
                background: "#f8fafc",
                color: "#000",
                border: "1px solid #0ea5e9",
                boxShadow: "0 4px 16px 0 #0002, 0 1.5px 0 #fff8"
              }}
              onClick={() => setPopupImg(null)}
              aria-label="Close"
              type="button"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationSection;