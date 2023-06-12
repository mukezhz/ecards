import { Client, Account } from 'appwrite';
import {
	PUBLIC_APPWRITE_ENDPOINT,
	PUBLIC_PROJECT_ID
} from '$env/static/public';

export const client = new Client();
client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_PROJECT_ID);
export const account = new Account(client);
