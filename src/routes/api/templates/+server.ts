import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {AppwriteException, Query} from 'node-appwrite';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';
import type {TemplatePayload} from "$lib/types/template";

export async function GET({url}: RequestEvent) {
    const userId = url.searchParams.get("uid");
    const name = url.searchParams.get("name");
    try {
        if (name && userId) {
            const data = await databases.listDocuments(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, [
                Query.equal("name", name),
                Query.equal("owner", userId)
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
        const {konvaConfig, owner, name, templateId}: TemplatePayload = body;
        const {type, name: id, ...config} = konvaConfig
        const doc = await databases.createDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, `${templateId}-_-${id}`, {
            type,
            name,
            config: JSON.stringify(config),
            owner,
            templateId
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

export async function PUT({request}: RequestEvent) {
    const body = await request.json();
    const {konvaConfigs, owner, name, templateId}: TemplatePayload = body;
    if (!konvaConfigs) return json({
        message: "error!!!",
        data: {
            message: "config are not provided!!!"
        },
    }, {
        status: 400
    })
    for (const konvaConfig of konvaConfigs) {
        const {type, name: shapeName,id, ...config} = konvaConfig
        await databases.updateDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, `${templateId}--${id}`, {
            type,
            name,
            config: JSON.stringify(config),
            owner
        });
    }
    return json({
        message: 'success!!!',
        data: {
            total: konvaConfigs.length
        }
    });
}
