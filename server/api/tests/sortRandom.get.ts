import { getToast, Toasts } from "~/types/ui/Notification";
import { mergeSort } from "@innosan/array-sorter/dist";

import pg from "pg";
const { Pool } = pg;

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

	const startTime = process.hrtime();
	try {
		let medianTime = 0;
		/**
		 * Sorting random arrays after adding them to the database
		 */
		const poolSort = new Pool({
			connectionString: config.databaseUrl,
		});

		const clientSort = await poolSort.connect();
		try {
			const res = await clientSort.query(`SELECT * FROM public.array ORDER BY RANDOM() LIMIT $1`, [100]);
			const arrays = res.rows.map((row: { unsorted: number[] }) => row.unsorted);

			for (const array of arrays) {
				medianTime += mergeSort(array).time.nanosecs;
			}
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
		} finally {
			clientSort.release();
		}

		const endTime = process.hrtime(startTime); // End the timer
		const time = `${endTime[0]}s ${endTime[1] / 1000000}ms`; // Calculate the elapsed time

		await poolSort.end();
		return {
			status: 200,
			body: {
				success: true,
				result: {
					time: time,
					medianSortTime: medianTime / 100 / 1e9,
				},
				notification: getToast(
					Toasts.SUCCESS,
					"Тест на сортировку 100 массивов выполнен успешно за " +
						time +
						" со средним временем сортировки " +
						medianTime / 100 / 1e9 +
						" нс.",
				),
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
