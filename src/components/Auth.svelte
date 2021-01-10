<script>
    import { getContext } from "svelte";
    import Bt from "./Button.svelte";
    import { jwt, user, type, landing } from "../stores.js";

    const { axios } = getContext("axios");

    let loginForm = {
        email: "",
        password: "",
    };
    let registerForm = {
        email: "",
        password: "",
        confirmPassword: "",
        age: null,
        is_male: false,
        name: "",
    };

    let state = "Login";
    let showDropdown = false;
    let errorMessage = "";
    let loading = false;
    let bt;
    let scrollY;

    $: isLogin = state === "Login";

    async function login() {
        loading = true;
        const url = `/login`;
        try {
            const {
                data: token,
                data: { error },
            } = await axios.post(url, loginForm);
            if (!error) {
                $jwt = token;
                errorMessage = "";
                showDropdown = false;
            } else errorMessage = error;
        } catch (e) {
            console.log(e);
            // handle login error
        } finally {
            loading = false;
        }
    }

    async function register() {
        if (registerForm.password !== registerForm.confirmPassword) {
            errorMessage = "passwords are not the same";
            return;
        }
        loading = true;
        const url = `/register`;
        try {
            const {
                data: token,
                data: { error },
            } = await axios.post(url, registerForm);
            if (!error) {
                $jwt = token;
                errorMessage = "";
                showDropdown = false;
            } else errorMessage = error;
        } catch (e) {
            console.log(e);
            // handle register error
        } finally {
            loading = false;
        }
    }

    async function signout() {
        $jwt = "";
    }

    async function handleKeydown(event) {
        if (event.keyCode === 13) {
            if (isLogin) await login();
            else await register();
        }
    }

    function genderClass(male, selected) {
        const bg = male == selected ? "bg-accent-3" : "bg-dark-7";
        const textBg = male == selected ? "text-dark-9" : "text-dark-2";
        return `flex flex-1 justify-center items-center p-2 ${bg} ${textBg} font-semibold text-base leading-tight align-middle rounded-lg cursor-pointer`;
    }
</script>

<style type="text/postcss">
    .dropdown-wrapper {
        @apply w-32 pt-2 bg-dark-7 absolute right-0 rounded-lg shadow-xl py-2;
    }
</style>

{#if $jwt}
    <div
        class="fixed top-0 z-20 flex items-center w-screen p-4 px-6 border-b-2 shadow-2xl bg-dark-8 border-dark-7">
        <span
            class={$type == 'clickbait' ? 'menu bg-accent-3 text-dark-9' : 'menu'}
            on:click={() => {
                scrollY = 0;
                $type = 'clickbait';
            }}>
            Clickbait
        </span>
        <div
            class="relative ml-auto"
            on:mouseover={() => (showDropdown = true)}
            on:mouseout={() => (showDropdown = false)}>
            <span class="text-gray-100 cursor-pointer">{$user.name}</span>
            <div class={showDropdown ? 'dropdown-wrapper' : 'hidden'}>
                <button
                    class="flex items-center w-full px-4 py-2 text-left text-white hover:underline"
                    on:click={signout}>
                    Sign out
                </button>
            </div>
        </div>
    </div>
{:else if state}
    <div
        class="inset-0 z-10 flex flex-col items-center justify-center min-w-full min-h-screen font-sans bg-dark-9">
        <a
            class="text-3xl sm:text-5xl text-accent-3 font-serif font-bold mb-6 cursor-pointer"
            href="clickbait"
            rel="prefetch">
            clickbait
        </a>
        <div
            class="flex flex-col items-center justify-center w-3/5 max-w-xs py-4">
            {#if errorMessage}
                <span
                    class="max-w-xl mb-2 text-center text-red-500">{errorMessage}</span>
            {/if}
            <form class="flex flex-col items-center w-full text-white">
                {#if state === 'Login'}
                    <label class="flex flex-col w-full">
                        Email
                        <input
                            id="email"
                            class="mb-4 shadow-md"
                            bind:value={loginForm.email}
                            type="text"
                            spellcheck="false"
                            on:keydown={handleKeydown} />
                    </label>
                    <label class="flex flex-col w-full">
                        Password
                        <input
                            class="mb-6 shadow-md"
                            bind:value={loginForm.password}
                            type="password"
                            spellcheck="false"
                            on:keydown={handleKeydown} />
                    </label>
                {:else if state === 'Register'}
                    <label class="flex flex-col w-full">
                        Name
                        <input
                            class="mb-4 shadow-md"
                            bind:value={registerForm.name}
                            type="text"
                            spellcheck="false"
                            on:keydown={handleKeydown} />
                    </label>
                    <label class="flex flex-col w-full">
                        Email
                        <input
                            class="mb-4 shadow-md"
                            bind:value={registerForm.email}
                            type="text"
                            spellcheck="false"
                            on:keydown={handleKeydown} />
                    </label>
                    <label class="flex flex-col w-full">
                        Age
                        <input
                            class="mb-6 shadow-md"
                            bind:value={registerForm.age}
                            type="number"
                            spellcheck="false"
                            on:keydown={handleKeydown} />
                    </label>
                    <span class="self-start">Gender</span>
                    <div class="flex flex-row w-full mb-6">
                        <label
                            class={genderClass(false, registerForm.is_male) + ' mr-2'}
                            for="female">
                            <input
                                id="female"
                                hidden
                                type="radio"
                                bind:group={registerForm.is_male}
                                value={false} />
                            Female
                        </label>
                        <label
                            class={genderClass(true, registerForm.is_male)}
                            for="male">
                            <input
                                id="male"
                                hidden
                                type="radio"
                                bind:group={registerForm.is_male}
                                value={true} />
                            Male
                        </label>
                    </div>
                    <label class="flex flex-col w-full">
                        Password
                        <input
                            class="mb-6 shadow-md"
                            bind:value={registerForm.password}
                            type="password"
                            spellcheck="false"
                            on:keydown={handleKeydown} />
                    </label>
                    <label class="flex flex-col w-full">
                        Confirm Password
                        <input
                            class="mb-6 shadow-md"
                            bind:value={registerForm.confirmPassword}
                            type="password"
                            spellcheck="false"
                            on:keydown={handleKeydown} />
                    </label>
                {/if}
            </form>
            <Bt
                bind:this={bt}
                customClass="w-full font-base"
                on:click={isLogin ? login : register}
                {loading}
                spinnerColor="#000"
                disabled={loading}
                value={state} />
            <span class="w-full mt-4 text-lg text-center text-white font-base">
                or
                <span
                    class="cursor-pointer text-accent-3 hover:underline"
                    on:click={() => {
                        state = isLogin ? 'Register' : 'Login';
                        errorMessage = '';
                    }}>
                    {isLogin ? 'Register' : 'Login'}
                </span>
            </span>
        </div>
    </div>
{/if}

<svelte:window bind:scrollY />
