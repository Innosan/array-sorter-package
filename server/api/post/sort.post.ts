import { useDatabasePostgres } from "~/server/utils/db";
import { getToast, Toasts } from "~/types/ui/Notification";

import { mergeSort } from "@innosan/array-sorter/dist";

export default defineEventHandler(async (event) => {
	const db = await useDatabasePostgres(useRuntimeConfig(event).databaseUrl);
	const id = (await readBody(event)).id as number;

	try {
		await db.query("BEGIN");

		const startTime = Date.now();

		await db.query("UPDATE public.array SET sorted = $1 WHERE id = $2 RETURNING unsorted", [
			mergeSort(
				(await db.query("SELECT unsorted FROM public.array WHERE id = $1", [id])).rows[0].unsorted as number[],
			).sortedArray,
			id,
		]);

		const endTime = Date.now();
		const time = endTime - startTime;

		await db.query("COMMIT");

		return {
			status: 200,
			body: {
				success: true,
				notification: getToast(Toasts.INFO, "Массив успешно отсортирован за " + time + " мс.!"),
			},
		};
	} catch (error: any) {
		await db.query("ROLLBACK");
		return {
			status: 500,
			body: {
				success: false,
				notification: getToast(Toasts.ERROR, error.message),
			},
		};
	}
});
