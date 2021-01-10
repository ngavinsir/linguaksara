<script>
    import Auth from "../../components/Auth.svelte";
    import Article from "../../components/Article.svelte";
    import Clickbait from "../../components/Clickbait.svelte";
    import Summary from "../../components/Summary.svelte";
    import History from "../../components/History.svelte";

    import Onboarding from "../../components/onboarding/Onboarding.svelte";
    import { jwt, type } from "../../stores.js";

    let article;

    $: component =
        $type === "clickbait"
            ? Clickbait
            : $type === "summary"
            ? Summary
            : null;
</script>

<main class="min-h-screen">
    <div
        class="flex flex-col items-center min-h-screen font-sans leading-normal min-w-screen bg-dark-9">
        <Auth />
        {#if $jwt}
            <Onboarding />
            <div
                class="flex flex-col items-center w-11/12 max-w-4xl pt-20 sm:pt-24">
                <Article bind:this={article} />
                <svelte:component
                    this={component}
                    on:retry={(_) => article.getArticle()} />
            </div>
            <div class="w-11/12 mt-8 max-w-screen-md pb-40">
                <History />
            </div>
        {/if}
    </div>
</main>
