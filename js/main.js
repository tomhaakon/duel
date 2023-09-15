import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { camera } from "./camera";
import { createControls, setupMovement } from "./controls.js";
import { createFloor } from "./floor";
import { createHemisphereLight } from "./light";

const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();
const plane = new THREE.Plane(new THREE.Vector3(1, 1, 0.2), 3);
const helper = new THREE.PlaneHelper(plane, 1, 0xffff00);

//stuff
const floor = createFloor();
const light = createHemisphereLight();

//controls
const controls = createControls(camera, renderer.domElement);

controls.addEventListener("end", () => {
  const zoomBox = document.getElementById("zoomBox");
  zoomBox.textContent = `Zoom Distance: ${camera.zoom.toFixed(3)}`;
  // console.log(camera.zoom.toFixed(2));
  // console.log(controls.object.zoom.toFixed(2));
  // console.log("Camera Position:", camera.position);
  // console.log("Control Target:", controls.target);
});

// Setup the movement
setupMovement(controls, camera);

const scene = new THREE.Scene();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//config
const modelScale = 18;

//loader
loader.load(
  "model/shaylushay/scene.gltf",
  function (gltf) {
    gltf.scene.rotation.y = Math.PI / 1.2;
    gltf.scene.scale.set(modelScale, modelScale, modelScale);

    // Calculate the bounding box of the model
    const bbox = new THREE.Box3().setFromObject(gltf.scene);

    // Set the Y position of the model such that its bottom touches the floor
    gltf.scene.position.y = -bbox.min.y;

    scene.add(gltf.scene);
    scene.add(light);
    scene.add(floor);

    scene.add(helper);
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

  // Update camera position display
  const position = camera.position;
  document.getElementById(
    "cameraPosition"
  ).textContent = `Camera Position: x=${position.x.toFixed(
    2
  )}, y=${position.y.toFixed(2)}, z=${position.z.toFixed(2)}`;
}
