import { Databases } from 'node-appwrite';
import { client } from './client';

export const databases = new Databases(client);
