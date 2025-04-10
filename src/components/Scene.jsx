import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import Overlay from "./Overlay";
import Iceberg from "./Iceberg";
import CameraRig from "./CameraRig";

export default function Scene() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* HTML Overlay */}
      <Overlay />

      {/* 3D Canvas */}
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
      </Canvas>
    </div>
  );
}
