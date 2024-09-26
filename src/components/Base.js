import React from "react";
import { useControls } from 'leva';
import Building from "./Building";
import { SIZES } from "../utils/dataFunctions";

const Base = () => {
    const { length, width } = useControls({
        length: { value: 5, min: 3, max: 7, step: SIZES.BEVEL.width },
        width: { value: 3, min: 2.5, max: 6, step: SIZES.BEVEL.width }
    });

    return (
        <group name={"roof"}>
            <group name={"basement"}>
                <mesh position={[0, -0.05, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[width, 0.1, length]} />
                    <meshPhysicalMaterial roughness={1} color="#4b4843" />
                </mesh>
            </group>
            <Building length ={length} width={width} />
        </group>
    )
}

export default Base;