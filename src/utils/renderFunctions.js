import { colors } from './constants';

const getMaterial = (modelKey, texture) => {
    const props = {
        roughness: 1,
        color: colors[modelKey],
        map: texture
    };

    return (
        <meshPhysicalMaterial {...props} />
    );
}

export const renderObjects = (models, data, modelKey, textures, rotation = [0, 0, 0]) => {
    return data.map((el, index) => (
        <mesh
            key={`${modelKey}-${index}-${data[index].position[0]}`}
            receiveShadow
            castShadow
            geometry={models[modelKey].children[0].geometry}
            position={el.position}
            scale={el.scale}
            rotation={el.rotation || rotation}>
            { getMaterial(modelKey, textures.wood) }
        </mesh>
    ));
};

export const renderBalkGroups = (models, data, modelKey, textures, rotation = [0, 0, 0]) => {
    return data.map((el, index) => (
        <group 
            key={`group-${modelKey}-${index}-${data[index].position[0]}`}
            position={el.position}
            rotation={el.rotation}>
            <mesh
                key={`${modelKey}-${index}-${data[index].position[0]}`} 
                receiveShadow
                castShadow
                geometry={models[modelKey].children[0].geometry}>
                { getMaterial(modelKey, textures.wood) }
            </mesh>
            <mesh
                key={`cornerBalk-${index}-0`} 
                receiveShadow
                castShadow
                geometry={models.cornerBalk.children[0].geometry}>
                { getMaterial(modelKey, textures.wood) }
            </mesh>
            <mesh
                key={`cornerBalk-${index}-1`}
                receiveShadow
                castShadow
                rotation={rotation}
                geometry={models.cornerBalk.children[0].geometry}>
                { getMaterial(modelKey, textures.wood) }
            </mesh>
         </group>
    ));
};

export const renderRuberoidMesh = (models, data, modelKey, textures) => (
    <mesh
        key={`${modelKey}-0`}
        receiveShadow
        castShadow
        geometry={models[modelKey].children[0].geometry}
        position={data.position}
        scale={data.scale}
        rotation={data.rotation}>
        { getMaterial(modelKey, textures.roof) }
    </mesh>
);