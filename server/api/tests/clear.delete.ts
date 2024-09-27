import { getToast, Toasts } from "~/types/ui/Notification";

import pg from "pg";
const { Pool } = pg;

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

	const startTime = process.hrtime();
	try {
		/**
		 * Deleting all arrays from the database
		 */
		const poolDelete = new Pool({
			connectionString: config.databaseUrl,
		});

		const clientDelete = await poolDelete.connect();
		try {
			await clientDelete.query("DELETE FROM public.array");
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
			clientDelete.release();
		}

		const endTime = process.hrtime(startTime); // End the timer
		const time = `${endTime[0]}s ${endTime[1] / 1000000}ms`; // Calculate the elapsed time

		await poolDelete.end();
		return {
			status: 200,
			body: {
				success: true,
				result: {
					time: time,
				},
				notification: getToast(Toasts.SUCCESS, "Тест очистки базы данных выполнен успешно за " + time),
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
