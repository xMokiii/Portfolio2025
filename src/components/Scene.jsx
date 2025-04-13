import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import Overlay from "./Overlay";
import Iceberg from "./Iceberg";
import CameraRig from "./CameraRig";
import * as THREE from "three";


export default function Scene() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Overlay />
      <Canvas
        camera={{
          fov: 50,
          position: [3, 0, 0],
        }}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <OrbitControls enableZoom={false} enableRotate={false} />
        <ScrollControls pages={5} damping={0.25}>
          <Iceberg />
          <CameraRig />
        </ScrollControls>
        <mesh position={[0, -61, 0]}>
          <cylinderGeometry args={[55, 55, 120, 20, 1, true]} />
          <meshBasicMaterial color={0x041c2c} side={THREE.DoubleSide} />
        </mesh>
      </Canvas>
    </div>
  );
}
