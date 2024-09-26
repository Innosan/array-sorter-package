export type ArrayItem = {
	id: number;
	unsorted: number[];
	sorted?: number[] | null;
};

export const createArrayItem = (unsorted: number[]): ArrayItem => {
	return {
		id: 0,
		unsorted,
	};
};
