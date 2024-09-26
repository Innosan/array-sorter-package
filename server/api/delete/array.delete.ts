import { useDatabasePostgres } from "~/server/utils/db";
import { getToast, Toasts } from "~/types/ui/Notification";

export default defineEventHandler(async (event) => {
	const db = await useDatabasePostgres(useRuntimeConfig(event).databaseUrl);
	const id = (await readBody(event)).id as number;

	try {
		const query = "DELETE FROM public.array WHERE id = $1";

		await db.query(query, [id]);
		return {
			status: 200,
			body: {
				success: true,
				notification: getToast(Toasts.SUCCESS, "Массив успешно удалён!"),
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
