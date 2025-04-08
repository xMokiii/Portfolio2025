import { useThree, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();

  const gsapObj = useRef({
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    rotY: camera.rotation.y,
  });

  const targetPosition = useRef(new THREE.Vector3());
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    // Premier point d’intérêt (animation fluide)
    tl.current.to(gsapObj.current, {
      duration: 2, // temps pour s'arrêter au premier point
      x: -2,
      y: 1.5,
      z: 2,
      rotY: -Math.PI / 6,
      ease: "circ.inOut", // mouvement rapide puis pause
    }, 0);

    // Deuxième point d’intérêt
    tl.current.to(gsapObj.current, {
      duration: 2, // temps pour s'arrêter au deuxième point
      x: 1,
      y: 1.2,
      z: 3,
      rotY: -Math.PI / 3,
      ease: "circ.inOut", // même easing pour l'effet fluide
    }, 2); // commence après le premier mouvement (au temps 2)
  }, []);

  useFrame(() => {
    if (!tl.current) return;

    // Avance dans la timeline en fonction du scroll
    tl.current.progress(scroll.offset);

    // Position cible pour le lerp
    targetPosition.current.set(
      gsapObj.current.x,
      gsapObj.current.y,
      gsapObj.current.z
    );

    // Applique les interpolations smooth
    camera.position.lerp(targetPosition.current, 0.1);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, gsapObj.current.rotY, 0.1);
  });

  return null;
}
