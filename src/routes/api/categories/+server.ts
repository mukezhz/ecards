import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import type {RequestEvent} from './$types';
import {AppwriteException, ID} from 'node-appwrite';
import {json} from '@sveltejs/kit';

export async function GET() {
    try {
        const categories = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.CATEGORIES);
        return json({
            message: 'success',
            data: categories
        })
    } catch (e) {
        if (e instanceof AppwriteException)
            return json({
                message: 'error',
                data: e.response
            });
    }

}

export async function POST({request}: RequestEvent) {
    const body = await request.json();
    const {name, priority, published, trending, image, usedCount, createdBy} = body;
    const id = ID.unique();
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
            usedCount,
            owner: createdBy
        }
    );
    return json({
        message: 'success!!!',
        data: {
            id: categories.$id
        }
    });
}
