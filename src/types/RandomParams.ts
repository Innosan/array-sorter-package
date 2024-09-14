export type RandomParams = {
    length: number;
    from: number;
    to: number;
};

/**
 * Create random parameters
 *
 * @param params - The random parameters to override the defaults
 */
export const createRandomParams = (params: Partial<RandomParams> = {}): RandomParams => {
    return {
        length: params.length || 10,
        from: params.from || 1,
        to: params.to || 100,
    };
};
