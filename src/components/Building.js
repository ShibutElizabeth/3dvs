import React, { useState, useEffect } from "react";
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
    generateRoofCornersData,
    generateRoofEdgesData,
    RUBEROID_DATA
} from '../utils/constants';
import { useRef } from "react";

const Building = (props) => {
    const { width, length } = props;
    const cornerBalksData = generateCornerBalksData();
    const sideBalksData = generateSideBalksData();
    const perimeterBalksData = generatePerimeterBalksData();
    const outsideLodgesData = generateOutsideLodgesData();
    const insideLodgesData = generateInsideLodgesData();
    const bevelsData = generateBevelsData();
    const timbersBData = generateTimbersBData();
    const timbersAData = generateTimbersAData();
    const timbersCData = generateTimbersCData();
    const roofEdgesData = generateRoofEdgesData();
    const roofCornersData = generateRoofCornersData();
    const ruberoidData = RUBEROID_DATA;

    const [models, setModels] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(width);
    const [currentLength, setCurrentLength] = useState(length);
    const [currentCornerBalksData, setCurrentCornerBalksData] = useState(cornerBalksData);
    const [currentSideBalksData, setCurrentSideBalksData] = useState(sideBalksData);

    const cornerBalksRefs = useRef([]);
    const sideBalksRefs = useRef([]);
    let cornerBalkGroup = [];

    useEffect(() => {
        const fetchModels = async () => {
            const loadedModels = await loadModelsAsync();
            setModels(loadedModels);
            setLoaded(true);
        };
        fetchModels();
    }, []);


    const renderObjects = (data, modelKey, color, rotation = [0, 0, 0]) => {
        return data.map((el, index) => (
            <mesh
                key={`${modelKey}-${index}-${data[index].position[0]}`}
                receiveShadow
                castShadow
                geometry={models[modelKey].children[0].geometry}
                position={el.position}
                scale={el.scale}
                rotation={el.rotation || rotation}
            >
                <meshBasicMaterial roughness={1} color={color} />
            </mesh>
        ));
    };

    const renderBalkGroups = (data, modelKey, color, rotation = [0, 0, 0], corner) => {
        cornerBalkGroup = data.map((el, index) => (
            <group 
                ref={(el) => {
                    if(corner) {
                        cornerBalksRefs.current[index] = el;
                    } else {
                        sideBalksRefs.current[index] = el;
                    }
                }}
                key={`group-${modelKey}-${index}-${data[index].position[0]}`}
                position={el.position}
                rotation={el.rotation}
                >
                <mesh
                    key={`${modelKey}-${index}-${data[index].position[0]}`} 
                    receiveShadow
                    castShadow
                    geometry={models[modelKey].children[0].geometry}
                    >
                    <meshBasicMaterial roughness={1} color={color} />
                </mesh>
                <mesh
                    key={`cornerBalk-${index}-0`} 
                    receiveShadow
                    castShadow
                    geometry={models.cornerBalk.children[0].geometry}>
                    <meshBasicMaterial roughness={1} color={color} /> 
                </mesh>
                <mesh
                    key={`cornerBalk-${index}-1`}
                    receiveShadow
                    castShadow
                    rotation={rotation}
                    geometry={models.cornerBalk.children[0].geometry}>
                    <meshBasicMaterial roughness={1} color={"rgb(255, 255, 230)"} /> 
                </mesh>
             </group>
        ));
        console.log(cornerBalkGroup)
        return cornerBalkGroup;
    };

    useEffect(() => {
        if(width !== currentWidth){
            const updatedCornerBalksData = generateCornerBalksData((width - 3)/2, (length - 5)/2);
            const updatedSideBalksData = generateSideBalksData((width - 3)/2, (length - 5)/2);
            setCurrentCornerBalksData(updatedCornerBalksData);
            setCurrentSideBalksData(updatedSideBalksData);
            setCurrentWidth(width);
        }
    }, [width])

    useEffect(() => {
        if(length !== currentLength){
            const updatedCornerBalksData = generateCornerBalksData((width - 3)/2, (length - 5)/2);
            // const updatedSideBalksData = generateSideBalksData(0, (length - 5)/2);
            setCurrentCornerBalksData(updatedCornerBalksData);
            // setCurrentSideBalksData(updatedSideBalksData);
            setCurrentLength(length);
        }
    }, [length])

    const renderTimbersB = () => renderObjects(timbersBData, 'timber', "rgb(200, 255, 20)");
    const renderTimbersA = () => renderObjects(timbersAData, 'timberA', "rgb(60, 100, 100)", [0, Math.PI / 2, 0]);
    const renderTimbersC = () => renderObjects(timbersCData, 'timber', "rgb(200, 75, 70)");

    const renderInsideLodges = () => renderObjects(insideLodgesData, 'lodge', "rgb(0, 255, 230)");
    const renderOutsideLodges = () => renderObjects(outsideLodgesData, 'lodge', "rgb(100, 20, 230)");

    const renderPerimeterBalks = () => renderObjects(perimeterBalksData, 'perimeterBalk', "rgb(255, 0, 230)");
    const renderCornerBalks = () => renderBalkGroups(currentCornerBalksData, 'balk', "rgb(255, 255, 230)", [0, -Math.PI/2, 0], true);
    const renderSideBalks = () => renderBalkGroups(currentSideBalksData, 'balk', "rgb(255, 255, 230)", [0, -Math.PI, 0]);

    const renderBevels = () => renderObjects(bevelsData, 'bevel', "rgb(50, 255, 20)");
    const renderRoofEdges = () => renderObjects(roofEdgesData, 'roofEdge', "rgb(0, 50, 255)");
    const renderRoofCorners = () => renderObjects(roofCornersData, 'roofCorner', "rgb(0, 50, 255)");

    const renderRuberoid = () => (
        <mesh
            receiveShadow
            castShadow
            geometry={models.ruberoid.children[0].geometry}
            position={ruberoidData.position}
            scale={ruberoidData.scale}
            rotation={ruberoidData.rotation}
        >
            <meshBasicMaterial roughness={1} color={"rgb(100, 100, 100)"} />
        </mesh>
    );

    

    if(!loaded){
        return <></>
    }

    return (
        <group>
            <group name={"cornerBalks"}>
                {renderCornerBalks()}
            </group>
            <group name={"sideBalks"}>
                {renderSideBalks()}
            </group>
            <group name={"perimeter"}>
                {renderPerimeterBalks()}
                {renderInsideLodges()}
                {renderOutsideLodges()}
            </group>
            <group name={""}>
                {renderTimbersB()}
            </group>
            <group name={""}>
                {renderTimbersA()}
            </group>
            <group name={""}>
                {renderTimbersC()}
            </group>
            <group name={""}>
                {renderBevels()}
            </group>
            <group name={""}>
                {renderRoofEdges()}
                {renderRoofCorners()}
                {renderRuberoid()}
            </group>
        </group>
    );
};

export default Building;