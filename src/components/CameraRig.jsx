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
    tl.current = gsap.timeline();

    const { x, y, z, rotX, rotY, rotZ } = cameraAnimationState.current;

    // Using stagger to animate multiple properties at different timings
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: x,
      y: y - 0.2,
      z: z - 2,
      rotX,
      rotY: rotY + 6,
      rotZ,
      ease: "smooth",
      stagger: 0.5, // This adds a delay between each element
    }, 0);

    // Staggering the second part of the animation for a cascading effect
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "+=0",
      y: "-=0.4",
      z: "-=1.5",
      rotX: "+=4",
      rotY: "-=13",
      rotZ: "-=3.75",
      ease: "smooth",
      stagger: 0.5, // This adds a delay between each element
    }, 2.5);

    // Point of interest 3 with stagger effect
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "+=0",
      y: "-=1",
      z: "+=0",
      rotX: "+=0",
      rotY: "+=0",
      rotZ: "+=0",
      ease: "smooth",
      stagger: 0.5,// Applying stagger to further animations
    }, 5);

    // Final point with stagger for camera animation
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "-=3",
      y: "-=0.3",
      z: "+=0.5",
      rotX: "-=4",
      rotY: "+=6",
      rotZ: "+=3.75",
      ease: "smooth",
      stagger: 0.5, // Again using stagger
    }, 7.5);

  }, [camera]);

  useFrame(() => {
    if (!tl.current) return;

    // Synchronize scroll with GSAP timeline
    tl.current.progress(scroll.offset);

    // Interpolate camera position and rotation efficiently
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
