// constants.js

// Размеры конструкции
export const DIMENSIONS = {
    WIDTH: 3,
    DEPTH: 5,
    HEIGHT: 2.2,
    PADDING: 0.18,
    DIFFERENCE: 0.1,
    TIMBER_A_DIFFERENCE: 0.6,
    TIMBER_B_DIFFERENCE: 0.485,
};

// Полуразмеры
export const HALF_DIMENSIONS = {
    WIDTH: DIMENSIONS.WIDTH / 2,
    DEPTH: DIMENSIONS.DEPTH / 2,
};

// Размеры объектов
export const SIZES = {
    BALK: { width: 0.15, height: DIMENSIONS.HEIGHT, hWidth: 0.075 },
    LODGE: { width: 0.02, height: 0.2 },
    BEVEL: { width: 0.19, height: 0.02 },
    TIMBER: { width: 0.05, height: 0.15, depthA: 0.2 },
};

// Общие данные
export const RUBEROID_DATA = {
    position: [
        -HALF_DIMENSIONS.WIDTH - DIMENSIONS.PADDING,
        DIMENSIONS.HEIGHT + 2 * DIMENSIONS.DIFFERENCE + SIZES.LODGE.height,
        HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING,
    ],
    rotation: [0, 0, 0],
    scale: [
        DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING,
        1,
        DIMENSIONS.DEPTH + 2 * DIMENSIONS.PADDING,
    ],
};

// Утилитарные функции
export const getKoefficient = (i) => (i % 2 === 0 ? -1 : 1);

// Функции для генерации данных
export const generateCornerBalksData = () => {
    const cornerBalksData = [];
    const rotations = [0, -1, 1, 2];
    const c = [-1, -1, 1, 1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        cornerBalksData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH - SIZES.BALK.hWidth),
                0,
                c[i] * (HALF_DIMENSIONS.DEPTH - SIZES.BALK.hWidth)
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
        });
    }
    return cornerBalksData;
};

export const generateSideBalksData = () => {
    const sideBalksData = [];

    for (let i = 0; i < 2; i++) {
        const k = getKoefficient(i);
        sideBalksData.push({
            position: [k * (HALF_DIMENSIONS.WIDTH - SIZES.BALK.hWidth), 0, 0],
            rotation: [0, k * Math.PI / 2, 0],
        });
    }
    return sideBalksData;
};

export const generatePerimeterBalksData = () => {
    const perimeterBalksData = [];
    const rotations = [0, 2, -1, 1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        perimeterBalksData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH - f * SIZES.BALK.hWidth),
                DIMENSIONS.HEIGHT,
                k * (HALF_DIMENSIONS.DEPTH - (f + 1) * SIZES.BALK.hWidth),
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
            scale: [DIMENSIONS.WIDTH + f * 1.7, 1, 1],
        });
    }
    return perimeterBalksData;
};

export const generateOutsideLodgesData = () => {
    const outsideLodgesData = [];
    const rotations = [0, 2, -1, 1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        outsideLodgesData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - f * SIZES.LODGE.width),
                DIMENSIONS.HEIGHT + SIZES.LODGE.height,
                k * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING - f * SIZES.LODGE.width),
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
            scale: [(1 - f) * (DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING) + f * (DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING - SIZES.LODGE.width)), 1, 1],
        });
    }
    return outsideLodgesData;
};

export const generateInsideLodgesData = () => {
    const insideLodgesData = [];
    const rotations = [0, 2, 1, -1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        insideLodgesData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - SIZES.LODGE.width),
                DIMENSIONS.HEIGHT + SIZES.LODGE.height / 2,
                k * (1 - 2 * f) * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING - (1 + f) * SIZES.LODGE.width),
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
            scale: [(1 - f) * (DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING) + f * (DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING - SIZES.LODGE.width)) - 2 * SIZES.LODGE.width, 1, 1],
        });
    }
    return insideLodgesData;
};

