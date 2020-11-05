{#if $type === "clickbait" || $showHistory}
    <span class="font-bold text-gray-100">History</span>
    <div class="flex flex-col mt-2">
        {#each sortedHistories as history,i (history.label.id)}
            <div 
                in:fly={{duration:150, y:50}}
                out:fly={{duration:150, y:50}}
                animate:flip={{duration:150}} class="mb-4 last:mb-0">
                <svelte:component 
                    this={labelComponent} 
                    data={history} 
                    on:delete={e => deleteLabel(e.detail)}
                    deleting={deleting.includes(history.label.id)}
                />
            </div>
        {/each}
        {#if !sortedHistories.length && !loading}
            <span
                in:fly={{duration:150, y:50}}
                out:fly={{duration:150, y:50}}
                class="self-center pt-5 font-bold text-white opacity-50 sm:text-lg"
            >
                There is no history...
            </span>
        {/if}
        {#if loading}
            <div class="self-center py-4">
                <Spinner  
                    size="50"
                    speed="750"
                    color="#41da8f"
                    thickness="3"
                    gap="40"
                />
            </div>
        {/if}
    </div>
{/if}

<svelte:window on:keydown={handleKeydown}/>

<script>
    import cancel from "axios";
    import _ from "lodash";
    import ClickbaitLabel from "./label/Clickbait.svelte";
    import SummaryLabel from "./label/Summary.svelte";
    import Spinner from 'svelte-spinner';
    import { history, type, showHistory } from "../stores.js";
    import { fly } from 'svelte/transition';
    import { flip } from "svelte/animate"
    import { getContext, tick } from "svelte";

    const { axios } = getContext("axios");
    let deleting = [];
    let loading = false;
    let cancelSource = null;
    let sortedHistories;

    $: getHistories($type);
    $: sortedHistories = _.sortBy($history, function(label) {
            return Date.parse(label.label.updated_at); 
        }).reverse();
    $: labelComponent = $type == "clickbait" ? ClickbaitLabel : $type == "summary" ? SummaryLabel : null;

    async function getHistories(type) {
        if (cancelSource) cancelSource.cancel();
        const timeout = setTimeout(() => {
            loading = true
        }, 100);
        cancelSource = cancel.CancelToken.source();
        $history = [];
        await tick();
        const url = `/${type}/label`;
        try {
            const { data: histories, data: { error } } = await axios.get(url, {
                cancelToken: cancelSource.token
            });
            if(!error) $history = histories;
        } catch (e) {
            console.log(e);
            // handle get histories error
        } finally {
            clearTimeout(timeout);
            loading = false;
            cancelSource = null;
        }
    }

    async function deleteLabel(labelID) {
        if(deleting.includes(labelID)) return;
        deleting = [...deleting, labelID]
        const url = `/${$type}/label/${labelID}`
        try {
            const { data: { error }} = await axios.delete(url);
            if(!error) await history.delete(labelID);
        } catch (e) {
            console.log(e);
            // handle delete label error
        } finally {
            deleting = deleting.filter(d => d !== labelID);
        }
    }

    async function handleKeydown(event) {
        if(event.keyCode === 8 && sortedHistories.length) await deleteLabel(sortedHistories[0].label.id)
    }
</script>
