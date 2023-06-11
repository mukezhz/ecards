export const ssr = false;
export const csr = true;
// export const prerender = true;

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	console.log('server load function called');
	const title = 'List of available posts';
	return { post: { title } };
}) satisfies PageServerLoad;
