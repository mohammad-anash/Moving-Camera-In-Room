import * as THREE from 'three';
import { RGBELoader, ThreeMFLoader } from 'three/examples/jsm/Addons.js';

let [width, height] = [window.innerWidth, window.innerHeight];
const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 4;

const rgbe = new RGBELoader();
rgbe.load('Static/country_club_1k.hdr', (environment) => {
  environment.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environment;
  scene.environment = environment;
});

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(width, height);

// Handle window resize
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix(); // Upda"360 panorama to cubemap converter"te the camera's projection matrix
  renderer.setSize(width, height);
});

const clock = new THREE.Clock();

// Animation loop
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  camera.rotation.y = elapsedTime * 0.2;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
