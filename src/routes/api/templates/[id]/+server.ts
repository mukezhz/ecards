import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';
import {AppwriteException} from "node-appwrite";
import type {KonvaShapeType} from "$lib/types/template";

export async function GET({params}: RequestEvent) {
    const id = params.id;
    try {
        const data = await databases.getDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, id);
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
    const id = params.id;
    const body = await request.json();
    const {konvaConfig}: { konvaConfig: KonvaShapeType } = body;
    const {type, name, ...config} = konvaConfig
    const doc = await databases.updateDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, id, {
        type,
        name,
        config: JSON.stringify(config),
    });
    return json({
        message: 'success!!!',
        data: {
            id: doc.$id
        }
    });
}
