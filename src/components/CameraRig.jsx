import { useThree, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();

  const cameraAnimationState = useRef({
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    rotX: camera.rotation.x,
    rotY: camera.rotation.y,
    rotZ: camera.rotation.z,
  });

  const targetPosition = useRef(new THREE.Vector3());
  const targetRotation = useRef(new THREE.Euler());
  const tl = useRef();

  const [scrollAmount, setScrollAmount] = useState(0);

  // 🔁 Recalculate scroll width on resize
  useEffect(() => {
    function calculateScrollAmount() {
      const projectsEl = document.getElementById("projects");
      if (projectsEl) {
        const parentWidth = projectsEl.parentElement.offsetWidth;
        const totalScrollWidth = projectsEl.scrollWidth;
    
        const paddingAfter = 60; 
    
        const amount = totalScrollWidth - parentWidth + paddingAfter;
        setScrollAmount(amount > 0 ? amount : 0);
      }
    }

    calculateScrollAmount();
    window.addEventListener("resize", calculateScrollAmount);
    return () => window.removeEventListener("resize", calculateScrollAmount);
  }, []);

  useEffect(() => {
    if (tl.current) tl.current.kill();

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: scroll.el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 1) self.scroll(self.end); // clamp to end
        },
      },
    });

    const { x, y, z, rotX, rotY, rotZ } = cameraAnimationState.current;

    tl.current
      .to(cameraAnimationState.current, {
        duration: 2,
        x,
        y: y - 0.2,
        z: z - 2,
        rotX,
        rotY: rotY + 6,
        rotZ,
        ease: "power2.out",
      }, 0)
      .to("#text-1", { opacity: 0, y: -20, duration: 0.6 }, 0.35)

      .to(cameraAnimationState.current, {
        duration: 2,
        y: "-=0.4",
        z: "-=1.5",
        rotX: "+=4",
        rotY: "-=10",
        rotZ: "-=3.75",
        ease: "power2.inOut",
      }, 3)
      .to("#text-2", { opacity: 1, y: 0, duration: 0.6 }, 1.7)
      .to("#text-2", { opacity: 0, y: -20, duration: 0.6 }, 3)

      .to(cameraAnimationState.current, {
        duration: 2,
        y: "-=1",
        ease: "power2.inOut",
      }, 6)
      .to("#text-3", { opacity: 1, duration: 0.6 }, 4)
      .to("#text-4", { opacity: 1, duration: 0 }, 7)
      .to("#text-3", { opacity: 0, duration: 0 }, 6.9)
      .to("#text-4", { y: 0, scale: 1.02, duration: 1, ease: "power2.out" }, 7)
      .to("#text-4", { opacity: 0, y: -20, duration: 0.6 }, 8)
      .to("#text-5", { opacity: 1, duration: 0.6 }, 11)
      .to("#text-5", { opacity: 0, duration: 0.6 }, 13)

      .to("#text-6", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, 14)

      // ✅ Use dynamic scrollAmount here
      .to("#projects", {
        opacity: 1,
        x: -scrollAmount,
        duration: 2,
        ease: "power2.in",
      }, 15)

      .to(cameraAnimationState.current, {
        duration: 2,
        x: "-=3",
        y: "-=1",
        z: "-=1.5",
        rotY: "+=5",
        ease: "power2.inOut",
      }, 9)

      .to(cameraAnimationState.current, {
        duration: 2,
        x: "+=1.5",
        y: "-=1.5",
        z: "+=0.5",
        rotX: "+=2",
        rotY: "-=4.5",
        ease: "power2.inOut",
      }, 12)

      .to(cameraAnimationState.current, {
        duration: 3,
        x: "+=3.5",
        y: "-=0",
        z: "+=2",
        rotX: "+=2",
        rotY: "+=0",
        ease: "power2.inOut",
      }, 15)

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, [camera, scrollAmount]);

  useFrame(() => {
    if (!tl.current) return;

    const scrollProgress = scroll.offset;
    tl.current.progress(scrollProgress);

    targetPosition.current.set(
      gsap.utils.interpolate(camera.position.x, cameraAnimationState.current.x, 0.1),
      gsap.utils.interpolate(camera.position.y, cameraAnimationState.current.y, 0.1),
      gsap.utils.interpolate(camera.position.z, cameraAnimationState.current.z, 0.1)
    );
    camera.position.lerp(targetPosition.current, 1);

    targetRotation.current.set(
      gsap.utils.interpolate(camera.rotation.x, cameraAnimationState.current.rotX, 0.1),
      gsap.utils.interpolate(camera.rotation.y, cameraAnimationState.current.rotY, 0.1),
      gsap.utils.interpolate(camera.rotation.z, cameraAnimationState.current.rotZ, 0.1)
    );
    camera.rotation.x = targetRotation.current.x;
    camera.rotation.y = targetRotation.current.y;
    camera.rotation.z = targetRotation.current.z;
  });

  return null;
}
