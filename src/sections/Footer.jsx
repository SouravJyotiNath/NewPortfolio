import { useEffect, useState } from "react";
import { socialImgs, socialLinks } from "../constants";

const COUNTER_KEY = "site-visit-counter";
const VISITED_KEY = "site-visited-once";

const Footer = () => {
  const [visitCount, setVisitCount] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let count = Number(localStorage.getItem(COUNTER_KEY) || "0");
    if (!sessionStorage.getItem(VISITED_KEY)) {
      count += 1;
      localStorage.setItem(COUNTER_KEY, count);
      sessionStorage.setItem(VISITED_KEY, "true");
      setAnimate(true);
    }
    setVisitCount(count);
  }, []);

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setAnimate(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [animate]);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className={`font-bold text-xl md:text-2xl stylish-counter ${animate ? "pop-anim" : ""}`}
              style={{
                color: "#38bdf8",
                letterSpacing: "2px",
                fontFamily: "'Orbitron', 'Montserrat', monospace",
                transition: "color 0.4s",
              }}
            >
              {visitCount !== null ? visitCount : "--"}
            </span>
            <span className="text-base md:text-lg font-semibold stylish-label">
              {visitCount === 1 ? "visit" : "visits"}
            </span>
          </div>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <a
              key={index}
              className="icon"
              href={socialLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialImg.name}
            >
              <img src={socialImg.imgPath} alt={socialImg.name} />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Sourav Jyoti Nath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;