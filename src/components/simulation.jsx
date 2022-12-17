import {Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { randInt } from 'three/src/math/MathUtils';

function Blob(){
    return(
        <mesh position={[0,1,0]} onUpdate={blobBehaviour}>
            <boxGeometry attach="geometry"/>
            <meshStandardMaterial attach="material" color="green"/>
        </mesh>
    );
}

function blobBehaviour(){
    console.log("hey")
    
}

function Plane(){
    return(
        <mesh rotation={[-Math.PI/2,0,0]}>
            <planeGeometry attach="geometry" args={[40,40]}/>
            <meshStandardMaterial attach="material" color="white"/>
        </mesh>
    );
}

function Food(){
    return(
        <mesh position={[randInt(-15,15),0.5,randInt(-15,15)]} scale={0.3}>
            <sphereGeometry attach="geometry"/>
            <meshStandardMaterial attach="material" color="yellow"/>
        </mesh>
    );
}

export default function Sim(){
    return(
        <div id="simulation">
            <Canvas>
                <OrbitControls maxPolarAngle={Math.PI/2 - 0.25}/>
                <Plane />
                <Blob />
                <Food />
                <Food />
                <Food />
                <Food />
                <Food />
                <Food />
                <Food />
                <Food />
                <Food />
                <Food />
                <ambientLight intensity={0.5}/>
                <spotLight position={[20,20,20]} intensity={0.5}/>
            </Canvas>
        </div>
    );
}