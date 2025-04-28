import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";

// Import des logos depuis le dossier public
const IMGS = [
  { src: "/public/skills/react.svg", alt: "Logo React", name: "React" },
  { src: "/public/skills/javascript.svg", alt: "Logo JavaScript", name: "JavaScript" },
  { src: "/public/skills/html.svg", alt: "Logo HTML", name: "HTML" },
  { src: "/public/skills/css.svg", alt: "Logo CSS", name: "CSS" },
  { src: "/public/skills/php.svg", alt: "Logo PHP", name: "PHP" },
  { src: "/public/skills/python.svg", alt: "Logo Python", name: "Python" },
  { src: "/public/skills/sql.svg", alt: "Logo SQL Database", name: "SQL" },
  { src: "/public/skills/csharp.svg", alt: "Logo C#", name: "C#" },
  { src: "/public/skills/git.svg", alt: "Logo Git", name: "Git" },
  { src: "/public/skills/jira.svg", alt: "Logo Jira", name: "Jira" },
  { src: "/public/skills/vue.svg", alt: "Logo Vue", name: "Vue" },
  { src: "/public/skills/nuxt.svg", alt: "Logo Nuxt", name: "Nuxt" },
  { src: "/public/skills/supabase.svg", alt: "Logo Supabase", name: "Supabase" },

];

const Gallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );
  const [activeTech, setActiveTech] = useState(""); // État pour le nom de la techno active

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.4;
  const radius = cylinderWidth / (2 * Math.PI);

  // Framer Motion
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Convert rotation -> 3D transform
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (name) => {
    setActiveTech(name); // Met à jour le nom de la techno active
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    setActiveTech(""); // Réinitialise le nom de la techno active
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="pointer-events-auto relative w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(f,f,f,0) 0%, #060606 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(f,f,f,0) 0%, #060606 100%)",
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
              onMouseEnter={() => handleMouseEnter(img.name)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="pointer-events-none h-[120px] w-[300px] rounded-[15px] border-[3px] border-white object-contain
                           transition-transform duration-300 ease-out group-hover:scale-105
                           sm:h-[100px] sm:w-[220px] m-3"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Conteneur pour afficher le nom de la techno active */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <p className="text-lg xl:text-xl 2xl:text-3xl text-black">
          {activeTech || "Survolez une technologie"}
        </p>
      </div>
    </div>
  );
};

export default Gallery;
