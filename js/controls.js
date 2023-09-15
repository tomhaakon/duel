import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);

  return controls;
}

export function setupMovement(controls, camera) {
  document.addEventListener("keydown", (event) => {
    const moveAmount = 5; // Adjust as needed
    switch (event.key) {
      case "w": // W key
        controls.position0.x -= moveAmount;
        console.log(camera.position);
        break;
      case "s": // S key
        camera.position.z += moveAmount;
        break;
      case "a": // A key
        camera.position.x -= moveAmount;
        break;
      case "d": // D key
        camera.position.x += moveAmount;
        break;
    }

    controls.update();
    return controls;
  });
}

export { createControls };
