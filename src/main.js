import "./style.css";
import "./header.css";
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
        map: new THREE.TextureLoader().load("/Assets/html.jpg"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("/Assets/css.jpeg"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("/Assets/JavaScript.png"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("/Assets/php.jpeg"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("/Assets/laravel.png"),
    }),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("/Assets/mysql.jpg"),
    }),
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
cube.scale.set(2, 2, 2); // Scale x, y, z to 2x size

// === Lighting ===
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Soft white light
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

// This is for background stars

const canvasBackground = document.getElementById("background-stars");
const rendererBackground = new THREE.WebGLRenderer({
    canvas: canvasBackground,
    alpha: true,
});
rendererBackground.setPixelRatio(window.devicePixelRatio);

// Resize to full scroll height
function resizeCanvasToBody() {
    const width = document.body.scrollWidth;
    const height = document.body.scrollHeight;
    rendererBackground.setSize(width, height);
    cameraBackground.aspect = width / height;
    cameraBackground.updateProjectionMatrix();
}
window.addEventListener("resize", resizeCanvasToBody);

// Scene setup
const sceneBackground = new THREE.Scene();
const cameraBackground = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
cameraBackground.position.z = 1;

// Create stars with random movement
const starGeometry = new THREE.BufferGeometry();
const starCount = 8800;
const starVertices = [];
const starVelocities = [];

for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = Math.random() * document.documentElement.scrollHeight;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);

    starVelocities.push({
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
        dz: (Math.random() - 0.5) * 0.1,
    });
}

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
);

// OPTIONAL: load glow texture if you want glowing stars
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    // map: new THREE.TextureLoader().load('star.png'),
    // transparent: true,
    // blending: THREE.AdditiveBlending,
    // depthWrite: false,
});

const stars = new THREE.Points(starGeometry, starMaterial);
sceneBackground.add(stars);

// Animation loop
function animateBackground() {
    requestAnimationFrame(animateBackground);

    const positions = starGeometry.attributes.position.array;

    for (let i = 0; i < starCount; i++) {
        const index = i * 3;

        // Move star
        positions[index] += starVelocities[i].dx;
        positions[index + 1] += starVelocities[i].dy;
        positions[index + 2] += starVelocities[i].dz;

        // Bounce logic (optional)
        if (positions[index] > 1000 || positions[index] < -1000)
            starVelocities[i].dx *= -1;
        if (
            positions[index + 1] > document.documentElement.scrollHeight ||
            positions[index + 1] < 0
        )
            starVelocities[i].dy *= -1;
        if (positions[index + 2] > 0 || positions[index + 2] < -2000)
            starVelocities[i].dz *= -1;

        // Reset star if far out of bounds
        if (
            positions[index] > 2000 ||
            positions[index] < -2000 ||
            positions[index + 1] >
                document.documentElement.scrollHeight + 100 ||
            positions[index + 1] < -100 ||
            positions[index + 2] > 0 ||
            positions[index + 2] < -3000
        ) {
            positions[index] = (Math.random() - 0.5) * 2000;
            positions[index + 1] =
                Math.random() * document.documentElement.scrollHeight;
            positions[index + 2] = -Math.random() * 2000;

            starVelocities[i] = {
                dx: (Math.random() - 0.5) * 0.1,
                dy: (Math.random() - 0.5) * 0.1,
                dz: (Math.random() - 0.5) * 0.1,
            };
        }
    }

    starGeometry.attributes.position.needsUpdate = true;
    rendererBackground.render(sceneBackground, cameraBackground);
}

resizeCanvasToBody();
animateBackground();
