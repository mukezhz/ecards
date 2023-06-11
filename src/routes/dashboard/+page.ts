export const ssr = false;
export const csr = true;
export const prerender = true;

// import type { PageLoad } from './$types';

// export const load = (async ({ fetch }) => {
// 	console.log('server load function called');
// 	const title = 'List of available posts';
// 	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// 	const posts = await response.json();
// 	return { post: { title, posts } };
// }) satisfies PageLoad;
