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
export const generateRuberoidData = (w = 0, l = 0) => {
    return {
        position: [
            -HALF_DIMENSIONS.WIDTH - DIMENSIONS.PADDING - w,
            DIMENSIONS.HEIGHT + 2 * DIMENSIONS.DIFFERENCE + SIZES.LODGE.height,
            HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING + l,
        ],
        rotation: [0, 0, 0],
        scale: [
            DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING + 2 * w,
            1,
            DIMENSIONS.DEPTH + 2 * DIMENSIONS.PADDING + 2 * l,
        ]
    }
};

// Утилитарные функции
export const getKoefficient = (i) => (i % 2 === 0 ? -1 : 1);

// Функции для генерации данных
export const generateCornerBalksData = (w = 0, l = 0) => {
    const cornerBalksData = [];
    const rotations = [0, -1, 1, 2];
    const c = [-1, -1, 1, 1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        cornerBalksData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH - SIZES.BALK.hWidth + w),
                0,
                c[i] * (HALF_DIMENSIONS.DEPTH - SIZES.BALK.hWidth + l)
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
        });
    }
    return cornerBalksData;
};

export const generateSideBalksData = (w = 0) => {
    const sideBalksData = [];

    for (let i = 0; i < 2; i++) {
        const k = getKoefficient(i);
        sideBalksData.push({
            position: [k * (HALF_DIMENSIONS.WIDTH - SIZES.BALK.hWidth + w), 0, 0],
            rotation: [0, k * Math.PI / 2, 0],
        });
    }
    return sideBalksData;
};

export const generatePerimeterBalksData = (w = 0, l = 0) => {
    const perimeterBalksData = [];
    const rotations = [0, 2, -1, 1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        const f = i < 2 ? [0, 1] : [1, 0];
        perimeterBalksData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH - f[0] * SIZES.BALK.hWidth + w),
                DIMENSIONS.HEIGHT,
                k * (HALF_DIMENSIONS.DEPTH - (f[0] + 1) * SIZES.BALK.hWidth + l),
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
            scale: [DIMENSIONS.WIDTH + f[0] * 1.7 + 2 * (f[1] * w + f[0]* l), 1, 1],
        });
    }
    return perimeterBalksData;
};

export const generateOutsideLodgesData = (w = 0, l = 0) => {
    const outsideLodgesData = [];
    const rotations = [0, 2, -1, 1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        const f = i < 2 ? [0, 1] : [1, 1];
        outsideLodgesData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - f[0] * SIZES.LODGE.width + w),
                DIMENSIONS.HEIGHT + SIZES.LODGE.height,
                k * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING - f[0] * SIZES.LODGE.width + l),
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
            scale: [
                ((1 - f[0]) * (DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING + 2 * w)) 
                    + (f[0] * (DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING - SIZES.LODGE.width)) + 2 * (f[0]* l)),
                1,
                1
            ],
        });
    }
    return outsideLodgesData;
};

export const generateInsideLodgesData = (w = 0, l = 0) => {
    const insideLodgesData = [];
    const rotations = [0, 2, 1, -1];
    
    for (let i = 0; i < 4; i++) {
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        insideLodgesData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - SIZES.LODGE.width + w),
                DIMENSIONS.HEIGHT + SIZES.LODGE.height / 2,
                k * (1 - 2 * f) * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING - (1 + f) * SIZES.LODGE.width + l),
            ],
            rotation: [0, rotations[i] * Math.PI / 2, 0],
            scale: [
                (1 - f) * (DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING + 2 * w) 
                + f * (DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING - SIZES.LODGE.width) + 2 * f* l) 
                - 2 * SIZES.LODGE.width, 
                1, 
                1
            ],
        });
    }
    return insideLodgesData;
};

export const generateBevelsData = (w = 0, l = 0) => {
    const defaultCoverLength = DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING - SIZES.LODGE.width)
    const length = Math.round((defaultCoverLength + 2 * l) / SIZES.BEVEL.width);
    const bevelsData = [];
    const height = DIMENSIONS.HEIGHT + DIMENSIONS.DIFFERENCE + SIZES.LODGE.height;
    for (let i = 0; i < length; i++) {
        bevelsData.push({
            position: [
                -(HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - SIZES.BEVEL.height + w),
                height,
                -HALF_DIMENSIONS.DEPTH - DIMENSIONS.PADDING + SIZES.BEVEL.height + SIZES.BEVEL.width * (0.5 + i) - l,
            ],
            rotation: [0, -Math.PI/2, 0],
            scale: [1, 1, DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING - 2 * SIZES.BEVEL.height + 2*w],
        });
    }
    return bevelsData;
};

