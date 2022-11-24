import * as THREE from "three";

var scene:any = new THREE.Scene();
var camera:any = new THREE.PerspectiveCamera();
var renderer:any = new THREE.WebGLRenderer();
var container = document.getElementsByClassName("game")[0];
renderer.setSize(100, 100)
container.appendChild(renderer.domElement)

var cubeProps = {
    geometry: new THREE.BoxGeometry(),
    material: new THREE.MeshBasicMaterial({color: 0x00ff00})
}
var cube = new THREE.Mesh(cubeProps.geometry,cubeProps.material)
scene.add(cube)

function update(){
    requestAnimationFrame(update);
    renderer.render(scene,camera)
}
update()

console.log("Im working")