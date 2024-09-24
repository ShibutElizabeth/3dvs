import React, { useState } from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber';

const Balks = (props) => {
    const balk = useLoader(OBJLoader, '/models/balk_150x150x2200.obj');
    const balkCorner = useLoader(OBJLoader, '/models/balk_corner.obj');
    const balkUp = useLoader(OBJLoader, '/models/balk_150x150x1000.obj');
    console.log(balkUp);
    const PLANE_X = 3;
    const PLANE_Z = 5;


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

    const cornerData = [
        {
            position: [-PLANE_X / 2 + 0.075, 0, -PLANE_Z / 2 + 0.075],
            rotation: [0, 0, 0]
        },
        {
            position: [PLANE_X / 2 - 0.075, 0, -PLANE_Z / 2 + 0.075],
            rotation: [0, -Math.PI/2, 0]
        },
        {
            position: [-PLANE_X / 2 + 0.075, 0, PLANE_Z / 2 - 0.075],
            rotation: [0, Math.PI/2, 0]
        },
        {
            position: [PLANE_X / 2 - 0.075, 0, PLANE_Z / 2 - 0.075],
            rotation: [0, Math.PI, 0]
        },
    ];

    const sideData = [
        {
            position: [-PLANE_X / 2 + 0.075, 0, 0],
            rotation: [0, -Math.PI/2, 0]
        },
        {
            position: [PLANE_X / 2 - 0.075, 0, 0],
            rotation: [0, Math.PI/2, 0]
        }
    ];

    const upData = [
        {
            position: [-PLANE_X/2, 2.2, -PLANE_Z/2 + 0.075],
            rotation: [0, 0, 0],
            scale: [3, 1, 1]
        },
        {
            position: [-PLANE_X/2, 2.2, PLANE_Z/2 - 0.075],
            rotation: [0, 0, 0],
            scale: [3, 1, 1]
        },
        {
            position: [-PLANE_X/2 + 0.075, 2.2, -PLANE_Z/2 + 0.15],
            rotation: [0, -Math.PI/2, 0],
            scale: [4.7, 1, 1]
        },
        {
            position: [PLANE_X/2 - 0.075, 2.2, -PLANE_Z/2 + 0.15],
            rotation: [0, -Math.PI/2, 0],
            scale: [4.7, 1, 1]
        },
    ];

    const drawUpBalks = () => {
        const upBalks = [];
        upData.map((el, index) => (
            upBalks.push(
                <mesh
                key={`up`+ index} 
                receiveShadow
                castShadow
                geometry={balkUp.children[0].geometry}
                position={el.position}
                scale={el.scale}
                rotation={el.rotation}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(255, 0, 230)"}
                    />
                </mesh>
            )
        ))
        return upBalks;
    }

    const drawCornerBalks = () => {
        const cornerBalks = [];
        cornerData.map((el, index) => (
            cornerBalks.push(
                <group key={'group'+index} position={el.position} rotation={el.rotation}>
                    <mesh
                    key={`corner-${index}`}
                    receiveShadow
                    castShadow
                    geometry={balk.children[0].geometry}
                >
                    <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(255, 255, 230)"}
                    />
                    </mesh>
                    <mesh
                        key={`cornerBalk`+index} 
                        // position={el.position}
                        receiveShadow
                        castShadow
                        geometry={balkCorner.children[0].geometry}
                        >
                        <meshBasicMaterial 
                            roughness={1}
                            color={"rgb(255, 255, 230)"}
                        /> 
                    </mesh>
                    <mesh
                        key={`cornerBalk-0`+index} 
                        // position={el.position}
                        receiveShadow
                        castShadow
                        rotation={[0, -Math.PI/2, 0]}
                        geometry={balkCorner.children[0].geometry}
                        >
                        <meshBasicMaterial 
                            roughness={1}
                            color={"rgb(255, 255, 230)"}
                        /> 
                    </mesh>
                </group>
                
            )
        ));
        return cornerBalks;
    }

    const drawSideBalks = () => {
        const sideBalks = [];
        sideData.map((el, index) => (
            sideBalks.push(
                <group key={'group'+index} position={el.position} rotation={el.rotation}>
                    <mesh
                    key={`side-${index}`} 
                    receiveShadow
                    castShadow
                    geometry={balk.children[0].geometry}
                    >
                        <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(255, 255, 230)"}
                        />
                    </mesh>
                    <mesh
                        key={`cornerBalk`+index} 
                        receiveShadow
                        castShadow
                        geometry={balkCorner.children[0].geometry}
                        >
                        <meshBasicMaterial 
                            roughness={1}
                            color={"rgb(255, 255, 230)"}
                        /> 
                    </mesh>
                    <mesh
                        key={`cornerBalk-0`+index}
                        receiveShadow
                        castShadow
                        rotation={[0, -Math.PI, 0]}
                        geometry={balkCorner.children[0].geometry}
                        >
                        <meshBasicMaterial 
                            roughness={1}
                            color={"rgb(255, 255, 230)"}
                        /> 
                    </mesh>
                </group>
            )
        ))
        return sideBalks;
    }

    return (
        <group name={"balk"}>
            {drawCornerBalks()}
            {drawSideBalks()}
            {drawUpBalks()}
        </group>

    )
}

export default Balks;