export const generateTimbersBData = (w = 0, l = 0) => {
    const length = 11; 
    const f = l === 0 ? 0 : (2 * l / (length - 1));
    const timbersBData = [];
    
    for (let i = 0; i < length; i++) {
        timbersBData.push({
            position: [
                -(HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING - 2 * SIZES.LODGE.width + w),
                DIMENSIONS.HEIGHT + SIZES.BALK.width,
                -HALF_DIMENSIONS.DEPTH + SIZES.TIMBER.width + i * (DIMENSIONS.TIMBER_B_DIFFERENCE + f) - l,
            ],
            scale: [DIMENSIONS.WIDTH + 2 * DIMENSIONS.PADDING - 4 * SIZES.LODGE.width + 2 * w, 1, 1],
        });
    }
    return timbersBData;
};

export const generateTimbersAData = (w = 0, l = 0) => {
    const length = 8;
    const timbersAData = [];
    const halfLength = length / 2;
    const f = w === 0 ? 0 :  2* w / (halfLength+1);
    
    for (let i = 0; i < length; i++) {
        const k = i < halfLength ? [1, 1, 0.05] : [-1, -3, -0.14];
        timbersAData.push({
            position: [
                -k[0] * (HALF_DIMENSIONS.WIDTH - (i + k[1]) * (DIMENSIONS.TIMBER_A_DIFFERENCE + f) + w),
                DIMENSIONS.HEIGHT + SIZES.BALK.width,
                -k[0] * (HALF_DIMENSIONS.DEPTH - k[2] + l),
            ],
            scale: [0.95, 1, 1],
        });
    }
    return timbersAData;
};

export const generateTimbersCData = (w = 0, l = 0) => {
    const timbersCData = [];
    
    for (let i = 0; i < 2; i++) {
        const k = getKoefficient(i);
        timbersCData.push({
            position: [
                k * (HALF_DIMENSIONS.WIDTH - SIZES.TIMBER.width/2 + w),
                DIMENSIONS.HEIGHT + SIZES.BALK.width,
                k * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING - 2 * SIZES.LODGE.width + l),
            ],
            rotation: [0, k * Math.PI/2, 0],
            scale: [DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING - SIZES.LODGE.width) - 2 * SIZES.LODGE.width + 2 * l, 1, 1],
        });
    }
    return timbersCData;
};

export const generateRoofEdgesData = (w = 0, l = 0) => {
    const roofEdgesData = [];

    const rotations = [2, 0, -1, 1];
    const g = [-1, -1, 1, 1];
    for(let i = 0; i < 4; i++){
        const k = getKoefficient(i);
        const f = i < 2 ? 0 : 1;
        roofEdgesData.push(
            {
                position: [
                    -k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING + w),
                    DIMENSIONS.HEIGHT + 2 * DIMENSIONS.DIFFERENCE + SIZES.LODGE.height,
                    k * g[i] * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING + l)
                ],
                rotation: [0, rotations[i] * Math.PI/2, 0],
                scale: [(1 - f) * (DIMENSIONS.WIDTH + 2 * (DIMENSIONS.PADDING + w)) + f * (DIMENSIONS.DEPTH + 2 * (DIMENSIONS.PADDING + f *l)), 1, 1]
            }
        )
    }

    return roofEdgesData;
}

export const generateRoofCornersData = (w = 0, l = 0) => {
    const roofCornersData = [];

    const rotations = [-2, 0, -1, 1];
    const c = [1, -1, -1, 1];
    for(let i = 0; i < 4; i++){
        const k = getKoefficient(i);
        roofCornersData.push(
            {
                position: [
                    -k * (HALF_DIMENSIONS.WIDTH + DIMENSIONS.PADDING + w),
                    DIMENSIONS.HEIGHT + 2 * DIMENSIONS.DIFFERENCE + SIZES.LODGE.height,
                    c[i] * (HALF_DIMENSIONS.DEPTH + DIMENSIONS.PADDING + l)
                ],
                rotation: [0, rotations[i] * Math.PI/2, 0],
                scale: [1, 1, 1]
            }
        )
    }

    return roofCornersData;
}
