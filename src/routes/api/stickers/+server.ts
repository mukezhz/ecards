import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {AppwriteException, ID} from 'node-appwrite';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';

export async function GET() {
    try {
        const docs = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.STICKERS);
        return json({
            message: 'success',
            data: docs
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
    const {priority, published, trending, usedCount, createdBy, image, categoryId} = body;

    const id = ID.unique();
    const template = await databases.createDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.STICKERS, id, {
        published,
        usedCount,
        image,
        priority,
        owner: createdBy,
        categoryId,
        trending
    });
    return json({
        message: 'success!!!',
        data: {
            id: template.$id
        }
    });
}
