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
  
    // 1. Camera anim + text 1
    
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: x,
      y: y - 0.2,
      z: z - 2,
      rotX,
      rotY: rotY + 6,
      rotZ,
      ease: "power2.inOut",
    }, 0)
    .to("#text-1", { opacity: 1, y: 0, duration: 1 }, 0)
    .to("#text-1", { opacity: 0, y: -20, duration: 1 }, 1);
  
    // 2. Camera anim + text 2
    tl.current.to(cameraAnimationState.current, {
      duration: 3,
      x: "+=0",
      y: "-=0.4",
      z: "-=1.5",
      rotX: "+=4",
      rotY: "-=13",
      rotZ: "-=3.75",
      ease: "power2.inOut",
    }, 3)
    .to("#text-2", { opacity: 1, y: 0, duration: 1 }, 3)
    .to("#text-2", { opacity: 0, y: -20, duration: 1 }, 6);
  
    // 3. Camera anim + text 3
    tl.current.to(cameraAnimationState.current, {
      duration: 2,
      x: "+=0",
      y: "-=1",
      z: "+=0",
      rotX: "+=0",
      rotY: "+=0",
      rotZ: "+=0",
      ease: "power2.inOut",
    }, 6.5)
    .to("#text-3", { opacity: 1, y: 0, duration: 1 }, 6.5)
    .to("#text-3", { opacity: 0, y: -20, duration: 1 }, 8.5);
  
    // 4. Camera anim + text 4
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
    .to("#text-4", { opacity: 1, y: 0, duration: 1 }, 9)
    .to("#text-4", { opacity: 0, y: -20, duration: 1 }, 11);
  
    // tl.current.to(cameraAnimationState.current, {
    //   duration: 2,
    //   x: "-=3",
    //   y: "-=0.3",
    //   z: "+=0.5",
    //   rotX: "-=4",
    //   rotY: "+=6",
    //   rotZ: "+=3.75",
    //   ease: "power2.inOut",
    // }, 11)
    // .to("#text-5", { opacity: 1, y: 0, duration: 1 }, 11) 

    return () => {
      if (tl.current) tl.current.kill();
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
