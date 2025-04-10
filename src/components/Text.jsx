import { Text } from "@react-three/drei";

export default function OverlayText() {
  return (
    <Text
      position={[0, 2, -5]}  // Exemple de position dans la scène 3D
      fontSize={1}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Bienvenue dans la scène
    </Text>
  );
}
