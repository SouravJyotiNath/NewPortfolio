import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";

const LIGHT_COLORS = [
  "radial-gradient(circle, #fffbe6 0%, #fde68a 60%, #fbcfe8 100%)",
  "radial-gradient(circle, #bae6fd 0%, #ddd6fe 60%, #fbcfe8 100%)",
  "radial-gradient(circle, #bbf7d0 0%, #fde68a 60%, #fdba74 100%)",
  "radial-gradient(circle, #fca5a5 0%, #fde68a 60%, #bae6fd 100%)",
];

const Home = () => {
  const lightRefs = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      ".home-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
    gsap.to(".profile-3d-img", {
      rotateY: 18,
      rotateX: 8,
      scale: 1.07,
      boxShadow: "0 16px 48px #bae6fd55, 0 2px 8px #fbcfe899",
      filter: "brightness(1.08) saturate(1.12)",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      keyframes: [
        { rotateY: -14, rotateX: -6, scale: 1.03, boxShadow: "0 8px 32px #bbf7d099, 0 2px 8px #fde68a99", filter: "brightness(1.04) saturate(1.08)", duration: 1.2 },
        { rotateY: 0, rotateX: 0, scale: 1, boxShadow: "0 4px 16px #ddd6fe99, 0 1.5px 0 #fdba7499", filter: "brightness(1) saturate(1)", duration: 1.1 },
      ],
    });
  });

  // Animation of lights moving randomly in the image
  useEffect(() => {
    const lights = lightRefs.current;
    const lightCount = lights.length;
    const animateLight = (i) => {
      const minR = 180, maxR = 210;
      const radius = minR + Math.random() * (maxR - minR);
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      gsap.to(lights[i], {
        x,
        y,
        duration: 1.5 + Math.random() * 1.5,
        ease: "power1.inOut",
        onComplete: () => animateLight(i),
      });
    };
    lights.forEach((_, i) => animateLight(i));
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-16 md:pt-35 pb-0"
      style={{ marginBottom: 0,  marginTop: 0 }}
    >
      {/* <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div> */}

      <div className="home-layout flex flex-col md:flex-row items-start md:items-start">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 !mb-20">
          <div className="flex flex-col gap-7">
            <div className="home-text">
              <h1>
                Fresh
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>to Life Through Smart,</h1>
              <h1>Purposeful Development.</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              I'm Sourav Jyoti Nath, a developer from India turning ideas into code.
            </p>

            <Button
              text="View My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        <figure className="relative w-full md:w-auto flex items-center justify-center md:justify-end !mt-0">
          <div
            className="
              w-[70vw] max-w-[320px] min-w-[140px] aspect-square
              md:w-[320px] md:max-w-[340px] md:min-w-[180px]
              flex items-center justify-center
              mx-auto
              md:mx-0
              md:mr-50
              md:mt-10
              mt-10
              perspective-[1200px]
            "
            style={{ position: "relative" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                ref={el => (lightRefs.current[i] = el)}
                className="pointer-events-none"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: LIGHT_COLORS[i % LIGHT_COLORS.length],
                  boxShadow: "0 0 32px 12px #fde68a55, 0 0 8px 2px #fbcfe855",
                  opacity: 0.55,
                  zIndex: 2,
                  transform: "translate(-50%, -50%)",
                  filter: "blur(2px)",
                  mixBlendMode: "screen",
                }}
              />
            ))}
            <img
              src="/images/personal.jpeg"
              alt="Sourav Jyoti Nath"
              className="profile-3d-img shadow-xl"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: "18px",
                background: "none",
                transition: "box-shadow 0.3s, filter 0.3s",
                maxHeight: 340,
                transformStyle: "preserve-3d",
                zIndex: 1,
              }}
              draggable={false}
            />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Home;