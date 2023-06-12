<script lang="ts">
	import { goto } from '$app/navigation';
	import { Client, Account } from 'appwrite';
	import { onMount } from 'svelte';
	import {
		PUBLIC_LOGIN_SUCCESS_URL,
		PUBLIC_LOGIN_FAILURE_URL,
		PUBLIC_APPWRITE_ENDPOINT,
		PUBLIC_PROJECT_ID
	} from '$env/static/public';

	let loading = true;
	const client = new Client();
	const account = new Account(client);
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
	onMount(() => {
		client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_PROJECT_ID);

		const promise = account.get();

		promise.then((res) => {
			if (res.status) {
				loading = false;
				goto('/dashboard');
			}
		});
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
