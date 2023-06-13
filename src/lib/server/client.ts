import { Client } from 'node-appwrite';
import { APPWRITE_ENDPOINT, PROJECT_ID, JWT_SECRET, API_KEY } from '$env/static/private';

export const client = new Client();
client.setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
