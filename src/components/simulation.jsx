import {Canvas} from 'react-three-fiber'

function Box(){
    return(
        <mesh>
            <boxGeometry attach="geometry"/>
            <meshBasicMaterial attach="material" color="blue"/>
        </mesh>
    );
}

export default function Sim(){
    return(
        <div id="simulation">
            <Canvas>
                <Box></Box>
            </Canvas>
        </div>
    );
}