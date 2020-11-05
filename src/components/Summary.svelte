{#if !$showHistory}
    <div class="flex flex-col items-center w-full max-w-screen-md">
        {#if sentences.length && renderSentenceCount}
            <span
                in:fly={{duration:200, y:150}}
                class="self-end mt-8 mb-2 mr-2 text-sm text-white sm:text-base"
            >
                {sentences.length} sentences
            </span>
        {/if}
        {#if $type === "summary" && sentences.length && $article}
            {#each sentences as sentence, i (`${$article.id}-${i}`)}
                <div
                    in:fly={{duration:200, y:150, delay: 200}}
                    out:fly={{duration:200, y:150}}
                    class={selected.includes(i) ? "sentence border-white border-2 bg-dark-8 sm:hover:bg-dark-8" : "sentence border-2 border-transparent"}
                    on:click={() => toggleSelect(i)}
                >
                    <span class={selected.includes(i) ? "numbering bg-blue-500" : "numbering"}>
                        {selected.includes(i) ? selected.indexOf(i)+1 : i+1}
                    </span>
                    <span class="ml-4 text-gray-100 sm:text-lg">{sentence}</span>
                </div>
            {/each}
        {/if}
    </div>
{/if}

<button
    transition:slide={{duration:150}}
    on:click={() => $showHistory = !$showHistory}
    class="fixed bottom-0 right-0 flex items-center justify-center w-16 h-16 p-4 mb-5 mr-5 border-2 rounded-full shadow-2xl border-dark-7 sm:mr-8 sm:mb-8 focus:outline-none bg-dark-8 sm:hover:bg-dark-7"
    style={`transform: translateY(${$fibSpring}px);`}
>
    {#if !$showHistory}
        <svg class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={"max-width: 18px"} d="M7 8H17M7 12H11M12 20L8 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H16L12 20Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    {:else}
        <svg class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={"max-width: 18px"} d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    {/if}
</button>

{#if $type === "summary" && selected.length && !$showHistory}
    <div bind:clientHeight={footerHeight} transition:slide={{duration:150}} class="footer">
        <span class="mr-auto text-sm text-white sm:ml-4 sm:text-base">{selected.length} selected</span>
        <span 
            class="mr-4 text-sm font-bold text-white cursor-pointer"
            on:click={() => selected = []} 
        >
            RESET
        </span>
        <Bt 
            customClass="w-24 sm:w-32 text-base my-1 sm:mx-6" 
            on:click={submit}
            spinnerColor="#000"
            disabled={!selected.length || loading}
            {loading}
            value="Submit"
        />
    </div>
{/if}

<svelte:window bind:scrollY={scrollY}/>

<script>
    import Bt from "./Button.svelte";
    import { article, history, showHistory, type } from "../stores.js";
    import { fly, slide } from "svelte/transition";
    import { tick, getContext } from 'svelte';
    import { spring } from 'svelte/motion';

    const { axios } = getContext("axios");

    let selected = [];
    let sentences = [];
    let loading = false;
    let renderSentenceCount = true;
    let scrollY;
    let footerHeight = 0;
    let fibSpring = spring(0, {
        stiffness: 0.12,
	    damping: 0.5
    });

    $: if(!selected.length) footerHeight = 0;
    $: updateContent($article);
    $: fibSpring.set(footerHeight ? -footerHeight : 0);

    async function updateContent(article) {
        renderSentenceCount = false;
        selected = [];
        await tick();
        sentences = article && article.content ? article.content.split("||") : [];
        renderSentenceCount = true;
    }

    function toggleSelect(i) {
        if (selected.includes(i)) selected = selected.filter(s => s != i);
        else selected = [...selected, i];
    }

    async function submit() {
        if(loading) return;
        loading = true;
        const summary = selected.map(i => sentences[i]).join(" ");
        const url = `/summary/labeling`;
        const data = {
            value: summary,
            article_id: $article.id
        };
        try {
            const { data: { error, label_id, new_article } } = await axios.post(url, data)
            if(!error)  {
                selected = [];
                history.add({ 
                    label: {
                        id: label_id,
                        value: summary,
                        updated_at: new Date().toISOString()
                    },
                    article: $article,
                })
                $article = new_article;
                scrollY = 0;
            }
        } catch (e) {
            console.log(e);
            // handle label summary error
        } finally {
            loading = false;
        }
    }
</script>
