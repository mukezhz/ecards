import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';
import {AppwriteException, ID} from "node-appwrite";

export async function GET({params}: RequestEvent) {
    const id = params.id;
    try {
        const data = await databases.getDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.STICKERS, id);
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

export async function PUT({request}: RequestEvent) {
    const body = await request.json();
    const {priority, published, trending, usedCount, createdBy, image, categoryId} = body;
    const id = ID.unique();
    const doc = await databases.createDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.STICKERS, id, {
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
            id: doc.$id
        }
    });
}
