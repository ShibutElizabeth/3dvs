import React, { useState, useEffect } from "react";
import { loadModelsAsync, loadTexturesAsync } from '../utils/loaders';
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
    generateRuberoidData
} from '../utils/dataFunctions';
import { renderBalkGroups, renderObjects, renderRuberoidMesh } from "../utils/renderFunctions";

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
    const ruberoidData = generateRuberoidData();

    const [models, setModels] = useState(null);
    const [textures, setTextures] = useState(null);
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
    const [currentRoofEdgesData, setCurrentRoofEdgesData] = useState(roofEdgesData);
    const [currentRoofCornersData, setCurrentRoofCornersData] = useState(roofCornersData);
    const [currentRuberoidData, setCurrentRuberoidData] = useState(ruberoidData)

    useEffect(() => {
        const fetchModels = async () => {
            const loadedModels = await loadModelsAsync();
            setModels(loadedModels);
            setLoaded(true);
        };
        const fetchTextures = async () => {
            const loadedTextures = await loadTexturesAsync();
            setTextures(loadedTextures);
        };
        
        fetchTextures();
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
            const updatedRoofCornersData = generateRoofCornersData(w, l);
            setCurrentRoofCornersData(updatedRoofCornersData);
            const updatedRoofEdgesData = generateRoofEdgesData(w, l);
            setCurrentRoofEdgesData(updatedRoofEdgesData);
            const updatedRuberoidData = generateRuberoidData(w, l);
            setCurrentRuberoidData(updatedRuberoidData);
            
            setCurrentWidth(width);
            setCurrentLength(length);
        }
    }, [width, length])

    const renderTimbersB = () => renderObjects(models, currentTimbersBData, 'timber', textures);
    const renderTimbersA = () => renderObjects(models, currentTimbersAData, 'timberA', textures, [0, Math.PI / 2, 0]);
    const renderTimbersC = () => renderObjects(models, currentTimbersCData, 'timber', textures);

    const renderInsideLodges = () => renderObjects(models, currentInsideLodgesData, 'lodge', textures);
    const renderOutsideLodges = () => renderObjects(models, currentOutsideLodgesData, 'lodge', textures);

    const renderPerimeterBalks = () => renderObjects(models, currentPerimeterBalksData, 'perimeterBalk', textures);
    const renderCornerBalks = () => renderBalkGroups(models, currentCornerBalksData, 'balk', textures, [0, -Math.PI/2, 0]);
    const renderSideBalks = () => renderBalkGroups(models, currentSideBalksData, 'balk', textures, [0, -Math.PI, 0]);

    const renderBevels = () => renderObjects(models, currentBevelsData, 'bevel', textures);
    const renderRoofEdges = () => renderObjects(models, currentRoofEdgesData, 'roofEdge', textures);
    const renderRoofCorners = () => renderObjects(models, currentRoofCornersData, 'roofCorner', textures);
    
    const renderRuberoid = () => renderRuberoidMesh(models, currentRuberoidData, 'ruberoid', textures);


    if(!loaded){
        return <></>
    }

    return (
        <group>
            { renderCornerBalks() }
            { renderSideBalks() }
            { renderPerimeterBalks() }
            { renderInsideLodges() }
            { renderOutsideLodges() }
            { renderTimbersB() }
            { renderTimbersA() }
            { renderTimbersC() }
            { renderBevels() }
            { renderRoofEdges() }
            { renderRoofCorners() }
            { renderRuberoid() }
        </group>
    );
};

export default Building;