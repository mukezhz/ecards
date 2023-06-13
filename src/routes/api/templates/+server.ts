import {databases} from '$lib/server/db';
import {DB_CONSTANT} from '$lib/server/constant';
import {AppwriteException, ID, Query} from 'node-appwrite';
import {json} from '@sveltejs/kit';
import type {RequestEvent} from './$types';
import type {KonvaShapeType} from "$lib/types/template";

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
    const body = await request.json();
    const {konvaConfigs, owner, name}: { owner: string, name: string, konvaConfigs: KonvaShapeType[] } = body;
    const id = ID.unique();
    for (const konvaConfig of konvaConfigs) {
            const {type, ...config} = konvaConfig
            await databases.createDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, id, {
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

export async function PUT({request}: RequestEvent) {
    const body = await request.json();
    const {konvaConfigs, owner, name}: { owner: string, name: string, konvaConfigs: KonvaShapeType[] } = body;
    for (const konvaConfig of konvaConfigs) {
        const {type, name: shapeName, ...config} = konvaConfig
        const template = await databases.updateDocument(DB_CONSTANT.DATABASE, DB_CONSTANT.TEMPLATES, shapeName, {
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
