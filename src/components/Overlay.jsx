import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./overlay.css";

gsap.registerPlugin(ScrollTrigger);

export default function Overlay() {
  useEffect(() => {
    const sections = document.querySelectorAll(".overlay-section");

    sections.forEach((section, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top", // Start when the section reaches the top of the viewport
          end: "bottom top", // End when the section leaves the viewport
          scrub: true, // Smoothly animate based on scroll position
          pin: true, // Pin the section during its animation
          pinSpacing: false, // Avoid adding extra space
        },
      });

      // Customize animations for each section
      if (index === 0) {
        timeline.fromTo(
          section,
          { opacity: 1, y: 0 }, // Start visible
          { opacity: 1, y: 0, duration: 1 } // Keep it visible
        );
        timeline.to(section, { opacity: 0, y: -50, duration: 1 }); // Fade out and move up
      } else if (index === 1) {
        timeline.fromTo(
          section,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1 }
        );
        timeline.to(section, { opacity: 0, scale: 0.5, duration: 1 });
      } else if (index === 2) {
        timeline.fromTo(
          section,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1 }
        );
        timeline.to(section, { opacity: 0, x: 100, duration: 1 });
      } else if (index === 3) {
        timeline.fromTo(
          section,
          { opacity: 0, rotate: -15 },
          { opacity: 1, rotate: 0, duration: 1 }
        );
        timeline.to(section, { opacity: 0, rotate: 15, duration: 1 });
      }
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
        <h1>Goodbye</h1>
        <p>See you next time!</p>
      </div>
    </div>
  );
}
