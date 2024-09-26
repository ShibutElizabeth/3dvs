

export const renderObjects = (models, data, modelKey, textures, rotation = [0, 0, 0], color) => {
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
            <meshPhysicalMaterial roughness={1} map={textures.wood} />
        </mesh>
    ));
};

export const renderBalkGroups = (models, data, modelKey, textures, rotation = [0, 0, 0], color) => {
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
                <meshPhysicalMaterial roughness={1} map={textures.wood} />
            </mesh>
            <mesh
                key={`cornerBalk-${index}-0`} 
                receiveShadow
                castShadow
                geometry={models.cornerBalk.children[0].geometry}>
                <meshPhysicalMaterial roughness={1} map={textures.wood} />
            </mesh>
            <mesh
                key={`cornerBalk-${index}-1`}
                receiveShadow
                castShadow
                rotation={rotation}
                geometry={models.cornerBalk.children[0].geometry}>
                <meshPhysicalMaterial roughness={1} map={textures.wood} />
            </mesh>
         </group>
    ));
};

export const renderRuberoidMesh = (models, data, modelKey, textures, color) => (
    <mesh
        key={`${modelKey}-0`}
        receiveShadow
        castShadow
        geometry={models[modelKey].children[0].geometry}
        position={data.position}
        scale={data.scale}
        rotation={data.rotation}
    >
        <meshPhysicalMaterial roughness={1} map={textures.roof} />
    </mesh>
);