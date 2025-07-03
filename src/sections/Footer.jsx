import { socialImgs, socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-base md:text-lg stylish-label"
              style={{ color: "#38bdf8", letterSpacing: "1px" }}
            >
              Visits
            </span>
            <img
              src={`https://toolsbox.com/website-hit-counter/count/${import.meta.env.VITE_COUNTER_UID}`}
              title="Web Counter"
              alt="AtoZSEOTools Web Counter"
              style={{
                height: "32px",
                marginLeft: "6px",
                filter: "drop-shadow(0 2px 8px #38bdf8aa)"
              }}
            />
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