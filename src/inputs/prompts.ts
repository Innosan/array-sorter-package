import readline from "readline";
import { isValidYesNo } from "./validation";
import fs from "fs";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const prompt = (query: string, validate?: (input: string) => boolean): Promise<string> => {
    return new Promise((resolve) => {
        const ask = () => {
            rl.question(query, (answer) => {
                if (validate && !validate(answer)) {
                    console.log("Invalid input. Please try again.");
                    ask();
                } else {
                    resolve(answer);
                }
            });
        };
        ask();
    });
};

export const exportToFile = async (data: number[]) => {
    const exportToFile = await prompt("Do you want to export the sorted array to a file? (yes/no): ", isValidYesNo);

    if (exportToFile.toLowerCase() === "yes") {
        const fileName = await prompt("Enter the file name: ");
        fs.writeFileSync(fileName, JSON.stringify(data));

        console.log(`Array exported to ${fileName}`);
    } else {
        return;
    }
};
