import { getToast, Toasts } from "~/types/ui/Notification";
import { generateArrays } from "~/server/utils/generateArrays";
import { RandomConfig } from "~/types/server/RandomConfig";
import { createReadStream } from "fs";
import fs from "fs/promises";
import { join } from "path";
import pg from "pg";
const { Pool } = pg;
import { from as copyFrom } from "pg-copy-streams";
import { pipeline } from "node:stream/promises";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

	const startTime = process.hrtime();

	const arrays = generateArrays(100, config.random as RandomConfig);

	// Use a directory that PostgreSQL has access to
	const csvFilePath = join(process.cwd(), "tmp", "arrays.csv");
	const csvContent = arrays.map((array) => `{${array.join(",")}}`).join("\n");

	try {
		// Ensure the directory exists
		await fs.mkdir(join(process.cwd(), "tmp"), { recursive: true });

		// Write arrays to a CSV file
		await fs.writeFile(csvFilePath, csvContent);

		// Set the appropriate permissions for the CSV file
		await fs.chmod(csvFilePath, 0o644);

		const pool = new Pool({
			connectionString: config.databaseUrl,
		});

		/**
		 * The following code uses the `pg` library to connect
		 * to the database and copy the CSV file into the `array` table.
		 */
		const client = await pool.connect();
		try {
			const ingestStream = client.query(copyFrom("COPY public.array(unsorted) FROM STDIN"));
			const sourceStream = createReadStream(csvFilePath);

			await pipeline(sourceStream, ingestStream);
		} finally {
			client.release();
		}
		await pool.end();

		const endTime = process.hrtime(startTime); // End the timer
		const time = `${endTime[0]}s ${endTime[1] / 1000000}ms`; // Calculate the elapsed time
		return {
			status: 200,
			body: {
				success: true,
				result: {
					time: time,
				},
				notification: getToast(Toasts.SUCCESS, "Тест на добавление 100 массивов выполнен успешно за " + time),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			body: {
				success: false,
				result: {
					time: "",
				},
				notification: getToast(Toasts.ERROR, error.message),
			},
		};
	}
});
