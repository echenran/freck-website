/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎??");
console.log('DOM content loaded!')

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) { // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}


// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});


// -- model viewer
document.addEventListener('DOMContentLoaded', function() {
    const modelViewer = document.querySelector('#modelViewer');
    const sphereViewer = document.querySelector('#sphereViewer');

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    let orbitTheta = 0; 
    let orbitPhi = 1.3089969389957472;
  

    window.addEventListener('mousemove', function(event) {
				console.log('mouse move')
        const deltaX = (event.clientX - centerX) * 0.001;
        const deltaY = (event.clientY - centerY) * 0.001;
      
        console.log("centerX: " + centerX); 
        console.log("centerY: " + centerY);
      
      
        console.log("clientX: " + event.clientX); 
        console.log("clientY: " + event.clientY);
      
        console.log("deltaX: " + deltaX); 
        console.log("deltaY: " + deltaY);
      
      
        const orbitInner = modelViewer.getCameraOrbit();
        const orbitSphere = sphereViewer.getCameraOrbit();
        
        const newOrbitInner = {
            theta: orbitTheta - deltaX,
            phi: orbitPhi - deltaY,
            radius: orbitInner.radius * 3
        };
        const newOrbitSphere = {
            theta: orbitTheta + deltaX,
            phi: orbitPhi + deltaY,
            radius: orbitSphere.radius * 3
        };

        modelViewer.cameraOrbit = `${newOrbitInner.theta}rad ${newOrbitInner.phi}rad ${newOrbitInner.radius}m`;
        sphereViewer.cameraOrbit = `${newOrbitSphere.theta}rad ${newOrbitSphere.phi}rad ${newOrbitSphere.radius}m`;
        console.log("new orbit Inner: " + modelViewer.cameraOrbit);
        console.log("new orbit Sphere: " + sphereViewer.cameraOrbit);
      
        modelViewer.jumpCameraToGoal();
        sphereViewer.jumpCameraToGoal();
    });
});
