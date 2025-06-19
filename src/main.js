import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const container = document.getElementById("three-container");

// === Scene ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.z = 3;

// === Renderer ===
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// === Cube Geometry & Material ===
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("Assets/html.jpg"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("Assets/css.jpeg"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("Assets/JavaScript.png"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("Assets/php.jpeg"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("Assets/laravel.png"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("Assets/mysql.jpg"),
    }),
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
cube.scale.set(2, 2, 2); // Scale x, y, z to 2x size

// === Lighting ===
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft white light
scene.add(ambientLight);

// === Responsive Resize ===
window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth motion
controls.dampingFactor = 0.05;
controls.enableZoom = false;

let isUserInteracting = false;
// Stop spinning when user touches or clicks
renderer.domElement.addEventListener("pointerdown", () => {
    isUserInteracting = true;
});
renderer.domElement.addEventListener("pointerup", () => {
    isUserInteracting = false;
});

// Optional: mobile touch support
renderer.domElement.addEventListener("touchstart", () => {
    isUserInteracting = true;
});
renderer.domElement.addEventListener("touchend", () => {
    isUserInteracting = false;
});

// === Animation Loop ===
function animate() {
    requestAnimationFrame(animate);

    if (!isUserInteracting) {
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.008;
    }

    controls.update(); // Required if enableDamping is true
    renderer.render(scene, camera);
}
animate();
