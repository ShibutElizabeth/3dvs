import React from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { DoubleSide } from "three";
import Balks from "./Balks";


const Building = (props) => {
    const obj = useLoader(OBJLoader, '/models/balk_150x150x2200.obj')
    console.log(obj)

    return (
        <group name={"group"}>
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[3, 5, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="gray" side={DoubleSide} />
            </mesh>
            <group>
                <Balks/>
            </group>
        </group>
    )
}

export default Building;