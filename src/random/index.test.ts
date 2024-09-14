import { generateArray } from "./index";
import { createRandomParams } from "../types/RandomParams";

describe("random", () => {
    it("should generate an array of random numbers", () => {
        const array = generateArray(createRandomParams({ length: 10 }));
        expect(array.length).toBe(10);
    });

    it("should generate an array of random numbers with default parameters", () => {
        const array = generateArray();
        expect(array.length).toBe(10);
    });

    it("should generate an array of random numbers with custom parameters", () => {
        const array = generateArray(createRandomParams({ length: 5, from: 1, to: 5 }));
        expect(array.length).toBe(5);
        expect(array.every((num) => num >= 1 && num <= 5)).toBe(true);
    });
});
