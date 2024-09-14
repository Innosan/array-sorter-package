import { createRandomParams, RandomParams } from "../types/RandomParams";

/**
 * Generate a random array
 *
 * @param params - The random parameters
 * @returns An array of random numbers
 */
export const generateArray = (params: RandomParams = createRandomParams()): number[] => {
    return Array.from({ length: params.length }, () =>
        Math.floor(Math.random() * (params.to - params.from + 1) + params.from),
    );
};
