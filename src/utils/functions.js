

export const renderObjects = (models, data, modelKey, color, rotation = [0, 0, 0]) => {
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

export const renderBalkGroups = (models, data, modelKey, color, rotation = [0, 0, 0]) => {
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
};