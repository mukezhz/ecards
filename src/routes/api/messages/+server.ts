import { databases } from '$lib/server/db';
import { DB_CONSTANT } from '$lib/server/constant';
import { ID } from 'node-appwrite';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET() {
	const data = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.MESSAGES);
	return json({
		message: 'success',
		data: data
	});
}

export async function POST({ request }: RequestEvent) {
	const body = await request.json();
	const { priority, published, image, usedCount, categoryId } = body;

	const id = ID.unique();
	const template = await databases.createDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.MESSAGES, id, {
		priority,
		published,
		image,
		usedCount,
		categoryId
	});
	return json({
		message: 'success!!!',
		data: {
			id: template.$id
		}
	});
}
