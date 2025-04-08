import { useThree, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();

  // État de la caméra contrôlé par GSAP
  const gsapObj = useRef({
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
    tl.current = gsap.timeline();

    const { x, y, z, rotX, rotY, rotZ } = gsapObj.current;

    // Point d’intérêt 1 (déplacement relatif)
    tl.current.to(gsapObj.current, {
      duration: 1,
      x: x ,
      y: y - 0.2,
      z: z - 2,
      rotX: rotX + 0,
      rotY: rotY + 6,
      rotZ: rotZ + 0,
      ease: "power1.out",
    }, 0);

    // Pause
    tl.current.to({}, { duration: 0.5 }, 1);

    // Point d’intérêt 2 (déplacement relatif)
    tl.current.to(gsapObj.current, {
      duration: 1,
      x: "+=0",
      y: "-=0.4",
      z: "-=1.5",
      rotX: "+=4",
      rotY: "-=13",
      rotZ: "-=3.75",
      ease: "power1.out",
    }, 1.5);

    // Pause
    tl.current.to({}, { duration: 0.5 }, 2.5);

    // Point d’intérêt 3 (déplacement relatif)
    tl.current.to(gsapObj.current, {
      duration: 1,
      x: "+=0",
      y: "-=1",
      z: "+=0",
      rotX: "+=0",
      rotY: "+=0",
      rotZ: "+=0",
      ease: "power1.out",
    }, 3);

    // Pause
    tl.current.to({}, { duration: 0.5 }, 4);

    // Point d’intérêt 4 (déplacement relatif)
    tl.current.to(gsapObj.current, {
      duration: 1,
      x: "-=3",
      y: "-=0.3",
      z: "+=0.5",
      rotX: "-=4",
      rotY: "+=6",
      rotZ: "+=3.75",
      ease: "power1.out",
    }, 4.5);
  }, []);

  useFrame(() => {
    if (!tl.current) return;

    // Scroll synchronisé avec GSAP timeline
    tl.current.progress(scroll.offset);

    // Interpolation smooth vers la position/rotation cible
    targetPosition.current.set(
      gsapObj.current.x,
      gsapObj.current.y,
      gsapObj.current.z
    );
    camera.position.lerp(targetPosition.current, 0.1);

    targetRotation.current.set(
      gsapObj.current.rotX,
      gsapObj.current.rotY,
      gsapObj.current.rotZ
    );
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, 0.1);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, 0.1);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.current.z, 0.1);
  });

  return null;
}
