import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(document.getElementById("simulation").offsetWidth, document.getElementById("simulation").offsetHeight);
renderer.shadowMap.enabled = true;
document.getElementById("simulation").appendChild(renderer.domElement);

class Blob {
    geometry;
    material; 
    object;
    constructor(){
        console.log("Blob created");
        this.geometry = new THREE.BoxGeometry(1,1,1);
        this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.object = new THREE.Mesh(this.geometry,this.material);
        this.spawn();
    }
    spawn(){
        this.object.position.set(0,0,0.5);
        scene.add(this.object);
    }
    walk(){
        this.object.translateY(0.01);
    }
}
var blob = new Blob();

// CUBE
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.position.set(0,0,0.5);

// LIGHT
var light = new THREE.DirectionalLight(0xffffff, 1, 100);
light.position.set(-1, 1, 1);
light.castShadow = true;
scene.add(light);

// PLANE
var planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xfefefe });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.set(0, 0, 0);
scene.add(plane);

camera.position.set(0,-20,20);
camera.rotation.set(Math.PI/4,0,0);

setInterval( () => { 
    blob.object.rotation.z += 0.5 * (Math.random() >= 0.4? -1:1);
    console.log("Rotating...");

}, 1000);
function Start(){

    
}
function Update(){
    blob.walk();
}
function render() {
    Update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
Start();