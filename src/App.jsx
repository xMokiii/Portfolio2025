import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { Overlay } from "./components/Overlay";
import { Office } from "./components/Office";


function App() {
  return (
    <Canvas
      camera={{
        fov: 64,
        position: [2.3, 1.5, 2.3],
      }}
    >
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={3} damping={0.25}>
        <Overlay />
        <Office />
      </ScrollControls>
    </Canvas>
  );
}

export default App;
