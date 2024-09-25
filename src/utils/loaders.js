import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { path } from './paths';

export const loadModelsAsync = async () => {
    const loader = new OBJLoader();

    const loadModel = (url) => {
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
        });
    };


    const [balk, cornerBalk, perimeterBalk, lodge, bevel, timber, timberA, ruberoid, roofEdge, roofCorner] = await Promise.all([
        loadModel(path.balk),
        loadModel(path.cornerBalk),
        loadModel(path.perimeterBalk),
        loadModel(path.lodge),
        loadModel(path.bevel),
        loadModel(path.timber),
        loadModel(path.timberA),
        loadModel(path.ruberoid),
        loadModel(path.roofEdge),
        loadModel(path.roofCorner),
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
