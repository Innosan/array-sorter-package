// server/utils/db.ts
import pg from "pg";
let _db = null;

export async function useDatabasePostgres(url: string) {
	if (!_db) {
		const client = new pg.Client({
			connectionString: url,
		});
		await client.connect();
		_db = client;
		return _db;
	}

	return _db;
}
