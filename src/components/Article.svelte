<div class="flex flex-col items-center w-full">
  {#if headline && renderHeadline}
    {#if loading}
      <div class="py-4">
        <Spinner  
          size="50"
          speed="750"
          color="#41da8f"
          thickness="3"
          gap="40"
        />
      </div>
    {:else}
      <span class="w-full font-serif leading-tight headline">
        {headline}
      </span>
    {/if}
  {/if}
  {#if !loading}
    <div class="flex justify-end w-full">
      {#if $article && $article.content}
        <span 
          class="my-4 mr-8 text-sm font-bold cursor-pointer text-accent-3"
          on:click={() => showContent = !showContent}
        >
          {`${showContent ? "HIDE" : "SHOW"} CONTENT`}
        </span>
      {/if}
      <button 
        class="my-4 text-sm font-bold text-gray-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-default"
        on:click={getArticle}
        disabled={loading}
      >
        {headline == fallbackHeadline ? "RETRY" : "SKIP"}
      </button>
    </div>
  {/if}
  {#if showContent}
    <div class="content-wrapper">
      <p class="mr-4 text-white">
        {$article && $article.content ? $article.content.split("||").join(" ") : "No content"}
      </p>
    </div>
  {/if}
</div>

<svelte:head>
  <title>{`${headline} | linguaksara`}</title>
</svelte:head>
<svelte:window on:keydown={handleKeydown}/>

<script>
    import Spinner from 'svelte-spinner';
    import { article, type, jwt } from "../stores.js";
    import { createEventDispatcher } from 'svelte';
    import { tick, beforeUpdate, getContext } from 'svelte';

    const fallbackHeadline = "Can't find headline" 
    const { axios } = getContext("axios");
    const dispatch = createEventDispatcher();

    let showContent = false;
    let renderHeadline = true;
    let headline;
    let loading = false;

    $: getArticle($jwt);
    $: updateArticle($article);

    async function updateArticle(article) {
        renderHeadline = false;
        await tick();
        headline = article && article.headline ? article.headline : fallbackHeadline;
        renderHeadline = true;
    }

    async function handleKeydown(event) {
        if(event.keyCode === 13) await getArticle($jwt);
    }

    export async function getArticle(jwt) {
        if(!$jwt || loading) return;
        const timeout = setTimeout(() => {
            loading = true
        }, 100);
        const url = `/${$type}/article/random`;
        try {
            const { data, data: { error } } = await axios.get(url);
            $article = !error ? data : null;
        } catch (e) {
            console.log(e);
            // handle get article error
        } finally {
            clearTimeout(timeout);
            loading = false;
        }
    }
</script>

<style type="text/postcss">
.headline {
    @apply text-white text-3xl text-center;
}

@screen sm {
    .headline {
        @apply text-5xl;
    }
}
.content-wrapper {
  max-height: 35vh;
  overflow-y: auto;
}
</style>
