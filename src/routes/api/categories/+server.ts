import { databases } from '$lib/server/db';
import { DB_CONSTANT } from '$lib/server/constant';

export async function GET() {
	const categories = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.CATEGORIES);
	return new Response(
		JSON.stringify({
			message: 'success',
			data: categories
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
}
