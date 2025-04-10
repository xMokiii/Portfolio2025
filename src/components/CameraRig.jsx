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

    // First animation (with stagger for smooth delay effect)
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: x,
      y: y - 0.2,
      z: z - 2,
      rotX,
      rotY: rotY + 6,
      rotZ,
      ease: "power2.inOut",// Delay between each property update
    }, 0.5);

    // Second animation
    tl.current.to(cameraAnimationState.current, {
      duration: 3,
      x: "+=0",
      y: "-=0.4",
      z: "-=1.5",
      rotX: "+=4",
      rotY: "-=13",
      rotZ: "-=3.75",
      ease: "power2.inOut",// Delay between each property update
    }, 3);

    // Third animation
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "+=0",
      y: "-=2",
      z: "+=0",
      rotX: "+=0",
      rotY: "+=0",
      rotZ: "+=0",
      ease: "power2.inOut",
      stagger: 0.5,
    }, 6);

    // Fourth and final animation
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "-=3",
      y: "-=0.3",
      z: "+=0.5",
      rotX: "-=4",
      rotY: "+=6",
      rotZ: "+=3.75",
      ease: "power2.inOut",
    }, 8.5);

    return () => {
      if (tl.current) {
        tl.current.kill();  // Cleanup the timeline on unmount
      }
    };
  }, [camera]);

  useFrame(() => {
    if (!tl.current) return;

    // Synchronize scroll offset with GSAP timeline progress
    const scrollProgress = scroll.offset;  // Get scroll offset (0 to 1)
    tl.current.progress(scrollProgress);  // Set the progress based on scroll

    // Interpolate camera position
    targetPosition.current.set(
      gsap.utils.interpolate(camera.position.x, cameraAnimationState.current.x, 0.1),
      gsap.utils.interpolate(camera.position.y, cameraAnimationState.current.y, 0.1),
      gsap.utils.interpolate(camera.position.z, cameraAnimationState.current.z, 0.1)
    );

    camera.position.lerp(targetPosition.current, 1);

    // Interpolate camera rotation
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
