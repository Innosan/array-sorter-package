import { mergeSort } from "./index";
import { SortOrder } from "./types/SortOrder";
import { generateArray } from "./random";
import { createRandomParams } from "./types/RandomParams";

describe("mergeSort", () => {
    it("should sort the array in ascending order", () => {
        const arr = [5, 3, 8, 4, 2, 1, 7, 6];
        const result = mergeSort(arr);

        expect(result.sortedArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should return an empty array if the input array is empty", () => {
        const arr: number[] = [];
        const result = mergeSort(arr);

        expect(result.sortedArray).toEqual([]);
    });

    it("should return the same array if the input array has only one element", () => {
        const arr = [1];
        const result = mergeSort(arr);

        expect(result.sortedArray).toEqual([1]);
    });

    it("should return the same array if the input array is already sorted", () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8];
        const result = mergeSort(arr);

        expect(result.sortedArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should sort the array in descending order", () => {
        const arr = [5, 3, 8, 4, 2, 1, 7, 6];
        const result = mergeSort(arr, SortOrder.DESC);

        expect(result.sortedArray).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it("should sort a random array in ascending order", () => {
        const array = generateArray(createRandomParams({ length: 10 }));
        const result = mergeSort(array);

        expect(result.sortedArray.length).toBe(10);
        expect(result.sortedArray).toEqual(result.sortedArray.slice().sort((a, b) => a - b));
    });

    it("should sort the descending array in ascending order", () => {
        const arr = [9, 8, 7, 6, 5, 4, 3, 2];
        const result = mergeSort(arr, SortOrder.ASC);

        expect(result.sortedArray).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
