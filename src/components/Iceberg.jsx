import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import WaterEffect from "./WaterEffect";

export default function IceBerg(props) {
  const { nodes, materials } = useGLTF("./models/IcebergFinal.glb");
  const ref = useRef();
  

  return (
    <group {...props} dispose={null} ref={ref}>
      <WaterEffect resolution={512} />
      <mesh
        geometry={nodes.Mesh_0.geometry}
        material={materials.Material_0}
        scale={3}
        position={[0, -1.93, -1]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("./models/IcebergFinal.glb");
