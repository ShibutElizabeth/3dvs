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

    // const balkd = await loader.loadAsync(path.balk);
    // console.log()

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
