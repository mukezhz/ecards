import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {AppwriteException, Query} from 'node-appwrite';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';
import type {TemplatePayload} from "$lib/types/template";

export async function GET({url}: RequestEvent) {
    const templateId = url.searchParams.get("tid");
    try {
        if (templateId) {
            const data = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.SHAPES, [
                Query.equal("templateId", templateId),
            ]);
            return json({
                message: 'success!!!',
                data: data
            });
        }
    } catch (e) {
        if (e instanceof AppwriteException)
            return json({
                message: 'error',
                data: e.response
            });
    }
    return json({
        message: 'unknown!!!',
        data: []
    });
}

export async function POST({request}: RequestEvent) {
    try {
        const body = await request.json();
        const {config, templateId}: TemplatePayload = body;
        const doc = await databases.createDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.SHAPES, `${templateId}-${config.name}`, {
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