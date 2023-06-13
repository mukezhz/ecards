<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { PUBLIC_LOGIN_SUCCESS_URL, PUBLIC_LOGIN_FAILURE_URL } from '$env/static/public';
	import { account, client } from '$lib/client';

	let loading = true;
	const handleGithubLogin = () => {
		account.createOAuth2Session('github', PUBLIC_LOGIN_SUCCESS_URL, PUBLIC_LOGIN_FAILURE_URL);
	};
	const handleEmailLogin = (email = 'test@test.com', password = 'Nepal@123') => {
		const promise = account.createEmailSession(email, password);
		promise
			.then((res) => {
				if (res.providerUid === email) goto('/dashboard');
			})
			.catch((err) => {
				console.error({ err });
			});
	};
	onMount(async () => {
		try {
			// console.log(await account.createJWT());
			client;
			const user = await account.get();
			if (user) {
				goto('/dashboard');
			}
		} catch (err) {
			console.error({ err });
		}
		loading = false;
	});
</script>

{#if loading}
	<div class="loading">Loading...</div>
{:else}
	<div>
		<button class="btn" on:click={() => handleEmailLogin()}>Login with Email</button>
	</div>
	<div>
		<button class="btn" on:click={handleGithubLogin}>Login with Github</button>
	</div>
{/if}
