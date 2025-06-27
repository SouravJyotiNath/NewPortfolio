import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";

// --- 3D Starfield & Lightning
const StarLightning3DCoder = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: 912, h: 591.2 });

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        const maxWidth = parent ? parent.offsetWidth : 912;
        const ratio = 591.2 / 912;
        let width = Math.min(912, maxWidth);
        let height = width * ratio;
        if (height > 591.2) {
          height = 591.2;
          width = height / ratio;
        }
        setDimensions({ w: width, h: height });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    const STAR_COUNT = 90;
    const LIGHTNING_COUNT = 2;
    const stars = [];
    const lightningBolts = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      const phi = Math.random() * 2 * Math.PI;
      const theta = Math.acos(2 * Math.random() - 1);
      const r = 260 + Math.random() * 180;
      stars.push({
        phi,
        theta,
        r,
        size: 1.2 + Math.random() * 1.8,
        speed: 0.0007 + Math.random() * 0.0013,
        color: `rgba(255,255,255,${0.6 + Math.random() * 0.4})`,
      });
    }

    function createLightning() {
      const bolts = [];
      for (let i = 0; i < LIGHTNING_COUNT; i++) {
        const startX = 300 + Math.random() * 300;
        const startY = 120 + Math.random() * 120;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = startY + 180 + Math.random() * 80;
        const segments = [];
        let prevX = startX, prevY = startY;
        for (let j = 0; j < 8; j++) {
          const nx = prevX + (endX - startX) / 8 + (Math.random() - 0.5) * 24;
          const ny = prevY + (endY - startY) / 8 + (Math.random() - 0.5) * 24;
          segments.push([nx, ny]);
          prevX = nx;
          prevY = ny;
        }
        bolts.push({
          points: [[startX, startY], ...segments],
          alpha: 0.7 + Math.random() * 0.3,
          color: Math.random() > 0.5 ? "#fef08a" : "#fbbf24",
          life: 0,
          maxLife: 20 + Math.random() * 20,
        });
      }
      return bolts;
    }

    let lightningTimer = 0;
    let lightningInterval = 60;

    function draw() {
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);

      // 3D starfield rotation
      const t = Date.now() * 0.00025;
      for (let i = 0; i < stars.length; i++) {
        let { phi, theta, r, size, color, speed } = stars[i];
        phi += speed;
        stars[i].phi = phi;
        // 3D to 2D projection (rotating sphere)
        const x3d = r * Math.sin(theta) * Math.cos(phi + t);
        const y3d = r * Math.cos(theta);
        const z3d = r * Math.sin(theta) * Math.sin(phi + t);
        // Perspective projection
        const fov = 600;
        const scale = fov / (fov - z3d);
        const x2d = dimensions.w / 2 + x3d * scale * (dimensions.w / 912);
        const y2d = dimensions.h / 2 + y3d * scale * 0.7 * (dimensions.h / 591.2);
        ctx.beginPath();
        ctx.arc(x2d, y2d, size * scale * (dimensions.w / 912), 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8 * scale * (dimensions.w / 912);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Lightning bolts
      lightningTimer++;
      if (lightningTimer > lightningInterval) {
        lightningBolts.splice(0, lightningBolts.length, ...createLightning());
        lightningTimer = 0;
        lightningInterval = 40 + Math.random() * 60;
      }
      for (let bolt of lightningBolts) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.sin((bolt.life / bolt.maxLife) * Math.PI)) * bolt.alpha;
        ctx.strokeStyle = bolt.color;
        ctx.shadowColor = "#fffbe6";
        ctx.shadowBlur = 18 * (dimensions.w / 912);
        ctx.lineWidth = (2.5 + Math.random() * 1.5) * (dimensions.w / 912);
        ctx.beginPath();
        ctx.moveTo(
          bolt.points[0][0] * (dimensions.w / 912),
          bolt.points[0][1] * (dimensions.h / 591.2)
        );
        for (let i = 1; i < bolt.points.length; i++) {
          ctx.lineTo(
            bolt.points[i][0] * (dimensions.w / 912),
            bolt.points[i][1] * (dimensions.h / 591.2)
          );
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
        bolt.life++;
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 200,
        position: "relative",
        background: "transparent",
        aspectRatio: "912/591.2",
        maxWidth: 912,
        maxHeight: 591.2,
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.w}
        height={dimensions.h}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <svg
        width={dimensions.w * 0.877}
        height={dimensions.h * 0.846}
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: dimensions.h * 0.05,
          width: "80%",
          height: "auto",
          maxWidth: 800,
          maxHeight: 500,
        }}
      >
        {/* Laptop */}
        <rect x="340" y="320" width="120" height="70" rx="12" fill="#23272e" />
        {/* Laptop screen */}
        <rect x="350" y="330" width="100" height="48" rx="8" fill="#1e293b" />
        {/* Coder head */}
        <ellipse cx="400" cy="270" rx="32" ry="32" fill="#fbbf24" />
        {/* Coder body */}
        <rect x="380" y="302" width="40" height="50" rx="18" fill="#38bdf8" />
        {/* Left arm */}
        <rect x="350" y="320" width="18" height="48" rx="9" fill="#fbbf24" transform="rotate(-18 350 320)" />
        {/* Right arm */}
        <rect x="432" y="320" width="18" height="48" rx="9" fill="#fbbf24" transform="rotate(18 432 320)" />
        {/* Animated code lines (beautiful effect) */}
        <g id="code-lines">
          <rect x="360" y="340" width="60" height="6" rx="3" fill="url(#code1)">
            <animate attributeName="width" values="60;90;60" dur="1.2s" repeatCount="indefinite" />
          </rect>
          <rect x="360" y="352" width="80" height="6" rx="3" fill="url(#code2)">
            <animate attributeName="width" values="80;50;80" dur="1.1s" repeatCount="indefinite" />
          </rect>
          <rect x="360" y="364" width="70" height="6" rx="3" fill="url(#code3)">
            <animate attributeName="width" values="70;100;70" dur="1.3s" repeatCount="indefinite" />
          </rect>
          <rect x="360" y="376" width="90" height="6" rx="3" fill="url(#code4)">
            <animate attributeName="width" values="90;60;90" dur="1.4s" repeatCount="indefinite" />
          </rect>
        </g>
        <rect x="445" y="340" width="6" height="40" rx="2" fill="#fff" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0;0.7" dur="1s" repeatCount="indefinite" />
        </rect>
        <defs>
          <linearGradient id="code1" x1="360" y1="340" x2="420" y2="346" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="code2" x1="360" y1="352" x2="440" y2="358" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbcfe8" />
            <stop offset="1" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="code3" x1="360" y1="364" x2="430" y2="370" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bae6fd" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="code4" x1="360" y1="376" x2="450" y2="382" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="1" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div
              className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden"
              style={{
                background: "transparent",
                minHeight: "220px",
                width: "100%",
                maxWidth: 912,
                aspectRatio: "912/591.2",
                margin: "0 auto",
              }}
            >
              <StarLightning3DCoder />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;