import { databases } from '$lib/server/db';
import { DB_CONSTANT } from '$lib/server/constant';
import { ID } from 'node-appwrite';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET() {
	const templates = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES);
	return json({
		message: 'success',
		data: templates
	});
}

export async function POST({ request }: RequestEvent) {
	const body = await request.json();
	const { name, type, x, y, width, height, config } = body;

	const id = ID.unique();
	const template = await databases.createDocument(
		DB_CONSTANT.DATABASE,
		DB_CONSTANT.TEMPLATES,
		id,
		{
			name,
			type,
			x,
			y,
			width,
			height,
            rotation: JSON.stringify(config)
		}
	);
	return json({
		message: 'success!!!',
		data: {
			id: template.$id
		}
	});
}