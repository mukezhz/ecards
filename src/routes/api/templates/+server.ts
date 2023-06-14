import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {AppwriteException, ID} from 'node-appwrite';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';

export async function GET() {
    try {
        const data = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES,);
        return json({
            message: 'success!!!',
            data: data
        });
    } catch (e) {
        return json({
            message: 'unknown!!!',
            data: []
        });
    }
}

export async function POST({request}: RequestEvent) {
    try {
        const body = await request.json();
        const {name, owner, published, trending, preview} = body;
        const id = ID.unique()
        const doc = await databases.createDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, id, {
            name,
            owner,
            published,
            trending,
            preview
        });
        return json({
            message: 'success!!!',
            data: {
                id: doc.$id
            }
        });
    } catch (e) {
        if (e instanceof AppwriteException) {
            return json({
                message: "error!!!",
                data: e.response
            })
        }
    }
}