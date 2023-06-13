<script lang="ts">
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import {PUBLIC_LOGIN_FAILURE_URL, PUBLIC_LOGIN_SUCCESS_URL} from '$env/static/public';
    import {account} from '$lib/client';
    import {AppwriteException} from "node-appwrite";

    let loading = true;
    const handleGithubLogin = () => {
        try {
            account.createOAuth2Session('github', PUBLIC_LOGIN_SUCCESS_URL, PUBLIC_LOGIN_FAILURE_URL);
        } catch (e: unknown) {
            if (e instanceof AppwriteException) {
                console.log({error: e})
            }
        }
    };
    const handleFacebookLogin = () => {
        try {
            account.createOAuth2Session('facebook', PUBLIC_LOGIN_SUCCESS_URL, PUBLIC_LOGIN_FAILURE_URL);
        } catch (e: unknown) {
            if (e instanceof AppwriteException) {
                console.log({error: e})
            }
        }
    };
    const handleEmailLogin = async (email = 'test@test.com', password = 'Nepal@123') => {
        const promise = account.createEmailSession(email, password);
        promise
            .then((res) => {
                console.log({mememe: res})
                if (res.providerUid === email) goto('/dashboard');
            })
            .catch((err) => {
                console.error({err});
            });
    };
    onMount(async () => {
        try {
            const user = await account.get();
            if (user) {
                goto('/dashboard');
            }
        } catch (err) {
            console.error({err});
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
    <div>
        <button class="btn" on:click={handleFacebookLogin}>Login with Facebook</button>
    </div>
{/if}
