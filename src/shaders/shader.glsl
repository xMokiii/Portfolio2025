precision highp float;

uniform float uOpacity;

uniform vec3 uTroughColor;   // Couleur sombre de la base des vagues
uniform vec3 uSurfaceColor;  // Couleur claire et dense de la surface
uniform vec3 uPeakColor;     // Couleur des crêtes des vagues

uniform float uPeakThreshold;
uniform float uPeakTransition;
uniform float uTroughThreshold;
uniform float uTroughTransition;

uniform float uFresnelScale;
uniform float uFresnelPower;

varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform samplerCube uEnvironmentMap;

void main() {
  // Calculer le vecteur du sommet vers la caméra
  vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
  
  // Calculer la direction du reflet en utilisant la normale
  vec3 reflectedDirection = reflect(viewDirection, vNormal);
  
  // Corriger la direction du reflet
  reflectedDirection.x = -reflectedDirection.x;

  // Échantillonner la texture de l'environnement pour obtenir la couleur du reflet
  vec4 reflectionColor = textureCube(uEnvironmentMap, reflectedDirection);

  // Calculer l'effet Fresnel
  float fresnel = uFresnelScale * pow(1.0 - clamp(dot(viewDirection, vNormal), 0.0, 1.0), uFresnelPower);

  // Calculer la hauteur (élévation) du point courant
  float elevation = vWorldPosition.y;

  // Transition pour la couleur des crêtes et des creux
  float peakFactor = smoothstep(uPeakThreshold - uPeakTransition, uPeakThreshold + uPeakTransition, elevation);
  float troughFactor = smoothstep(uTroughThreshold - uTroughTransition, uTroughThreshold + uTroughTransition, elevation);

  // Mélanger entre la couleur du creux et la couleur de la surface
  vec3 mixedColor1 = mix(uTroughColor, uSurfaceColor, troughFactor);

  // Mélanger entre la couleur de la surface et la couleur des crêtes des vagues
  vec3 mixedColor2 = mix(mixedColor1, uPeakColor, peakFactor);

  // Mélanger la couleur finale avec la couleur du reflet selon l'effet Fresnel
  vec3 finalColor = mix(mixedColor2, reflectionColor.rgb, fresnel);

  // Appliquer l'opacité
  gl_FragColor = vec4(finalColor, uOpacity);
}
