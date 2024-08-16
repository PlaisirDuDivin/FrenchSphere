// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Crear la esfera
const geometry = new THREE.SphereGeometry(5, 32, 32); // Radio de 5
const texture = new THREE.TextureLoader().load('textura.png');
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Configuración de la cámara
camera.position.z = 10; // Ajustado para ver la esfera más grande

// Controles de órbita
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Renderizar la escena
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
