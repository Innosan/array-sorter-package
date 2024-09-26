import { useDatabasePostgres } from "~/server/utils/db";
import { ArrayItem } from "~/types/data/ArrayItem";
import { getToast, Toasts } from "~/types/ui/Notification";

export default defineEventHandler(async (event) => {
	const db = await useDatabasePostgres(useRuntimeConfig(event).databaseUrl);
	const body = await readBody(event);
	const item = body as ArrayItem;

	// Should add one item to the database
	try {
		const query = "INSERT INTO public.array (unsorted) VALUES ($1)";
		const values = [item.unsorted];

		await db.query(query, values);
		return {
			status: 200,
			body: {
				success: true,
				notification: getToast(Toasts.SUCCESS, "Массив успешно добавлен!"),
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
