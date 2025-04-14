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

      // Appliquer un dégradé plus sombre mais avec des variations de couleurs visibles
      // Augmenter la luminosité pour mieux faire ressortir les couleurs tout en restant sombre
      // Utilisation de la position Y pour un dégradé vertical sur une plage plus grande
      const luminosity = (y + 31) / 120; // On augmente la différence de luminosité pour plus de variation

      // Dégradé du bleu en bas à plus clair en haut
      color.setHSL(0.55, 0.4, Math.min(0.4, luminosity)); // Réduire la luminosité pour un effet plus sombre
      // Bleu avec plus de saturation et luminosité plus marquée

      // Définir les couleurs du vertex (r, g, b)
      colorAttribute.setXYZ(i, color.r, color.g, color.b);
    }

    // Ajouter l'attribut de couleur à la géométrie
    geometry.setAttribute('color', colorAttribute);
  }, []);

  // Création du matériau avec les bons paramètres
  const material = new THREE.MeshStandardMaterial({
    metalness: 0.5, // Effet métallique
    roughness: 0.7, // Rugosité un peu plus élevée pour plus de mat
    emissive: new THREE.Color(0x003366), // Émissivité plus sombre (bleu foncé)
    side: THREE.DoubleSide, // Dessiner les deux faces
    vertexColors: true, // Utiliser les couleurs des vertices
  });

  return (
    <mesh ref={meshRef} position={[0, -31.02, 0]}>
      <cylinderGeometry args={[55, 55, 60, 20, 1, true]} />
      <meshStandardMaterial {...material} />
    </mesh>
  );
}
