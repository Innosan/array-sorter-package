import { useDatabasePostgres } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
	const db = await useDatabasePostgres(useRuntimeConfig(event).databaseUrl);

	const result = await db.query("SELECT * FROM public.array");

	return result.rows;
});
