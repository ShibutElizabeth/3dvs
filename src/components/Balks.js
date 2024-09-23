import React, { useState } from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber';

const Balks = (props) => {
    const obj = useLoader(OBJLoader, '/models/balk_150x150x2200.obj')
    console.log(obj);
    const PLANE_X = 3;
    const PLANE_Z = 5;

    const [positions, setPositions] = useState([]); 

    const size = {
        x: 0.15,
        y: 2.2,
        z: 0.15
    }

    console.log(PLANE_X)
    const cornerPositions = [
        [-PLANE_X / 2 + 0.075, 0, -PLANE_Z / 2 + 0.075],  // Левый нижний угол
        [PLANE_X / 2 - 0.075, 0, -PLANE_Z / 2 + 0.075],   // Правый нижний угол
        [-PLANE_X / 2 + 0.075, 0, PLANE_Z / 2 - 0.075],   // Левый верхний угол
        [PLANE_X / 2 - 0.075, 0, PLANE_Z / 2 - 0.075],    // Правый верхний угол
    ];
    
    // Координаты для центра длинных сторон
    const sidePositions = [
        [-PLANE_X / 2 + 0.075, 0, 0],  // Середина нижней стороны
        [PLANE_X / 2 - 0.075, 0, 0]   // Середина верхней стороны
    ];

    const drawCornerBalks = () => {
        const cornerBalks = [];
        cornerPositions.map((pos, index) => (
            cornerBalks.push(
                <mesh
                    key={`corner-${index}`}
                    position={pos}
                    receiveShadow
                    castShadow
                    geometry={obj.children[0].geometry}
                >
                    <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(255, 255, 230)"}
                    />
                </mesh>
            )
        ));
        return cornerBalks;
    }

    const drawSideBalks = () => {
        const sideBalks = [];
        sidePositions.map((pos, index) => (
            sideBalks.push(
                <mesh
                    key={`side-${index}`} 
                    position={pos}
                    receiveShadow
                    castShadow
                    geometry={obj.children[0].geometry}
                >
                    <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(255, 255, 230)"}
                    />
                </mesh>
            )
        ))
        return sideBalks;
    }

    return (
        <group name={"balk"}>
                    {/* <mesh
                    receiveShadow
                    castShadow
                    geometry={obj.children[0].geometry}
                    
                    >
                        <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(255, 255, 230)"}
                        />
                    </mesh> */}
            {drawCornerBalks()}
            {drawSideBalks()}
        </group>

    )
}

export default Balks;