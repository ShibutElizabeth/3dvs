import React, { useState } from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber';

const Balks = (props) => {
    const balk = useLoader(OBJLoader, '/models/balk_150x150x2200.obj');
    const balkCorner = useLoader(OBJLoader, '/models/balk_corner.obj');
    const balkUp = useLoader(OBJLoader, '/models/balk_150x150x1000.obj');
    const lodgeDown = useLoader(OBJLoader, '/models/Lodge_20x200x1000.obj');
    const lodgeBevel = useLoader(OBJLoader, '/models/Lodge_20x190x1000_bevel.obj');
    const bB = useLoader(OBJLoader, '/models/lodge_150x50x1000.obj');
    // console.log(lodgeBevel);
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
            position: [PLANE_X/2 - 0.075, 2.2, PLANE_Z/2 - 0.15],
            rotation: [0, Math.PI/2, 0],
            scale: [4.7, 1, 1]
        },
    ];

    const diff = 0.02;
    const delta = 0.18;
    const scaleX = PLANE_X + 2 * 0.18;
    const scaleZ = PLANE_Z + 2*(0.18 - 0.02);

    const lodgeDownData = [
        {
            position: [-PLANE_X/2 - 0.18, 2.4, -PLANE_Z/2 - 0.18],
            rotation: [0, 0, 0],
            scale: [scaleX, 1, 1]
        },
        {
            position: [PLANE_X/2 + 0.18, 2.4, PLANE_Z/2 + 0.18],
            rotation: [0, Math.PI, 0],
            scale: [scaleX, 1, 1]
        },
        {
            position: [-PLANE_X/2 - 0.18, 2.4, PLANE_Z/2 + 0.16],
            rotation: [0, Math.PI/2, 0],
            scale: [scaleZ, 1, 1]
        },
        {
            position: [PLANE_X/2 + 0.18, 2.4, -PLANE_Z/2 - 0.16],
            rotation: [0, -Math.PI/2, 0],
            scale: [scaleZ, 1, 1]
        },
    ];

    const lodgeUpData = [
        {
            position: [-PLANE_X/2 - 0.16, 2.3, -PLANE_Z/2 - 0.16],
            rotation: [0, 0, 0],
            scale: [scaleX - 0.04, 1, 1]
        },
        {
            position: [PLANE_X/2 + 0.16, 2.3, PLANE_Z/2 + 0.16],
            rotation: [0, Math.PI, 0],
            scale: [scaleX - 0.04, 1, 1]
        },
        {
            position: [-PLANE_X/2 - 0.16, 2.3, PLANE_Z/2 + 0.14],
            rotation: [0, Math.PI/2, 0],
            scale: [scaleZ - 0.04, 1, 1]
        },
        {
            position: [PLANE_X/2 + 0.16, 2.3, -PLANE_Z/2 - 0.14],
            rotation: [0, -Math.PI/2, 0],
            scale: [scaleZ - 0.04, 1, 1]
        },
    ];

    let bevelData = [];
    for(let i = 0; i < 28; i++){
        bevelData.push(
            {
                position: [-PLANE_X/2 - 0.16, 2.5, -PLANE_Z/2 - 0.16 + 0.095 + i * 0.19],
                scale: [1, 1, scaleX - 0.04]
            }
        )
    }


    const drawBevel = () => {
        const bevels = [];
        bevelData.map((el, index) => (
            bevels.push(
                <mesh
                key={`bevel`+ index} 
                receiveShadow
                castShadow
                geometry={lodgeBevel.children[0].geometry}
                position={el.position}
                scale={el.scale}
                rotation={[0, -Math.PI/2, 0]}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(50, 255, 20)"}
                    />
                </mesh>
            )
        ))
        return bevels;
    }

    let bBData = [];
    for(let i = 0; i < 11; i++){
        bBData.push(
            {
                position: [-PLANE_X/2, 2.35, -PLANE_Z/2 + 0.05 + i*0.485],
                rotation: [0, 0, 0],
                scale: [3, 1, 1]
            },
        )
    }


    const drawbB = () => {
        const bb = [];
        bBData.map((el, index) => (
            bb.push(
                <mesh
                key={`bB`+ index} 
                receiveShadow
                castShadow
                geometry={bB.children[0].geometry}
                position={el.position}
                scale={el.scale}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(200, 255, 20)"}
                    />
                </mesh>
            )
        ))
        return bb;
    }

    const drawDownLodge = () => {
        const downLodges = [];
        lodgeDownData.map((el, index) => (
            downLodges.push(
                <mesh
                key={`lodge`+ index} 
                receiveShadow
                castShadow
                geometry={lodgeDown.children[0].geometry}
                position={el.position}
                scale={el.scale}
                rotation={el.rotation}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(0, 255, 230)"}
                    />
                </mesh>
            )
        ))
        return downLodges;
    }

    const drawUpLodge = () => {
        const upLodges = [];
        lodgeUpData.map((el, index) => (
            upLodges.push(
                <mesh
                key={`lodge-up`+ index} 
                receiveShadow
                castShadow
                geometry={lodgeDown.children[0].geometry}
                position={el.position}
                scale={el.scale}
                rotation={el.rotation}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(100, 20, 230)"}
                    />
                </mesh>
            )
        ))
        return upLodges;
    }

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
            {/* {drawDownLodge()} */}
            {/* {drawUpLodge()} */}
            {/* {drawBevel()} */}
            {drawbB()}
            {/* <mesh
                receiveShadow
                castShadow
                // rotation={[0, 0, 0]}
                geometry={bB.children[0].geometry}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(200, 255, 20)"}
                    />
            </mesh> */}
        </group>

    )
}

export default Balks;