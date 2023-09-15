// lighting.js
import * as THREE from "three";

function createHemisphereLight() {
  return new THREE.HemisphereLight(0xffffbb, 0x080820, 5);
}

// Add more light creation functions as needed

export { createHemisphereLight };
