import { RandomConfig } from "~/types/server/RandomConfig";

export const generateArrays = (size: number, config: RandomConfig) => {
	const arrays = [];

	for (let i = 0; i < size; i++) {
		const length =
			Math.floor(Math.random() * (config.arrays.maxLength - config.arrays.minLength + 1)) +
			config.arrays.minLength;
		const array = [];

		for (let j = 0; j < length; j++) {
			array.push(Math.floor(Math.random() * (config.numbers.max - config.numbers.min + 1)) + config.numbers.min);
		}

		arrays.push(array);
	}

	return arrays;
};
