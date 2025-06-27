import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const today = new Date();
  const dateString = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;
  const dayString = today.toLocaleDateString(undefined, { weekday: "long" });

  useEffect(() => {
    setSeconds(0);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  useGSAP(() => {
    gsap.utils.toArray(".counter-box").forEach((box, i) => {
      ScrollTrigger.create({
        trigger: box,
        start: "top 90%",
        onEnter: () => {
          gsap.fromTo(
            box,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            }
          );
        },
        onLeaveBack: () => {
          gsap.to(box, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.5,
            ease: "power3.in",
          });
        },
        onEnterBack: () => {
          gsap.fromTo(
            box,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            }
          );
        },
        onLeave: () => {
          gsap.to(box, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.5,
            ease: "power3.in",
          });
        },
      });
    });
  }, []);

  return (
    <div className="padding-x-lg mt-40 sm:mt-50 xl:-mt-30">
      <div className="counter-row mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full max-w-4xl">
        {/* Time on Page */}
        <div className="counter-box bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 sm:px-8 py-4 rounded-xl shadow-lg flex flex-col items-center min-w-[120px] w-full sm:w-auto border border-blue-100 mb-4 sm:mb-0">
          <span className="text-2xl sm:text-3xl font-bold text-neutral-900 drop-shadow">{formatTime(seconds)}</span>
          <span className="text-neutral-700 text-xs sm:text-sm mt-1">Time on Page</span>
        </div>
        {/* Today's Date */}
        <div className="counter-box bg-gradient-to-br from-green-50 via-white to-green-100 px-6 sm:px-8 py-4 rounded-xl shadow-lg flex flex-col items-center min-w-[120px] w-full sm:w-auto border border-green-100 mb-4 sm:mb-0">
          <span className="text-2xl sm:text-3xl font-bold text-neutral-900 drop-shadow">{dateString}</span>
          <span className="text-neutral-700 text-xs sm:text-sm mt-1">Today's Date</span>
        </div>
        {/* Day */}
        <div className="counter-box bg-gradient-to-br from-pink-50 via-white to-pink-100 px-6 sm:px-8 py-4 rounded-xl shadow-lg flex flex-col items-center min-w-[120px] w-full sm:w-auto border border-pink-100">
          <span className="text-2xl sm:text-3xl font-bold text-neutral-900 drop-shadow">{dayString}</span>
          <span className="text-neutral-700 text-xs sm:text-sm mt-1">Day</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCounter;