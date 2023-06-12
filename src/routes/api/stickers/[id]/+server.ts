import { databases } from '$lib/server/db';
import { DB_CONSTANT } from '$lib/server/constant';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ params }: RequestEvent) {
	const id = params.id;
	const data = await databases.getDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.STICKERS, id);
	return json({
		message: 'success',
		data: data
	});
}
