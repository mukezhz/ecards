import { databases } from '$lib/server/db';
import { DB_CONSTANT } from '$lib/server/constant';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { AppwriteException } from 'node-appwrite';

export async function GET({ params }: RequestEvent) {
	const id = params.id;
	try {
		const data = await databases.getDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.MESSAGES, id);
		return json({
			message: 'success',
			data: data
		});
	} catch (e: unknown) {
		if (e instanceof AppwriteException)
			return json({
				message: 'error',
				data: null
			});
	}
}
