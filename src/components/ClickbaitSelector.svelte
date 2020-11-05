<div class="flex flex-col items-center font-sans">
    <span class="text-white text-lg font-bold">Pilih kata kunci clickbait</span>
    <span class="text-dark-1 text-sm">minimal 1, maksimal 2</span>
    <div class="flex flex-row justify-center flex-wrap mt-4">
        {#each tokens as token, i}
            <span
                class="px-2 py-1 m-1 font-bold text-accent-3 text-xl cursor-pointer select-none"
                class:selected={selected.includes(i)}
                on:click={() => toggleSelect(i)}
            >
                {token}
            </span>
        {/each}
    </div>
    <div class="flex mt-8 w-full">
        <span 
            class="text-dark-2 mr-auto font-bold px-4 text-lg cursor-pointer select-none"
            on:click={() => selected = []}
        >
            Clear
        </span>
        <button 
            class="bt gray self-end px-6"
            disabled={selected.length < 1 || selected.length > 2}
            on:click={() =>
                $modal = {
                    event: 'clickbaitSelector',
                    payload: selected.map(s => tokens[s])
                }
            }
        >
            Send
        </button>
    </div>
</div>

<style type="text/postcss">
    .selected {
        @apply bg-accent-3 text-dark-9 rounded-lg;
    }
</style>

<script>
    import { modal } from "../stores.js";

    export let tokens;
    
    let selected = []

    function toggleSelect(index) {
        console.log(selected, index);
        if(selected.includes(index)) {
            selected = selected.filter(s => s != index) 
        } else {
            selected = [...selected, index]
        }
    }
</script>