import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Overlay } from "./Overlay";
import Office from "./Office";
import CameraRig from "./CameraRig";

export default function Scene() {
  return (
    <Canvas
      camera={{
        fov: 50,
        position: [3, 1, 0],
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={false} enableRotate={false} />

      {/* ScrollControls englobe tout le contenu scrollable 3D et HTML */}
      <ScrollControls pages={3} damping={0.25}>
        {/* Partie HTML du scroll (ton overlay visible) */}
        <Overlay />

        {/* Partie 3D */}
        <Office />
        <CameraRig />
      </ScrollControls>
    </Canvas>
  );
}
