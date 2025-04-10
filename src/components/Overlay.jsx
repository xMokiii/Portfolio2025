import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./overlay.css";

gsap.registerPlugin(ScrollTrigger);

export default function Overlay() {
  useEffect(() => {
    const sections = document.querySelectorAll(".overlay-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div id="overlay">
      <div className="overlay-section" id="text-1">
        <h1>Welcome to the Scene</h1>
        <p>Scroll down to explore the content.</p>
      </div>
      <div className="overlay-section" id="text-2">
        <h1>Discover More</h1>
        <p>Learn about the amazing features of this project.</p>
      </div>
      <div className="overlay-section" id="text-3">
        <h1>Thank You</h1>
        <p>We hope you enjoyed the experience!</p>
      </div>
      <div className="overlay-section" id="text-4">
        <h1>Thank You</h1>
        <p>We hope you enjoyed the experience!</p>
      </div>
    </div>
  );
}