export const generateBevelsData = (length = 28) => {
    const bevelsData = [];
    const height = DIMENSIONS.HEIGHT + DIMENSIONS.DIFFERENCE + SIZES.LODGE.height;
    
    for (let i = 0; i < length; i++) {
        bevelsData.push({
            position: [
                -(HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - SIZES.BEVEL.height),
                height,
                -HALF_DIMENSIONS.DEPTH - DIMENSIONS.PADDING + SIZES.BEVEL.height + SIZES.BEVEL.width * (0.5 + i),
            ],
            rotation: [0, -Math.PI/2, 0],
            scale: [1, 1, DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING - 2 * SIZES.BEVEL.height],
        });
    }
    return bevelsData;
};

export const generateTimbersBData = (length = 11) => {
    const timbersBData = [];
    
    for (let i = 0; i < length; i++) {
        timbersBData.push({
            position: [
                -(HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - 2 * SIZES.LODGE.width),
                DIMENSIONS.HEIGHT + SIZES.BALK.width,
                -HALF_DIMENSIONS.DEPTH + SIZES.TIMBER.width + i * DIMENSIONS.TIMBER_B_DIFFERENCE,
            ],
            scale: [DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING - 4 * SIZES.LODGE.width, 1, 1],
        });
    }
    return timbersBData;
};

export const generateTimbersAData = (length = 8) => {
    const timbersAData = [];
    const halfLength = length / 2;
    
    for (let i = 0; i < length; i++) {
        const k = i < halfLength ? [1, 1, 0.05] : [-1, -3, -0.14];
        timbersAData.push({
            position: [
                -k[0] * (HALF_DIMENSIONS.WIDTH - (i + k[1]) * DIMENSIONS.TIMBER_A_DIFFERENCE),
                DIMENSIONS.HEIGHT + SIZES.BALK.width,
                -k[0] * (HALF_DIMENSIONS.DEPTH - k[2]),
            ],
            scale: [0.95, 1, 1],
        });
    }
    return timbersAData;
};

export const generateTimbersCData = () => {
    const timbersCData = [];
    
    for (let i = 0; i < 2; i++) {
        const k = getKoefficient(i);
        timbersCData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH - SIZES.TIMBER.width/2),
                DIMENSIONS.HEIGHT + SIZES.BALK.width,
                k * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING - 2 * SIZES.LODGE.width),
            ],
            rotation: [0, k * Math.PI/2, 0],
            scale: [DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING - SIZES.LODGE.width) - 2 * SIZES.LODGE.width, 1, 1],
        });
    }
    return timbersCData;
};

export const generateRoofEdgesData = () => {
    const roofEdgesData = [];

    const rotations = [2, 0, -1, 1];
    const g = [-1, -1, 1, 1];
    for(let i = 0; i < 4; i++){
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        roofEdgesData.push(
            {
                position: [
                    -k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING),
                    DIMENSIONS.HEIGHT + 2 * DIMENSIONS.DIFFERENCE + SIZES.LODGE.height,
                    k * g[i] * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING)
                ],
                rotation: [0, rotations[i] * Math.PI/2, 0],
                scale: [(1 - f) * (DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING) + f * (DIMENSIONS.DEPTH + 2 * DIMENSIONS.PADDING), 1, 1]
            }
        )
    }

    return roofEdgesData;
}

export const generateRoofCornersData = () => {
    const roofCornersData = [];

    const rotations = [-2, 0, -1, 1];
    const c = [1, -1, -1, 1];
    for(let i = 0; i < 4; i++){
        const k = getKoefficient(i);
        roofCornersData.push(
            {
                position: [
                    -k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING),
                    DIMENSIONS.HEIGHT + 2 * DIMENSIONS.DIFFERENCE + SIZES.LODGE.height,
                    c[i] * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING)
                ],
                rotation: [0, rotations[i] * Math.PI/2, 0],
                scale: [1, 1, 1]
            }
        )
    }

    return roofCornersData;
}
