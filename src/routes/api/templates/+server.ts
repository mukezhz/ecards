import { databases } from '$lib/server/db';
import { DB_CONSTANT } from '$lib/server/constant';
import { ID } from 'node-appwrite';
import { json } from '@sveltejs/kit';

export async function GET() {
	const tempalte = await databases.getCollection(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES);
	console.log({ tempalte: tempalte.attributes });
    await databases.deleteCollection(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES);
	const templates = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES);
	return json({
		message: 'success',
		data: templates
	});
}
