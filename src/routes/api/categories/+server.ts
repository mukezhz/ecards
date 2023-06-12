import { databases } from '$lib/server/db';
import { DB_CONSTANT } from '$lib/server/constant';
import type { RequestEvent } from './$types';
import { ID } from 'node-appwrite';
import { json } from '@sveltejs/kit';

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

export async function POST({ request }) {
	const body = await request.json();
	const { name, priority, published, trending, image, usedCount, createdBy } = body;

	const id = ID.unique();
	const now = new Date();
	const categories = await databases.createDocument(
		DB_CONSTANT.DATABASE,
		DB_CONSTANT.CATEGORIES,
		ID.unique(),
		{
			name,
			priority,
			published,
			trending,
			image,
			used_count: usedCount,
			created_at: now,
			updated_at: now,
			owner_metadata: JSON.stringify({
				id,
				name: createdBy
			})
		}
	);
	return json({
		message: 'success!!!',
		data: {
			id: categories.$id
		}
	});
}
