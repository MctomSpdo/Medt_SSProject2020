/**************************************************************************************************
 * MEDT - SSProject 2020
 * Author: Martin Huemer, Thomas Spindler
 * Project: Medientechnik Sommersemesterprojekt 2020 (Mars)
 * HTL Leonding -> 2 BHTIM
 * 
 * Page: Exploring Mars
 * Descripton: This Js loads and embeds the 3D Models of the Satelite and the Mars Rovers.
 * Libs: ThreeJS, ThreeJS GLTFLOADER, ThreeJS Orbit Controls
 * Tec used: WebGL
 **************************************************************************************************/

// IMPORT THREE.JS @ v127
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js";

// IMPORT LOADER @ v127
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

// IMPORT ORBIT CONTROLLS @127
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js";

let height = 1.5;
/**
 * Curiosity Rover:
 */
let curscene, curcamera, currenderer, curcontrols;
let curbox = document.getElementById('CuriosityRender');

function curinit() {
	curscene = new THREE.Scene();
	curcamera = new THREE.PerspectiveCamera(60, curbox.offsetWidth / (window.innerHeight / height), 0.1, 1000);
	curcamera.position.set(-2, 2, 5);

	currenderer = new THREE.WebGLRenderer({ alpha: true });
	currenderer.setSize(curbox.offsetWidth, window.innerHeight / height);
	curbox.appendChild(currenderer.domElement);

	//light:
	const light = new THREE.AmbientLight(0xffffff);
	light.intensity = 0.5;
	curscene.add(light);

	//directional lights: 
	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(1, 10, 5);
	dirLight1.intensity = 0.5;
	curscene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0xffffff);
	dirLight2.position.set(-0.9, 0.7, 6);
	dirLight2.intensity = 2;
	curscene.add(dirLight2); 

	const dirLight3 = new THREE.DirectionalLight(0xffffff);	//light behind
	dirLight3.position.set(0, 3, -5);
	dirLight3.intensity = 1;
	curscene.add(dirLight3);

	//controlls
	curcontrols = new OrbitControls(curcamera, currenderer.domElement);
	curcontrols.listenToKeyEvents(window);

	curcontrols.enableDamping = true;
	curcontrols.dampingFactor = 0.05;
	curcontrols.minDistance = 2.5;
	curcontrols.maxDistance = 8;
	curcontrols.maxPolarAngle = Math.PI / 2.1;

	// Load Curiosity Rover: 
	const loader = new GLTFLoader();

	loader.load(
		'../3D/models/Curiosity.glb',

		function (gltf) {
			curscene.add(gltf.scene);
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset;
			currenderer.render(curscene, curcamera);
		},

		function (xhr) {

			console.log("[INFO]: [GLTF Loader][Cur]: " + (xhr.loaded / xhr.total * 100) + '% loaded');

		},
		// called when loading has errors
		function (error) {

			console.log('[ERROR]: [GLTF Loader][Cur]: An error happened');

		}
	);

	window.addEventListener('resize', curOnWindowResize);
}

function curanimate() {
	requestAnimationFrame(curanimate);
	curcontrols.update();
	currender();
}

function currender() {
	currenderer.render(curscene, curcamera);
}

function curOnWindowResize() {
	console.log('[INFO]: Window resized')
	curcamera.aspect = curbox.offsetWidth / (window.innerHeight / height);
	curcamera.updateProjectionMatrix();
	currenderer.setSize(curbox.offsetWidth, window.innerHeight / height);
}


/*
 * Opportunity Rover:
 */
let opscene, opcamera, oprenderer, opcontrols;
let opbox = document.getElementById('OpportunityRender');

