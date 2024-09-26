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
import { renderBalkGroups, renderObjects } from "../utils/functions";

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
    const [currentPerimeterBalksData, setCurrentPerimeterBalksData] = useState(perimeterBalksData);
    const [currentOutsideLodgesData, setCurrentOutsideLodgesData] = useState(outsideLodgesData);
    const [currentInsideLodgesData, setCurrentInsideLodgesData] = useState(insideLodgesData);
    const [currentBevelsData, setCurrentBevelsData] = useState(bevelsData);
    const [currentTimbersBData, setCurrentTimbersBData] = useState(timbersBData);
    const [currentTimbersAData, setCurrentTimbersAData] = useState(timbersAData);
    const [currentTimbersCData, setCurrentTimbersCData] = useState(timbersCData);


    useEffect(() => {
        const fetchModels = async () => {
            const loadedModels = await loadModelsAsync();
            setModels(loadedModels);
            setLoaded(true);
        };
        fetchModels();
    }, []);

    useEffect(() => {
        if(width !== currentWidth || length !== currentLength){
            const w = (width - 3)/2;
            const l = (length - 5)/2;
            const updatedCornerBalksData = generateCornerBalksData(w, l);
            setCurrentCornerBalksData(updatedCornerBalksData);
            const updatedSideBalksData = generateSideBalksData(w);
            setCurrentSideBalksData(updatedSideBalksData);
            const updatedPerimeterBalksData = generatePerimeterBalksData(w, l);
            setCurrentPerimeterBalksData(updatedPerimeterBalksData);
            const updatedOutsideLodgesData = generateOutsideLodgesData(w, l);
            setCurrentOutsideLodgesData(updatedOutsideLodgesData);
            const updatedInsideLodgesData = generateInsideLodgesData(w, l);
            setCurrentInsideLodgesData(updatedInsideLodgesData);
            const updatedBevelsData = generateBevelsData(w, l);
            setCurrentBevelsData(updatedBevelsData);
            const updatedTimbersBData = generateTimbersBData(w, l);
            setCurrentTimbersBData(updatedTimbersBData);
            const updatedTimbersAData = generateTimbersAData(w, l);
            setCurrentTimbersAData(updatedTimbersAData);
            const updatedTimbersCData = generateTimbersCData(w, l);
            setCurrentTimbersCData(updatedTimbersCData);
            
            setCurrentWidth(width);
            setCurrentLength(length);
        }
    }, [width, length])

    const renderTimbersB = () => renderObjects(models, currentTimbersBData, 'timber', "rgb(200, 255, 20)");
    const renderTimbersA = () => renderObjects(models, currentTimbersAData, 'timberA', "rgb(60, 100, 100)", [0, Math.PI / 2, 0]);
    const renderTimbersC = () => renderObjects(models, currentTimbersCData, 'timber', "rgb(200, 75, 70)");

    const renderInsideLodges = () => renderObjects(models, currentInsideLodgesData, 'lodge', "rgb(0, 255, 230)");
    const renderOutsideLodges = () => renderObjects(models, currentOutsideLodgesData, 'lodge', "rgb(100, 20, 230)");

    const renderPerimeterBalks = () => renderObjects(models, currentPerimeterBalksData, 'perimeterBalk', "rgb(255, 0, 230)");
    const renderCornerBalks = () => renderBalkGroups(models, currentCornerBalksData, 'balk', "rgb(255, 255, 230)", [0, -Math.PI/2, 0], true);
    const renderSideBalks = () => renderBalkGroups(models, currentSideBalksData, 'balk', "rgb(255, 255, 230)", [0, -Math.PI, 0]);

    const renderBevels = () => renderObjects(models, currentBevelsData, 'bevel', "rgb(50, 255, 20)");
    const renderRoofEdges = () => renderObjects(models, roofEdgesData, 'roofEdge', "rgb(0, 50, 255)");
    const renderRoofCorners = () => renderObjects(models, roofCornersData, 'roofCorner', "rgb(0, 50, 255)");

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
            {renderCornerBalks()}
            {renderSideBalks()}
            {renderPerimeterBalks()}
            {renderInsideLodges()}
            {/* {renderOutsideLodges()} */}
            {/* {renderTimbersB()} */}
            {renderTimbersA()}
            {/* {renderTimbersC()} */}
            {/* {renderBevels()} */}
            {/* {renderRoofEdges()} */}
            {/* {renderRoofCorners()} */}
            {/* {renderRuberoid()} */}
        </group>
    );
};

export default Building;