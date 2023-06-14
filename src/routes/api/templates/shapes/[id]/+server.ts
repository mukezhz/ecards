import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {AppwriteException} from 'node-appwrite';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';
import type {TemplatePayload} from "$lib/types/template";

export async function GET({params}: RequestEvent) {
    const id = params.id
    try {
        const data = await databases.getDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.SHAPES, id);
        return json({
            message: 'success!!!',
            data: data
        });
    } catch (e) {
        if (e instanceof AppwriteException)
            return json({
                message: 'error',
                data: e.response
            });
    }
}


export async function PUT({params, request}: RequestEvent) {
    const id = params.id
    const body = await request.json();
    const {config, templateId}: TemplatePayload = body;
    if (!config) return json({
        message: "error!!!",
        data: {
            message: "config are not provided!!!"
        },
    }, {
        status: 400
    })
    try {
        const doc = await databases.updateDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.SHAPES, `${templateId}-${id}`, {
            type: config.type,
            config: JSON.stringify(config),
            templateId,
            x: config?.x,
            y: config?.y,
            height: config?.height,
            width: config?.width,
            fill: config?.fill
        });
        return json({
            message: "success!!!",
            data: {
                id: doc.$id
            }
        })
    } catch (e) {
        if (e instanceof AppwriteException) return json({
            message: "error!!!",
            data: e.response
        })
    }
}
