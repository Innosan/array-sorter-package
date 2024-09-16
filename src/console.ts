import { SortOrder } from "./types/SortOrder";

import { mergeSort } from "./index";
import { generateArray } from "./random";

import { exportToFile, prompt, rl } from "./inputs/prompts";
import { isValidInt, isValidSortOrder, isValidYesNo } from "./inputs/validation";

const main = async () => {
    while (true) {
        const size = parseInt(await prompt("Enter the size of the array: ", isValidInt), 10);
        const min = parseInt(await prompt("Enter the minimum value: ", isValidInt), 10);
        const max = parseInt(await prompt("Enter the maximum value: ", isValidInt), 10);

        const array = generateArray({ from: min, to: max, length: size });

        console.log("Generated Array:", array);

        const order =
            (await prompt("Choose sorting order: (asc/desc) ", isValidSortOrder)) === "asc"
                ? SortOrder.ASC
                : SortOrder.DESC;
        const sortedArray = mergeSort(array, order);

        console.log("Sorted Array:", sortedArray.sortedArray);
        console.log(`Time taken: ${sortedArray.time}`);

        await exportToFile(sortedArray.sortedArray);

        const exit = await prompt("Do you want to exit? (yes/no): ", isValidYesNo);
        if (exit.toLowerCase() === "yes") {
            break;
        }
    }

    rl.close();
};

main().then(() => console.log("Program exited."));
