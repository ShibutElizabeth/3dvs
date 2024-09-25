import React, { useState, useEffect } from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber';
import { loadModelsAsync } from '../utils/loaders';
import {
    generateCornerBalksData,
    generateSideBalksData,
    generatePerimeterBalksData,
    generateOutsideLodgesData,
    generateInsideLodgesData,
    generateBevelsData,
    generateTimbersBData,
    generateTimbersAData,
    generateTimbersCData,
} from '../utils/constants';

const Balks = (props) => {
    const balk = useLoader(OBJLoader, '/models/balk_150x150x2200.obj');
    const balkCorner = useLoader(OBJLoader, '/models/balk_corner.obj');
    const balkUp = useLoader(OBJLoader, '/models/balk_150x150x1000.obj');
    const lodgeDown = useLoader(OBJLoader, '/models/Lodge_20x200x1000.obj');
    const lodgeBevel = useLoader(OBJLoader, '/models/Lodge_20x190x1000_bevel.obj');
    const bB = useLoader(OBJLoader, '/models/lodge_150x50x1000.obj');
    const bA = useLoader(OBJLoader, '/models/lodge_150x50x200.obj');
    const rub = useLoader(OBJLoader, '/models/ruberoid_1000x1000x2.obj');
    const roofE = useLoader(OBJLoader, '/models/roof_edge/roof_edge_1m.obj');
    const roofC = useLoader(OBJLoader, '/models/roof_edge/roof_edge_corner.obj');
    const PLANE_X = 3;
    const PLANE_Z = 5;

    const [models, setModels] = useState(null);

    useEffect(() => {
        const fetchModels = async () => {
            const loadedModels = await loadModelsAsync();
            setModels(loadedModels);
        };
        fetchModels();
    }, []);

    

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
            position: [PLANE_X/2, 2.2, PLANE_Z/2 - 0.075],
            rotation: [0, Math.PI, 0],
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
            position: [-PLANE_X/2 - 0.16, 2.4, - PLANE_Z/2 - 0.16],
            rotation: [0, -Math.PI/2, 0],
            scale: [scaleZ, 1, 1]
        },
        {
            position: [PLANE_X/2 + 0.16, 2.4, PLANE_Z/2 + 0.16],
            rotation: [0, Math.PI/2, 0],
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
        bevelData.forEach((el, index) => (
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
                position: [-PLANE_X/2 - 0.14, 2.35, -PLANE_Z/2 + 0.05 + i*0.485],
                scale: [scaleX - 0.08, 1, 1]
            },
        )
    }
    
    const drawbB = () => {
        const bb = [];
        bBData.forEach((el, index) => (
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

    let bCData = [
        {
            position: [-PLANE_X/2 + 0.025, 2.35, -PLANE_Z/2 - 0.14],
            rotation: [0, -Math.PI/2, 0],
            scale: [scaleZ - 0.04, 1, 1]
        },
        {
            position: [PLANE_X/2 - 0.025, 2.35, PLANE_Z/2 + 0.14],
            rotation: [0, Math.PI/2, 0],
            scale: [scaleZ-0.04, 1, 1]
        },
    ];

    const drawbC = () => {
        const bC = [];
        bCData.forEach((el, index) => (
            bC.push(
                <mesh
                key={`bC`+ index} 
                receiveShadow
                castShadow
                geometry={bB.children[0].geometry}
                position={el.position}
                rotation={el.rotation}
                scale={el.scale}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(200, 75, 70)"}
                    />
                </mesh>
            )
        ))
        return bC;
    }

    let bAData = [];
    for(let i = 0; i < 8; i++){
        if(i< 4){
            bAData.push(
                {
                    position: [-PLANE_X/2 + (i+1)*0.6, 2.35, -PLANE_Z/2 + 0.05],
                    rotation: [0, 0, 0],
                    scale: [0.95, 1, 1]
                },
            )
        } else{
            bAData.push(
                {
                    position: [PLANE_X/2 - (i-3)*0.6, 2.35, PLANE_Z/2 + 0.14],
                    rotation: [0, 0, 0],
                    scale: [0.95, 1, 1]
                },
            )
        }
        
    }
    const drawbA = () => {
        const ba = [];
        // console.log(bA.children[0])
        bAData.forEach((el, index) => (
            
            ba.push(
                <mesh
                key={'ba'+ index}
                receiveShadow
                castShadow
                position={el.position}
                rotation={[0, Math.PI/2, 0]}
                scale={el.scale}
                geometry={bA.children[0].geometry}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(60, 100, 100)"}
                    />
                </mesh>
            )
        ))
        
        return ba;
    }

    const drawDownLodge = () => {
        const downLodges = [];
        lodgeDownData.forEach((el, index) => (
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
        lodgeUpData.forEach((el, index) => (
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
        upData.forEach((el, index) => (
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
        cornerData.forEach((el, index) => (
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
        sideData.forEach((el, index) => (
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

    const roofData = [
        {
            position: [-PLANE_X/2 - 0.18, 2.6, -PLANE_Z/2 - 0.16],
            rotation: [0, 0, 0],
            scale: [scaleX, 1, 1],
            geometry: roofE.children[0].geometry,
        },
        {
            position: [PLANE_X/2 + 0.18, 2.6, PLANE_Z/2 + 0.16],
            rotation: [0, Math.PI, 0],
            scale: [scaleX, 1, 1],
            geometry: roofE.children[0].geometry,
        },
        {
            position: [PLANE_X/2 + 0.18, 2.6, -PLANE_Z/2 - 0.16],
            rotation: [0, -Math.PI/2, 0],
            scale: [scaleZ, 1, 1],
            geometry: roofE.children[0].geometry,
        },
        {
            position: [-PLANE_X/2 - 0.18, 2.6, PLANE_Z/2 + 0.16],
            rotation: [0, Math.PI/2, 0],
            scale: [scaleZ, 1, 1],
            geometry: roofE.children[0].geometry,
        },
        ////
        {
            position: [PLANE_X/2 + 0.18, 2.6, PLANE_Z/2 + 0.16],
            rotation: [0, Math.PI, 0],
            scale: [1, 1, 1],
            geometry: roofC.children[0].geometry,
        },
        {
            position: [-PLANE_X/2 - 0.18, 2.6, -PLANE_Z/2 - 0.16],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            geometry: roofC.children[0].geometry,
        },
        {
            position: [PLANE_X/2 + 0.18, 2.6, -PLANE_Z/2 - 0.16],
            rotation: [0, -Math.PI/2, 0],
            scale: [1, 1, 1],
            geometry: roofC.children[0].geometry,
        },
        {
            position: [-PLANE_X/2 - 0.18, 2.6, PLANE_Z/2 + 0.16],
            rotation: [0, Math.PI/2, 0],
            scale: [1, 1, 1],
            geometry: roofC.children[0].geometry,
        }
    ];

    const drawRoof = () => {
        const roof = [];
        roofData.forEach((el, index) => (
            roof.push(
                <mesh
                key={`roof`+ index} 
                receiveShadow
                castShadow
                geometry={el.geometry}
                position={el.position}
                scale={el.scale}
                rotation={el.rotation}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={ "rgb(0, 50, 255)"}
                    />
                </mesh>
            )
        ))
        return roof;
    }

    return (
        <group name={"balk"}>
            {drawCornerBalks()}
            {drawSideBalks()}
            {drawUpBalks()}
            {drawDownLodge()}
            {drawUpLodge()}
            {/* {drawBevel()}
            {drawbB()}
            {drawbC()} */}
            {drawbA()}
            <mesh
                receiveShadow
                castShadow
                rotation={[0, 0, 0]}
                scale={[scaleX, 1, scaleZ]}
                position={[-PLANE_X/2 - 0.18, 2.6, PLANE_Z/2 + 0.18]}
                geometry={rub.children[0].geometry}
                >
                    <meshBasicMaterial 
                    roughness={1}
                    color={"rgb(100, 100, 100)"}
                    />
            </mesh>
            {drawRoof()}
        </group>

    )
}

export default Balks;