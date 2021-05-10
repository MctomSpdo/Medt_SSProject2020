/**************************************************************************************************
 * MEDT - SSProject 2020
 * Author: Thomas Spindler
 * Project: Medientechnik Sommersemesterprojekt 2020 (Mars)
 * HTL Leonding -> 2 BHTIM
 * 
 * Page: Exploring Mars
 * Descripton: This is the OLD Version of the Exploring page, and is in NOT WORKING CONDITIONS!
 * Libs: ThreeJS
 * Tec used: WebGL
 * OUTDATED!
 **************************************************************************************************/

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/loaders/GLTFLoader.js';

// THREE.JS Scene: 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('CuriosityRender').appendChild(renderer.domElement);

renderer.physicallyCorrectLights = true;

// Load Curiosity Rover: 
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./examples/js/libs/draco/');
loader.setDRACOLoader(dracoLoader);

loader.load(
	'3D/models/Curiosity.glb',

	function (gltf) {
		scene.add(gltf.scene);
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset
	},

	function (xhr) {

		console.log((xhr.loaded / xhr.total * 100) + '% loaded');

	},
	// called when loading has errors
	function (error) {

		console.log('An error happened');

	}
);