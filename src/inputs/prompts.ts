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
        while (true) {
            const fileName = await prompt("Enter the file name: ");
            if (!fileName.endsWith(".txt")) {
                console.log("File name must have a '.txt' extension.");
                continue;
            }

            if (fs.existsSync(fileName)) {
                const overwrite = await prompt(
                    "The file already exists. Do you want to overwrite it? (yes/no): ",
                    isValidYesNo,
                );
                if (overwrite.toLowerCase() === "no") {
                    continue;
                }
            }

            try {
                fs.writeFileSync(fileName, JSON.stringify(data));
                console.log("Array exported to", fileName);
                break;
            } catch (error) {
                console.error("Error exporting file:", error);
            }
        }
    } else {
        return;
    }
};
