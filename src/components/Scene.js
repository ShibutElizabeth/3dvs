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
    generateRoofCornersData,
    generateRoofEdgesData,
    RUBEROID_DATA
} from '../utils/constants';

const Scene = (props) => {
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

    // console.log(sideBalksData)

    const [models, setModels] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchModels = async () => {
            const loadedModels = await loadModelsAsync();
            // console.log(loadedModels)
            setModels(loadedModels);
            setLoaded(true);
        };
        fetchModels();
    }, []);

    // Универсальная функция для рендеринга объектов
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

    // Рендеринг разных типов объектов
    const renderTimbersB = () => renderObjects(timbersBData, 'timber', "rgb(200, 255, 20)");
    const renderTimbersA = () => renderObjects(timbersAData, 'timberA', "rgb(60, 100, 100)", [0, Math.PI / 2, 0]);
    const renderTimbersC = () => renderObjects(timbersCData, 'timber', "rgb(200, 75, 70)");

    const renderInsideLodges = () => renderObjects(insideLodgesData, 'lodge', "rgb(0, 255, 230)");
    const renderOutsideLodges = () => renderObjects(outsideLodgesData, 'lodge', "rgb(100, 20, 230)");

    const renderPerimeterBalks = () => renderObjects(perimeterBalksData, 'perimeterBalk', "rgb(255, 0, 230)");
    const renderCornerBalks = () => renderObjects(cornerBalksData, 'balk', "rgb(255, 255, 230)");
    const renderSideBalks = () => renderObjects(sideBalksData, 'balk', "rgb(255, 255, 230)");

    const renderBevels = () => renderObjects(bevelsData, 'bevel', "rgb(50, 255, 20)");
    const renderRoofEdges = () => renderObjects(roofEdgesData, 'roofEdge', "rgb(0, 50, 255)");
    const renderRoofCorners = () => renderObjects(roofCornersData, 'roofCorner', "rgb(0, 50, 255)");

    // Рендеринг рубероида отдельно, так как он один
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
            
            {/* {renderCornerBalks()} */}
            {renderSideBalks()}
            {/* {renderPerimeterBalks()} */}
            {/* {renderInsideLodges()} */}
            {/* {renderOutsideLodges()} */}
            {/* {renderTimbersB()} */}
            {/* {renderTimbersA()} */}
            {/* {renderTimbersC()} */}
            {/* {renderBevels()} */}
            {/* {renderRoofEdges()} */}
            {/* {renderRoofCorners()} */}
            {/* {renderRuberoid()} */}
        </group>
    );
};

export default Scene;