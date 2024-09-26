import { useDatabasePostgres } from "~/server/utils/db";
import { getToast, Toasts } from "~/types/ui/Notification";

export default defineEventHandler(async (event) => {
	const db = await useDatabasePostgres(useRuntimeConfig(event).databaseUrl);
	const body = await readBody(event);
	const item = body as { newArray: number[]; id: number };

	// Should update array with new value and reset sorted array
	try {
		const query = "UPDATE public.array SET unsorted = $1, sorted = NULL WHERE id = $2";
		const values = [item.newArray, item.id];

		await db.query(query, values);
		return {
			status: 200,
			body: {
				success: true,
				notification: getToast(Toasts.INFO, "Массив успешно обновлен!"),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			body: {
				success: false,
				notification: getToast(Toasts.ERROR, error.message),
			},
		};
	}
});
