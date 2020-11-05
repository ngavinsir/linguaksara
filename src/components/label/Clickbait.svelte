<div class="flex items-center bg-dark-7 text-white rounded-lg shadow-xl px-4 py-4">
    <div class="flex flex-col flex-grow">
        <span class="value text-left leading-none">{data.article.headline}</span>
        {#if data.keywords}
            <div class="flex space-x-2 mt-2">
                {#each data.keywords as keyword}
                    <span class="bg-accent-3 text-dark-9 font-bold text-sm px-2 rounded-lg">{keyword}</span>
                {/each}
            </div>
        {/if}
    </div>
    {#if data.label.value == "Clickbait"} 
        <svg class="flex-shrink-0 ml-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="#F4B61D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    {/if}
    <div class="flex-shrink-0 cursor-pointer ml-4" on:click={() => dispatch('delete', data.label.id)}>
        {#if deleting}
            <Spinner
                size="20"
                speed="750"
                color="#41da8f"
                thickness="4"
                gap="40"
            />
        {:else}
            <svg class="group" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="stroke-current text-gray-400 group-hover:text-gray-100" d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        {/if}
    </div>
</div>

<script>
    import axios from "axios";
    import Spinner from 'svelte-spinner';
    import { history, jwt, type } from "../../stores.js";
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let deleting;
    export let data;
</script>

<style type="text/postcss">
svg {
    width: 20px;
}
</style>