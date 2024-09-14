# @innosan/array-sorter

A lightweight package for sorting arrays and generating random arrays.

Result of sorting are returned as type `SortResult` which contains the sorted array and the time taken to sort the array.

## Installation

You can install the package using npm or pnpm:

### npm
```sh
npm install @innosan/array-sorter
```

### pnpm
```sh
pnpm add @innosan/array-sorter
```

## Usage

### Importing the package

```typescript
import { mergeSort } from '@innosan/array-sorter';
import { SortOrder } from '@innosan/array-sorter/types/SortOrder';
import { generateArray } from '@innosan/array-sorter/random';
import { createRandomParams } from '@innosan/array-sorter/types/SortParams';
```

### Sorting an array

```typescript
const arr = [5, 3, 8, 4, 2, 1, 7, 6];
const result = mergeSort(arr, SortOrder.ASC);

console.log(result.sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8]
```

### Generating a random array

```typescript
const params = createRandomParams({ length: 10, from: 1, to: 100 });
const randomArray = generateArray(params);

console.log(randomArray); // Output: An array of 10 random numbers between 1 and 100
```

### Sorting a random array

```typescript
const randomArray = generateArray(createRandomParams({ length: 10 }));
const sortedResult = mergeSort(randomArray, SortOrder.DESC);

console.log(sortedResult.sortedArray); // Output: The random array sorted in descending order
```

## License

This project is licensed under the MIT License. 