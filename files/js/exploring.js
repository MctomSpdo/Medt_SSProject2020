// IMPORT THREE.JS @ v127 //ZZZ
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js"; //ZZZ

// IMPORT LOADER @ v127 //ZZZ
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";//ZZZ

// IMPORT ORBIT CONTROLLS
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js";

let curscene, curcamera, currenderer, curcontrols;
let curbox = document.getElementById('CuriosityRender');
let height = 1.5;

function curinit() {
	curscene = new THREE.Scene();
	curcamera = new THREE.PerspectiveCamera(60, curbox.offsetWidth / (window.innerHeight / height), 0.1, 1000);
	curcamera.position.set(-0.9, 3, 4);
	//camera.position.set(0, 3, -5);

	currenderer = new THREE.WebGLRenderer({ alpha: true });
	currenderer.setSize(curbox.offsetWidth, window.innerHeight / height);
	curbox.appendChild(currenderer.domElement);

	//renderer.physicallyCorrectLights = true; //ZZZ

	const light = new THREE.AmbientLight(0xffffff); // bright white light //ZZZ
	light.intensity = 1;
	curscene.add(light); //ZZZ

	//directional lights: 

	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(1, 10, 5);
	dirLight1.intensity = 0.5;
	curscene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0xffffff);
	dirLight2.position.set(-0.9, 0.7, 6);
	dirLight2.intensity = 2;
	curscene.add(dirLight2);

	//light behind: 

	const dirLight3 = new THREE.DirectionalLight(0xffffff);
	dirLight3.position.set(0, 3, -5);
	dirLight3.intensity = 1;
	curscene.add(dirLight3);

	//controlls

	curcontrols = new OrbitControls(curcamera, currenderer.domElement);
	curcontrols.listenToKeyEvents(window);

	curcontrols.enableDamping = true;
	curcontrols.dampingFactor = 0.05;
	curcontrols.minDistance = 1;
	curcontrols.maxDistance = 20;
	curcontrols.maxPolarAngle = Math.PI / 2.1;

	//Floor:

	var geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	var material = new THREE.MeshBasicMaterial({ color: 0x797979 });
	var floor = new THREE.Mesh(geometry, material);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 300;
	curscene.add(floor);

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
			currenderer.render(curscene, curcamera); //ZZZ
		},

		function (xhr) {

			console.log("[INFO]: [Load][Cur]: " + (xhr.loaded / xhr.total * 100) + '% loaded');

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


/******
 * Opportunity
 */

let opscene, opcamera, oprenderer, opcontrols;
let opbox = document.getElementById('OpportunityRender');

function opinit() {
	opscene = new THREE.Scene();
	opcamera = new THREE.PerspectiveCamera(60, opbox.offsetWidth / (window.innerHeight / height), 0.1, 1000);
	opcamera.position.set(-0.9, 3, 4);

	oprenderer = new THREE.WebGLRenderer({alpha: true});
	oprenderer.setSize(opbox.offsetWidth, window.innerHeight / height);
	opbox.appendChild(oprenderer.domElement);

	//light

	const light = new THREE.AmbientLight(0xffffff);
	light.intensity = 1;
	opscene.add(light);

	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(1, 10, 5);
	dirLight1.intensity = 0.5;
	opscene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0xffffff);
	dirLight2.position.set(-0.9, 0.7, 6);
	dirLight2.intensity = 2;
	opscene.add(dirLight2);

	//light behind: 

	const dirLight3 = new THREE.DirectionalLight(0xffffff);
	dirLight3.position.set(0, 3, -5);
	dirLight3.intensity = 1;
	opscene.add(dirLight3);

	//controlls

	opcontrols = new OrbitControls(opcamera, oprenderer.domElement);
	opcontrols.listenToKeyEvents(window);

	opcontrols.enableDamping = true;
	opcontrols.dampingFactor = 0.05;
	opcontrols.minDistance = 1;
	opcontrols.maxDistance = 20;
	opcontrols.maxPolarAngle = Math.PI / 2.1;

	//FLOOR:

	var geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	var material = new THREE.MeshBasicMaterial({ color: 0x797979 });
	var floor = new THREE.Mesh(geometry, material);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 300;
	opscene.add(floor);
	
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
			console.log("[INFO]: [Load][Opp]: " + (xhr.loaded / xhr.total * 100) + '% loaded');
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
* Perseverance
*/

let perscene, percamera, perrenderer, percontrols;
let perbox = document.getElementById('PerseveranceRender');

function perinit() {
	perscene = new THREE.Scene();
	percamera = new THREE.PerspectiveCamera(60, perbox.offsetWidth / (window.innerHeight / height), 0.1, 1000);
	percamera.position.set(-0.9, 3, 4);

	perrenderer = new THREE.WebGLRenderer();
	perrenderer.setSize(perbox.offsetWidth, window.innerHeight / height);
	perbox.appendChild(perrenderer.domElement);

	//light: 

	const light = new THREE.AmbientLight(0xffffff);
	light.intensity = 1;
	perscene.add(light);

	//directional lights:

	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(1, 10, 5);
	dirLight1.intensity = 0.5;
	perscene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0xffffff);
	dirLight2.position.set(-0.9, 0.7, 6);
	dirLight2.intensity = 2;
	perscene.add(dirLight2);

	//light behind: 

	const dirLight3 = new THREE.DirectionalLight(0xffffff);
	dirLight3.position.set(0, 3, -5);
	dirLight3.intensity = 1;
	perscene.add(dirLight3);

	//controlls

	percontrols = new OrbitControls(percamera, perrenderer.domElement);
	percontrols.listenToKeyEvents(window);

	percontrols.enableDamping = true;
	percontrols.dampingFactor = 0.05;
	percontrols.minDistance = 1;
	percontrols.maxDistance = 20;
	percontrols.maxPolarAngle = Math.PI / 2.1;

	//Floor:

	var geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	var material = new THREE.MeshBasicMaterial({ color: 0x797979 });
	var floor = new THREE.Mesh(geometry, material);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 300;
	perscene.add(floor);

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
			console.log("[INFO]: [Load][Per]: " + (xhr.loaded / xhr.total * 100) + '% loaded');
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



curinit();
curanimate();

perinit();
peranimate();

opinit();
opanimate();