function opinit() {
	opscene = new THREE.Scene();
	opcamera = new THREE.PerspectiveCamera(60, opbox.offsetWidth / (window.innerHeight / height), 0.1, 1000);
	opcamera.position.set(0.9, 1.5, -3);

	oprenderer = new THREE.WebGLRenderer({alpha: true});
	oprenderer.setSize(opbox.offsetWidth, window.innerHeight / height);
	opbox.appendChild(oprenderer.domElement);

	//light
	const light = new THREE.AmbientLight(0xffffff);
	light.intensity = 100;
	opscene.add(light);

	//directional Light:
	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(1, 10, 5);
	dirLight1.intensity = 1;
	opscene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0xffffff);
	dirLight2.position.set(-0.9, 0.7, 6);
	dirLight2.intensity = 4;
	opscene.add(dirLight2); 

	const dirLight3 = new THREE.DirectionalLight(0xffffff);	//light behind
	dirLight3.position.set(0, 3, -5);
	dirLight3.intensity = 2;
	opscene.add(dirLight3);

	//controlls
	opcontrols = new OrbitControls(opcamera, oprenderer.domElement);
	opcontrols.listenToKeyEvents(window);

	opcontrols.enableDamping = true;
	opcontrols.dampingFactor = 0.05;
	opcontrols.minDistance = 1.5;
	opcontrols.maxDistance = 5;
	opcontrols.maxPolarAngle = Math.PI / 2.1;
	
	//load Opportunity Rover
	const loader = new GLTFLoader();

	loader.load(
		'../3D/models/Opportunity.glb',

		function (gltf) {
			opscene.add(gltf.scene);
			gltf.animations;
			gltf.scene;
			gltf.scenes;
			gltf.cameras;
			gltf.asset;
			oprenderer.render(opscene, opcamera);
		},

		function (xhr) {
			console.log("[INFO]: [GLTF Loader][Opp]: " + (xhr.loaded / xhr.total * 100) + '% loaded');
		}, 
		function (error) {
			console.log('[ERROR]: [GLTF Loader][Opp]: An error happened');
		}
	)

	window.addEventListener('resize', opWindowResize);
}

function opanimate() {
	requestAnimationFrame(opanimate);
	opcontrols.update();
	oprendererF();
}

function oprendererF() {
	oprenderer.render(opscene, opcamera);
}

function opWindowResize() {
	console.log('[INFO]: Window resized');
	opcamera.aspect = opbox.offsetWidth / (window.innerHeight / height);
	opcamera.updateProjectionMatrix();
	oprenderer.setSize(opbox.offsetWidth, window.innerHeight / height);
}

/**
* Perseverance Rover:
*/
let perscene, percamera, perrenderer, percontrols;
let perbox = document.getElementById('PerseveranceRender');

function perinit() {
	perscene = new THREE.Scene();
	percamera = new THREE.PerspectiveCamera(60, perbox.offsetWidth / (window.innerHeight / height), 0.1, 1000);
	percamera.position.set(-1, 1.8, 5);

	perrenderer = new THREE.WebGLRenderer({alpha: true});
	perrenderer.setSize(perbox.offsetWidth, window.innerHeight / height);
	perbox.appendChild(perrenderer.domElement);

	//light:
	const light = new THREE.AmbientLight(0xffffff);
	light.intensity = 0.75;
	perscene.add(light);

	//directional lights:
	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(1, 10, 5);
	dirLight1.intensity = 0.25;
	perscene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0xffffff);
	dirLight2.position.set(-0.9, 0.7, 6);
	dirLight2.intensity = 0.5;
	perscene.add(dirLight2);

	const dirLight3 = new THREE.DirectionalLight(0xffffff);//light behind
	dirLight3.position.set(0, 3, -5);
	dirLight3.intensity = 0.5;
	perscene.add(dirLight3);

	//controlls
	percontrols = new OrbitControls(percamera, perrenderer.domElement);
	percontrols.listenToKeyEvents(window);

	percontrols.enableDamping = true;
	percontrols.dampingFactor = 0.05;
	percontrols.minDistance = 2;
	percontrols.maxDistance = 8;
	percontrols.maxPolarAngle = Math.PI / 2.1;

	//load Perseverance Rover:
	const loader = new GLTFLoader();

	loader.load(
		'../3D/models/Perseverance.glb',

		function(gltf) {
			perscene.add(gltf.scene);
			gltf.animations;
			gltf.scene;
			gltf.scenes;
			gltf.cameras;
			gltf.asset;
			perrenderer.render(perscene, percamera);
		},

		function (xhr) {
			console.log("[INFO]: [GLRF Loader][Per]: " + (xhr.loaded / xhr.total * 100) + '% loaded');
		}, 

		function (error) {
			console.log('[ERROR]: [GLTF Loader][Per]: An error happened');
		}
	);

	window.addEventListener('resize', perOnWindowResize);

}

