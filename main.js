import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const floorGeometry = new THREE.PlaneGeometry(200, 200); // Dimensions: 200x200, adjust as needed
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 }); // Gray color, adjust as desired
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//config
const modelScale = 18;

//light
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 5);

//camera

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 100;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
  cameraWidth / 2, // right
  cameraHeight / 2, // top
  cameraHeight / -2, // bottom
  0, // near plane
  1000 // far plane
);
//camera.position.z = 1;
camera.position.set(0, 50, 100);
camera.lookAt(20, 50, 0);

//floor
floorMesh.rotation.x = -Math.PI / 2; // This rotates the plane to make it horizontal
floorMesh.position.y = 0; // Position it at y=0 or wherever you want the floor height to be

const controls = new OrbitControls(camera, renderer.domElement);
loader.load(
  "model/shaylushay/scene.gltf",
  function (gltf) {
    gltf.scene.rotation.y = Math.PI / 1.4; // This will rotate the model 45 degrees around the Y-axis
    gltf.scene.scale.set(modelScale, modelScale, modelScale); // Adjust these values as needed
    gltf.scene.position.set(10, 0, 0); // Example values; adjust as necessary

    scene.add(gltf.scene);
    scene.add(light);
    scene.add(floorMesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
