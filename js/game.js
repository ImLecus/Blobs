import * as THREE from './three.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(document.getElementById("simulation").offsetWidth, document.getElementById("simulation").offsetHeight);
renderer.shadowMap.enabled = true;
document.getElementById("simulation").appendChild(renderer.domElement);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var conditions = {
    initialBlobs : 3,
    initialFood : 4
}

//BLOB
class Blob {
    geometry;
    material; 
    object;
    constructor(){
        this.geometry = new THREE.BoxGeometry(1,1,1);
        this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.object = new THREE.Mesh(this.geometry,this.material);
        this.object.castShadow = true;
        this.spawn();
    }
    spawn(){
        this.object.position.set(0,0,0.5);
        scene.add(this.object);
    }
    walk(){
        this.object.translateY(0.02);
        this.object.rotation.z += 0.05 * (Math.random() >= 0.4? -1:1);
    }
}
var blobs = [];

//FOOD
class Food{
    geometry;
    material; 
    object;
    constructor(){
        this.geometry = new THREE.SphereGeometry();
        this.material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        this.object = new THREE.Mesh(this.geometry,this.material);
        this.object.castShadow = true;
        this.spawn();
    }
    spawn(){
        this.object.scale.set(0.5,0.5,0.5)
        this.object.position.set(randomIntFromInterval(-8,8),randomIntFromInterval(-8,8),0.5);
        scene.add(this.object);
    }
}
var foods = [];

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


function Start(){
    for(let i=0; i< conditions.initialBlobs; i++){
        blobs.push(new Blob());
    }
    for(let i=0; i< conditions.initialFood; i++){
        foods.push(new Food());
    }
}
function Update(){
    blobs.forEach(blob => {
        blob.walk();
    });
}
function render() {
    Update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
Start();