import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';
import {AppwriteException} from "node-appwrite";

export async function GET({params}: RequestEvent) {
    const id = params.id;
    const data = await databases.getDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.CATEGORIES, id);
    return json({
        message: 'success',
        data: data
    });
}

export async function PUT({request, params}: RequestEvent) {
    const body = await request.json();
    const id = params.id
    const {name, priority, published, trending, image, usedCount, createdBy} = body;
    try {
        const categories = await databases.updateDocument(
            DB_CONSTANT.DATABASE,
            DB_CONSTANT.CATEGORIES,
            id,
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
    } catch (e) {
        if (e instanceof AppwriteException) {
            return json({
                message: "error!!!",
                data: e.response
            }, {
                status: 400
            })
        }
    }
}
