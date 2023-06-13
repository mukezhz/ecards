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
			message: 'success!!!',
			data: data
		});
	} catch (e: unknown) {
		if (e instanceof AppwriteException)
			return json({
				message: 'error!!!',
				data: null
			}, {
				status: 404
			});
	}
}

export async function PUT({request, params}: RequestEvent) {
	const body = await request.json();
	const id = params.id
	const { priority, published, trending,  usedCount, createdBy, message, categoryId} = body;
	try {
		const categories = await databases.updateDocument(
			DB_CONSTANT.DATABASE,
			DB_CONSTANT.MESSAGES,
			id,
			{
				priority,
				published,
				message,
				usedCount,
				categoryId,
				owner: createdBy,
				trending
			}
		);
		return json({
			message: 'success!!!',
			data: {
				id: categories.$id
			}
		});
	} catch (e) {
		if (e instanceof AppwriteException) {
			return json({
				message: "error!!!",
				data: e.response
			}, {
				status: e.code || 500
			})
		}
	}
}
