const WIDTH = 3;
const DEPTH = 5;
const HEIGHT = 2.2;
const WIDTH_HALF = WIDTH / 2;
const DEPTH_HALF = DEPTH / 2;
const PADDING = 0.18;
const DIFFERENCE = 0.1;
const TIMBER_A_DIFFERENCE = 0.6;
const TIMBER_B_DIFFERENCE = 0.485;
const WIDTH_BIG = WIDTH + 2 * PADDING;
const DEPTH_BIG = DEPTH + 2 * (PADDING - lodgeSize.width);

const balkSize = {
    width: 0.15,
    height: HEIGHT,
    hWidth: 0.075
}

const lodgeSize = {
    width: 0.02,
    height: 0.2
}

const bevelSize = {
    width: 0.19,
    height: 0.02
}

const timberSize = {
    width: 0.05,
    height: 0.15,
    depthA: 0.2
}

const cornerBalksData = [];
const sideBalksData = [];
const perimeterBalksData = [];
const outsideLodgesData = [];
const insideLodgesData = [];
const bevelsData = [];
const timbersAData = [];
const timbersBData = [];
const timbersCData = [];
const roofEdgesData = [];
const roofConrersData = [];

const ruberoidData = {
    position: [
        -WIDTH_HALF - DIFFERENCE,
        HEIGHT + 2 * DIFFERENCE + lodgeSize.height,
        DEPTH_HALF + DIFFERENCE
    ],
    rotation: [0, 0, 0],
    scale: [WIDTH_BIG, 1, DEPTH_BIG]
}

const getKoefficient = (i) => {
    return i % 2 === 0 ? -1 : 1;
}


const setCornerBalksData = () => {
    const j = [0, -1, 1, 2];
    for(let i = 0; i < 4; i++){
        const k = getKoefficient(i);
        cornerBalksData.push(
            {
                position: [
                    k * (WIDTH_HALF - balkSize.hWidth),
                    0, 
                    -k * (DEPTH_HALF - balkSize.hWidth)
                ],
                rotation: [
                    0,
                    j[i] * Math.PI/2,
                    0
                ]
            }
        )
    }
}


const setSideBalksData = () => {
    for(i = 0; i < 2; i++){
        const k = getKoefficient(i);
        sideBalksData.push(
            {
                position: [k * (WIDTH_HALF - balkSize.hWidth), 0, 0],
                rotation: [0, k * Math.PI/2, 0]
            }
        )
    }
}


const setPerimeterBalksData = () => {
    const j = [0, 2, -1, 1];
    for(i = 0; i < 4; i++){
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        perimeterBalksData.push(
            {
                position: [
                    k * (WIDTH_HALF - f * balkSize.hWidth),
                    HEIGHT,
                    k * (DEPTH_HALF - 0.5 * (f + 1) * balkSize.hWidth)
                ],
                rotation: [0, j[i] * Math.PI/2, 0],
                scale: [WIDTH + f * 1.7, 1, 1]
            }
        )
    }
}



const setOutsideLodgesData = () => {
    const j = [0, 2, -1, 1];
    for(i = 0; i < 4; i++){
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        outsideLodgesData.push(
            {
                position: [
                    k * (WIDTH_HALF + PADDING - f * lodgeSize.width),
                    HEIGHT + lodgeSize.height,
                    k * (DEPTH_HALF + PADDING - f * lodgeSize.width)
                ],
                rotation: [0, j[i] * Math.PI/2, 0],
                scale: [(1 - f) * WIDTH_BIG + f * DEPTH_BIG, 1, 1]
            }
        )
    }
}


const setInsideLodgesData = () => {
    const j = [0, 2, 1, -1];
    for(i = 0; i < 4; i++){
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        insideLodgesData.push(
            {
                position: [
                    k * (WIDTH_HALF + PADDING - lodgeSize.width),
                    HEIGHT + lodgeSize.height / 2,
                    k * (1 - 2 * f) * (DEPTH_HALF + PADDING - (1 + f) * lodgeSize.width)
                ],
                rotation: [0, j[i] * Math.PI/2, 0],
                scale: [(1 - f) * WIDTH_BIG + f * DEPTH_BIG - 2 * lodgeSize.width, 1, 1]
            }
        )
    }
}


const setBevelsData = (length = 28) => {
    const height = HEIGHT + DIFFERENCE + lodgeSize.height;
    for(let i = 0; i < length; i++){
        bevelsData.push(
            {
                position: [
                    -(WIDTH_HALF + PADDING - bevelSize.height),
                    height,
                    -DEPTH_HALF - PADDING + bevelSize.height + bevelSize.width * (0.5 + i)
                ],
                scale: [1, 1, WIDTH_BIG - 2 * bevelSize.height]
            }
        )
    }
}



const setTimbersBData = (length = 11) => {
    for(let i = 0; i < length; i++){
        timbersBData.push(
            {
                position: [
                    -(WIDTH_HALF + PADDING - 2 * lodgeSize.width),
                    HEIGHT + balkSize.width,
                    -DEPTH_HALF + timberSize.width + i * TIMBER_B_DIFFERENCE
                ],
                scale: [WIDTH_BIG - 4 * lodgeSize.width, 1, 1]
            }
        )
    }
}

const setTimbersAData = (length = 8) => {
    const halfLength = length / 2;
    for(let i = 0; i < length; i++){
        const k = i < halfLength ? [1, 1, 0.05] : [-1, -3, -0.14];
        timbersAData.push(
            {
                position: [
                    -k[0] * (WIDTH_HALF - (i + k[1]) * TIMBER_A_DIFFERENCE),
                    HEIGHT + balkSize.width,
                    -k[0](DEPTH_HALF - k[2])
                ],
                scale: [0.95, 1, 1]
            }
        )
    }
}

const setTimbersCData = () => {
    for(let i = 0; i < 2; i++){
        const k = getKoefficient(i);
        timbersCData.push(
            {
                position: [
                    k * (WIDTH_HALF - timberSize.width/2),
                    HEIGHT + balkSize.width,
                    k * (DEPTH_HALF + PADDING - 2 * lodgeSize.width)
                ],
                rotation: [0, k * Math.PI/2, 0],
                scale: [DEPTH_BIG - 2 * lodgeSize.width, 1, 1]
            }
        )
    }
}



const setRoofEdgesData = () => {
    const j = [0, 2, 1, -1];
    for(let i = 0; i < 4; i++){
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        roofEdgesData.push(
            {
                position: [
                    k * (WIDTH_HALF + PADDING),
                    HEIGHT + 2 * DIFFERENCE + lodgeSize.height,
                    k * (DEPTH_HALF + PADDING - 2 * lodgeSize.width)
                ],
                rotation: [0, j[i] * Math.PI/2, 0],
                scale: [(1 - f) * WIDTH_BIG + f * DEPTH_BIG, 1, 1]
            }
        )
    }
}

const setRoofCornersData = () => {
    const j = [-2, 0, -1, 1];
    const c = [1, -1, -1, 1];
    for(let i = 0; i < 4; i++){
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        roofEdgesData.push(
            {
                position: [
                    -k * (WIDTH_HALF + PADDING),
                    HEIGHT + 2 * DIFFERENCE + lodgeSize.height,
                    c * (DEPTH_HALF + PADDING - lodgeSize.width)
                ],
                rotation: [0, j[i] * Math.PI/2, 0],
                scale: [1, 1, 1]
            }
        )
    }
}



