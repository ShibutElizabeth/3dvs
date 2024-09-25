import React from "react";
import { DoubleSide } from "three";
import Scene from "./Scene";


const Building = (props) => {

    return (
        <group name={"group"}>
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[3, 5, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="gray" side={DoubleSide} />
            </mesh>
            <Scene />
            {/* <group> */}
                
                {/* <Balks/> */}
            {/* </group> */}
        </group>
    )
}

export default Building;