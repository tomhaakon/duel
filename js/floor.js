// floor.js
import * as THREE from "three";

function createFloor() {
  const geometry = new THREE.PlaneGeometry(200, 200); // Adjust size as needed
  const material = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide,
  });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = Math.PI / 2; // Rotate to lie flat
  floor.position.y = 0; // Adjust position as needed

  return floor;
}

export { createFloor };
