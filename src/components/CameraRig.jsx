import { useThree, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

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

  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: scroll.el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const { x, y, z, rotX, rotY, rotZ } = cameraAnimationState.current;

    // 1. Animation de la caméra + texte 1
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: x,
      y: y - 0.2,
      z: z - 2,
      rotX,
      rotY: rotY + 6,
      rotZ,
      ease: "power2.out",
    }, 0)
      .to("#text-1", { opacity: 0, y: -20, duration: 0.6 }, 0.35);

    // 2. Animation de la caméra + texte 2
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "+=0",
      y: "-=0.4",
      z: "-=1.5",
      rotX: "+=4",
      rotY: "-=10",
      rotZ: "-=3.75",
      ease: "power2.inOut",
    }, 3)
      .to("#text-2", { opacity: 1, y: 0, duration: 0.6 }, 1.7)
      .to("#text-2", { opacity: 0, y: -20, duration: 0.6 }, 3);

    // 3. Animation de la caméra + texte 3
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "+=0",
      y: "-=1",
      z: "+=0",
      rotX: "+=0",
      rotY: "+=0",
      rotZ: "+=0",
      ease: "power2.inOut",
    }, 6)
      .to("#text-3", { opacity: 1, duration: 0.6 }, 4)
      .to("#text-4", { opacity: 1, duration: 0 }, 7)
      .to("#text-3", { opacity: 0, duration: 0 }, 6.9)
      .to("#text-4", { y: 0, scale: 1.02, duration: 1, ease: "power2.out" }, 7)
      .to("#text-4", { opacity: 0, y: -20, duration: 0.6 }, 8);

    // 4. Animation de la caméra + texte 4
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "-=3",
      y: "-=1",
      z: "-=1.5",
      rotX: "-=0",
      rotY: "+=3",
      rotZ: "+=0",
      ease: "power2.inOut",
    }, 9)
      .to("#text-4", { opacity: 1, y: 0, duration: 0.6 }, 7.7)
      .to("#text-4", { opacity: 0, y: -20, duration: 0.6 }, 9);



      
    return () => {
      if (tl.current) tl.current.kill();
    };
  }, [camera]);

  useFrame(() => {
    if (!tl.current) return;

    // Synchroniser le défilement avec la progression de la timeline GSAP
    const scrollProgress = scroll.offset; // Obtenir la progression du défilement (0 à 1)
    tl.current.progress(scrollProgress); // Définir la progression basée sur le défilement

    // Interpolation de la position de la caméra
    targetPosition.current.set(
      gsap.utils.interpolate(camera.position.x, cameraAnimationState.current.x, 0.1),
      gsap.utils.interpolate(camera.position.y, cameraAnimationState.current.y, 0.1),
      gsap.utils.interpolate(camera.position.z, cameraAnimationState.current.z, 0.1)
    );

    camera.position.lerp(targetPosition.current, 1);

    // Interpolation de la rotation de la caméra
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
