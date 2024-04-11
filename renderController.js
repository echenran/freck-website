import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
//import { GLTFLoader } from 'https://unpkg.com/three@0.91.0/examples/js/loaders/GLTFLoader.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';


// Setup the basic scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

scene.background = new THREE.Color( 0xbfe3dd );
camera.position.z = 5

// Add light
const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); // Adjust the position as needed
scene.add(directionalLight);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(1, 0, 0); // Adjust the position as needed
scene.add(directionalLight2);
const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight3.position.set(0, 0, 1); // Adjust the position as needed
scene.add(directionalLight3);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10); // Position the light around the object
scene.add(pointLight);

// Instantiate the loader
const loader = new GLTFLoader();

let outerModel, innerModel;
let targetRotationX = 0, targetRotationY = 0;
let deltaX = 0, deltaY = 0;
let mouseX = 0, mouseY = 0;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
    

// Mouse movement event listener
document.addEventListener('mousemove', event => {
  // Calculate normalized mouse position (from -1 to 1)
  //mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  //mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	deltaX = (event.clientX - window.innerWidth / 2) * 0.001;
	deltaY = (event.clientY - window.innerHeight / 2) * 0.001;

  // Update target rotations based on the mouse movement
  //targetRotationX = mouseX * Math.PI; // Modify as needed for sensitivity
  //targetRotationY = mouseY * Math.PI; // Modify as needed for sensitivity
	targetRotationY = (event.clientX / window.innerWidth - 0.5) * Math.PI * 0.1;
	targetRotationX = (event.clientY / window.innerHeight - 0.5) * Math.PI * 0.1;
	//console.log('deltaX',deltaX)
	//console.log('deltaY',deltaY)
});


// Function to load models
function loadModel(path) {
  return new Promise((resolve, reject) => {
	console.log('loading',path)
    loader.load(path, gltf => resolve(gltf.scene), undefined, reject);
  });
}

// Load the first model
loader.load('chicken.glb',
    // Called when the model loads successfully
    function (gltf) {
			innerModel = gltf.scene
			scene.add(innerModel); // Add the model to the scene
			innerModel.position.x += 0.5
			innerModel.position.y -= 1
			innerModel.scale.set(5, 5, 5)
			console.log('First model loaded successfully!', innerModel);

			// Load the second model
			loader.load('sphere.glb',
				// Called when the model loads successfully
				function (gltf) {
					console.log('Second model loaded successfully!');
					outerModel = gltf.scene
					outerModel.scale.set(0.03, 0.03, 0.03)
					scene.add(outerModel); // Add the model to the scene
				},
				// Called while loading is progressing
				function (xhr) {
					console.log((xhr.loaded / xhr.total * 100) + '% loaded sphere');
				},
				// Called when loading has errors
				function (error) {
					console.error('An error happened with the second model:', error);
				}
			);

			animate();
    },
    // Called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded chicken');
    },
    // Called when loading has errors
    function (error) {
        console.error('An error happened with the first model:', error);
    }
);

function animate() { 
	requestAnimationFrame( animate ); 
	//innerModel.rotation.y -= 0.01
	//outerModel.rotation.y += 0.01
//console.log('inner y',innerModel.rotation.y)
//console.log('outer y',outerModel.rotation.y)

  // Apply position changes to the inner model to follow the mouse
  if (innerModel && outerModel) {
		const rotationDeltaY = (targetRotationY - innerModel.rotation.y);
		const rotationDeltaX = (targetRotationX - innerModel.rotation.x);
		//console.log('deltaY',deltaY)
		//console.log('deltaX',deltaX)
		//innerModel.rotation.y += (targetRotationY - innerModel.rotation.y) * 0.5;
		//innerModel.rotation.x += (targetRotationX - innerModel.rotation.x) * 0.5;
		//outerModel.rotation.y += (targetRotationY - outerModel.rotation.y) * 0.5;
		//outerModel.rotation.x += (targetRotationX - outerModel.rotation.x) * 0.5;
		console.log('innerModel rotation',innerModel.rotation)
		innerModel.rotation.y += rotationDeltaY
		innerModel.rotation.x += rotationDeltaX
		outerModel.rotation.y -= rotationDeltaY
		outerModel.rotation.x -= rotationDeltaX
    //innerModel.rotation.x += 0.1 * (mouseX - innerModel.position.x);
    //innerModel.rotation.y += 0.1 * (mouseY - innerModel.position.y);

		// Rotate the inner model according to mouse movement, subtracting to rotate in one direction
		//innerModel.rotation.x -= 0.1 * (targetRotationX - innerModel.rotation.x);
		//innerModel.rotation.y += 0.2 * (targetRotationX - innerModel.rotation.x);
		//innerModel.rotation.y -= 0.1 * (targetRotationX - innerModel.rotation.y);
  }
	renderer.render( scene, camera ); 
} 


/*
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById('myThreeJsCanvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.toneMappingExposure = Math.pow(0.9, 4.0);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(100, 1000, 100); // Adjust the position as needed
scene.add(spotLight);


function animate() {
  requestAnimationFrame(animate);
  
  // Apply the rotation to the outer model
  if (outerModel) {
    outerModel.rotation.y -= 0.1 * (targetRotationX - outerModel.rotation.y);
    outerModel.rotation.x -= 0.1 * (targetRotationY - outerModel.rotation.x);
  }
  
	camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}

animate();
*/
