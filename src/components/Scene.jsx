// Scene.js
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import Overlay from "./Overlay";
import Iceberg from "./Iceberg";
import CameraRig from "./CameraRig";
import CloudGroup from "./Cloud";
import Lights from "./Light";
import Cylinder from "./Cylinder";

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
        {/* Lumières de la scène */}
        <Lights />

        {/* Contrôles Orbit, permettant d'ajuster la vue */}
        <OrbitControls enableZoom={false} enableRotate={false} />

        {/* Scroll Controls pour scroller à travers la scène */}
        <ScrollControls pages={5} damping={0.25}>
          <Iceberg />
          <CloudGroup count={50} />
          <CameraRig />
        </ScrollControls>

        {/* Géométrie du cylindre */}
        <Cylinder />
      </Canvas>
    </div>
  );
}
