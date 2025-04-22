// Cylinder.js
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Cylinder() {
  const meshRef = useRef(null);

  useEffect(() => {
    const geometry = meshRef.current.geometry;

    // Créer un BufferAttribute pour les couleurs des vertices
    const colorAttribute = new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 3), 3);

    // Appliquer un dégradé de couleur basé sur la position Y du vertex
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      const y = geometry.attributes.position.getY(i); // Position Y du vertex
      const color = new THREE.Color();

      // Appliquer un dégradé encore plus sombre et étendre plus haut
      // Diminuer encore la luminosité pour rendre le cylindre plus sombre
      // L'échelle de Y est étendue pour un dégradé plus long
      color.setHSL(0.55, 0.4, (y + 61) / 300); // Luminosité encore plus faible pour une ombre plus marquée

      // Définir les couleurs du vertex (r, g, b)
      colorAttribute.setXYZ(i, color.r, color.g, color.b);
    }

    // Ajouter l'attribut de couleur à la géométrie
    geometry.setAttribute('color', colorAttribute);
  }, []);

  // Création du matériau avec les bons paramètres
  const material = new THREE.MeshStandardMaterial({
    metalness: 0.5, // Effet métallique
    roughness: 0.7, // Augmenter la rugosité pour plus de mat
    emissive: new THREE.Color(0x002a47), // Émissivité plus sombre (bleu très foncé)
    side: THREE.DoubleSide, // Dessiner les deux faces
    vertexColors: true, // Utiliser les couleurs des vertices
  });

  return (
    <mesh ref={meshRef} position={[0, -61, 0]}>
      <cylinderGeometry args={[55, 55, 120, 20, 1, true]} />
      <meshStandardMaterial {...material} />
    </mesh>
  );
}
