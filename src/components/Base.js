import React from "react";
import { useControls } from 'leva';
import Building from "./Building";
import { useEffect, useRef, useState } from "react";
import { SIZES } from "../utils/constants";

const Base = () => {

    const { roofLength, roofWidth } = useControls({
        roofLength: { value: 5, min: 3, max: 7, step: SIZES.BEVEL.width },
        roofWidth: { value: 3, min: 2.5, max: 6, step: SIZES.BEVEL.width },
    });
    const [currentWidth, setCurrentWidth] = useState(roofWidth);
    const [currentLength, setCurrentLength] = useState(roofLength);
    const baseRef = useRef(null);
    useEffect(() => {
        if(roofWidth !== currentWidth && baseRef.current){
            setCurrentWidth(roofWidth);
        }
    }, [roofWidth]);

    useEffect(() => {
        if(roofLength !== currentLength && baseRef.current){
            setCurrentLength(roofLength);
        }
    }, [roofLength]);

    return (
        <group name={"roof"}>
            <group ref={baseRef} name={"basement"}>
                <mesh position={[0, -0.05, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[currentWidth, 0.1, currentLength]} />
                    <meshBasicMaterial color="gray" />
                </mesh>
            </group>
            <Building length ={roofLength} width={roofWidth}/>
        </group>
    )
}

export default Base;