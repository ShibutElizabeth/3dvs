import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { path } from './constants';
import { TextureLoader } from 'three';

export const loadModelsAsync = async () => {
    const loader = new OBJLoader();

    const [balk, cornerBalk, perimeterBalk, lodge, bevel, timber, timberA, ruberoid, roofEdge, roofCorner] = await Promise.all([
        loader.loadAsync(path.balk),
        loader.loadAsync(path.cornerBalk),
        loader.loadAsync(path.perimeterBalk),
        loader.loadAsync(path.lodge),
        loader.loadAsync(path.bevel),
        loader.loadAsync(path.timber),
        loader.loadAsync(path.timberA),
        loader.loadAsync(path.ruberoid),
        loader.loadAsync(path.roofEdge),
        loader.loadAsync(path.roofCorner),
    ]);

    return {
        balk,
        cornerBalk,
        perimeterBalk,
        lodge,
        bevel,
        timber,
        timberA,
        ruberoid,
        roofEdge,
        roofCorner
    };
};

export const loadTexturesAsync = async () => {
    const loader = new TextureLoader();

    const [wood, roof, woodNormal, roofNormal] = await Promise.all([
        loader.loadAsync(path.woodTexture),
        loader.loadAsync(path.roofTexture),
        loader.loadAsync(path.woodNormalMap),
        loader.loadAsync(path.roofNormalMap),
    ]);

    return { wood, roof, woodNormal, roofNormal };
};
