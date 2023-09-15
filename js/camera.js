// camera.js
import * as THREE from "three";

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 100;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
  cameraWidth / 2, // right
  cameraHeight / 2, // top
  cameraHeight / -2, // bottom
  0, // near plane
  2000 // far plane
);
// x y z

//camera.position.set(0, 0, 0);
//camera.lookAt(0, 0, 0);

camera.position.z = 40;

export { camera };
