// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Crear la esfera
const geometry = new THREE.SphereGeometry(5, 64, 64); // Radio 5 y mayor detalle
const textureLoader = new THREE.TextureLoader();
let sphere;

textureLoader.load('textura.png', (texture) => {
    const material = new THREE.MeshStandardMaterial({ map: texture }); // Usar MeshStandardMaterial para iluminación
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Ajustar la cámara
    camera.position.z = 10;
    
    // Configuración de los controles
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.maxPolarAngle = Math.PI / 2;

    // Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiental
    scene.add(ambientLight);

    // Animación de rotación aleatoria
    let isUserInteracting = false;

    function animate() {
        requestAnimationFrame(animate);

        if (!isUserInteracting) {
            // Rotación aleatoria continua
            sphere.rotation.x += 0.001 + Math.random() * 0.001;
            sphere.rotation.y += 0.001 + Math.random() * 0.001;
        }

        controls.update(); // Solo requerido si controls.enableDamping = true, or controls.autoRotate = true
        renderer.render(scene, camera);
    }

    animate();

    // Eventos del ratón
    renderer.domElement.addEventListener('mousedown', () => {
        isUserInteracting = true;
    });

    renderer.domElement.addEventListener('mouseup', () => {
        isUserInteracting = false;
    });

    renderer.domElement.addEventListener('mouseleave', () => {
        isUserInteracting = false;
    });

    renderer.domElement.addEventListener('mouseenter', () => {
        isUserInteracting = true;
    });
}, undefined, (error) => {
    console.error('Error al cargar la textura:', error);
});

// Ajustar tamaño y proporciones al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