function peranimate() {
	requestAnimationFrame(peranimate);
	percontrols.update();
	perrendererF();
}

function perrendererF() {
	perrenderer.render(perscene, percamera);
}

function perOnWindowResize() {
	console.log('[INFO]: Window resized');
	percamera.aspect = perbox.offsetWidth / (window.innerHeight / height);
	percamera.updateProjectionMatrix();
	perrenderer.setSize(perbox.offsetWidth, window.innerHeight / height);
}

/**
 * Satelite
 */
let satscene, satcamera, satrenderer, satcontrols;
let satbox = document.getElementById('SateliteRender');

function satInit() {
	satscene = new THREE.Scene();
	satcamera = new THREE.PerspectiveCamera(60, satbox.offsetWidth / (window.innerHeight / height), 0.1, 1000);
	satcamera.position.set(-0.9, 6, 11);

	satrenderer = new THREE.WebGLRenderer({alpha: true});
	satrenderer.setSize(satbox.offsetWidth, window.innerHeight / height);
	satbox.appendChild(satrenderer.domElement);

	//lights:
	const light = new THREE.AmbientLight(0xffffff);
	light.intensity = 20;
	satscene.add(light);

	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(1, 10, 5);
	dirLight1.intensity = 5;
	satscene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0xffffff);
	dirLight2.position.set(-0.9, 0.7, 6);
	dirLight2.intensity = 5;
	satscene.add(dirLight2);

	const dirLight3 = new THREE.DirectionalLight(0xffffff);//light behind
	dirLight3.position.set(0, 3, -5);
	dirLight3.intensity = 5;
	satscene.add(dirLight3);

	//controlls
	satcontrols = new OrbitControls(satcamera, satrenderer.domElement);
	satcontrols.listenToKeyEvents(window);

	satcontrols.enableDamping = true;
	satcontrols.dampingFactor = 0.05;
	satcontrols.minDistance = 5;
	satcontrols.maxDistance = 20;

	//load
	const loader = new GLTFLoader();

	loader.load(
		'../3D/models/MRO.glb',

		function (gltf) {
			satscene.add(gltf.scene);
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset;
			currenderer.render(satscene, satcamera); //ZZZ
		},

		function (xhr) {

			console.log("[INFO]: [GLTF Loader][Sat]: " + (xhr.loaded / xhr.total * 100) + '% loaded');

		},
		// called when loading has errors
		function (error) {

			console.log('[ERROR]: [GLTF Loader][Sat]: An error happened');

		}
	);

	window.addEventListener('resize', satOnWindowResize);
}

function satAnimate() {
	requestAnimationFrame(satAnimate);
	satcontrols.update();
	satRenderer();
}

function satRenderer() {
	satrenderer.render(satscene, satcamera);
}

function satOnWindowResize() {
	console.log('[INFO]: Window resized');
	satcamera.aspect = satbox.offsetWidth / (window.innerHeight / height);
	satcamera.updateProjectionMatrix();
	satrenderer.setSize(satbox.offsetWidth, (window.innerHeight / height));
}

/**
 * EXECUTE CALLS:
 */

//Curiosity:
curinit();
curanimate();

//Opportunity:
opinit();
opanimate();

//Perseverance:
perinit();
peranimate();

//Satelite:
satInit();
satAnimate();