import { useState, useEffect } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner flex items-center justify-between px-4 md:px-8 w-full">
        <a href="#home" className="logo">
          Sourav JN
        </a>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map(({ href, name }) => (
              <li key={name} className="group">
                <a
                  href={href}
                  onClick={e => handleNavClick(e, href)}
                >
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group hidden md:inline-block">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>

        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black z-50 shadow-lg">
          <ul className="flex flex-col items-center gap-6 py-6">
            {navLinks.map(({ href, name }) => (
              <li key={name}>
                <a
                  href={href}
                  onClick={e => handleNavClick(e, href)}
                  className="text-lg"
                >
                  {name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={e => handleNavClick(e, "#contact")}
                className="contact-btn text-lg"
              >
                Contact me
              </a>
            </li>
          </ul>
        </nav>
      )} 
    </header>
  );
};

export default NavBar;