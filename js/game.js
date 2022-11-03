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
    object;
    bounds;
    points;
    speed = 1;
    size = 1;
    sense = 1;
    constructor(speed,size,sense){
        this.speed = speed;
        this.size = size;
        this.sense = sense;
        this.points = 0;
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshToonMaterial({ color: `rgb(0,255,255)` })
        );
        this.object.castShadow = true;

        this.bounds = new THREE.Box3(
            new THREE.Vector3(),
            new THREE.Vector3()
        );
        this.bounds.setFromObject(this.object);

        this.energy = 100;
        this.spawn();
        
    }
    spawn(){
        this.object.position.set(0,0,0.5);
        scene.add(this.object);
    }
    walk(){
        this.object.translateY(0.04 * this.speed);
        if(Math.random() > 0.6){
            this.object.rotation.z += 0.1 * (Math.random() >= 0.4? -1:1);
        }
    }
    die(){
        scene.remove(this.object);
        blobs.splice(blobs.indexOf(this),1)
    }
    eat(){
        this.points++;
        console.log(`Blob ${blobs.indexOf(this)} is eating... now it has ${this.points} points`)
    }
    reproduce(){

    }
    update(){
        this.bounds.copy(this.object.geometry.boundingBox).applyMatrix4(this.object.matrixWorld);
        this.walk();
        foods.forEach(f => {
            if(this.bounds.intersectsSphere(f.bounds)){
                f.delete();
                this.eat();
            }
        })
    }
}
var blobs = [];
//FOOD
class Food{
    object;
    bounds;
    constructor(){
        this.object = new THREE.Mesh(
                new THREE.SphereGeometry(),
                new THREE.MeshToonMaterial({ color: 0xffff00 })
            );
        this.object.castShadow = true;

        this.bounds = new THREE.Sphere(this.object.position,1)

        this.spawn();
    }
    spawn(){
        this.object.scale.set(0.5,0.5,0.5)
        this.object.position.set(randomIntFromInterval(-8,8),randomIntFromInterval(-8,8),0.5);
        scene.add(this.object);
    }
    delete(){
        scene.remove(this.object);
        foods.splice(foods.indexOf(this),1)
    }
}
var foods = [];

// LIGHT
var light = new THREE.DirectionalLight(0xffffff, 1, 100);
light.position.set(0, 0, 1);
light.castShadow = true;
scene.add(light);

// PLANE
var planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcdcdcd });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.set(0, 0, 0);
scene.add(plane);

camera.position.set(15,-15,15);
camera.rotateX(Math.PI/4)
camera.rotateOnWorldAxis(new THREE.Vector3(0,0,1),Math.PI/4)

function checkCollisions(obj){
    
}

function Start(){
    for(let i=0; i< conditions.initialBlobs; i++){
        blobs.push(new Blob(1,1,1));
    }
    for(let i=0; i< conditions.initialFood; i++){
        foods.push(new Food());
    }
    setTimeout(()=>{

    }, 15000)
}
function Update(){
    blobs.forEach(blob => {    
        blob.update();
    });

}
function render() {
    Update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
Start();