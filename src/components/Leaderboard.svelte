<div class="flex flex-col bg-dark-7 w-64 leaderboard rounded-lg shadow-lg items-center p-4 font-sans">
    <span class="text-white text-xl font-bold">leaderboard</span>
    {#await promiseScore}
        <span />
    {:then score}
        <span class="text-accent-5 font-bold">{`poin anda: ${score}`}</span>
    {/await}
    <div class="flex flex-col mt-5 w-full flex-grow items-center">
        {#await promiseLeaderboards}
            <Spinner
                size="50"
                speed="750"
                color="#41da8f"
                thickness="3"
                gap="40"
            />
        {:then leaderboards}
            {#if leaderboards.length}
                {#each leaderboards as leaderboard, i}
                    <div class="flex w-full">
                        <span
                            class={`flex-grow ${(i+1)%2 == 0 ? 'text-accent-3' : 'text-gray-200'} font-sans text-lg`}
                        >
                            {`${i+1}. ${leaderboard.name}`}
                        </span>
                        <span class={`${(i+1)%2 == 0 ? 'text-accent-3' : 'text-gray-200'} font-sans`}>
                            {leaderboard.score}
                        </span>
                    </div>
                {/each}
            {:else}
                <span class="text-dark-9 text-lg my-auto text-center">Belum ada peserta</span>
            {/if}
        {:catch error}
            <span class="text-dark-9 text-lg my-auto text-center">Tidak dapat menghubungi server</span>
        {/await}
    </div>
</div>

<style type="text/postcss">
    .leaderboard {
        min-width: 275px;
        min-height: 350px;
    }
</style>

<script>
    import { getContext } from "svelte";
    import Spinner from 'svelte-spinner';

    const { axios } = getContext("axios");
    
    let promiseScore = getScore();
    let promiseLeaderboards = getLeaderboards();

    async function getScore() {
        try {
            const { data: score, data: { error } } = await axios.get("/clickbait/label/score");
            if(!error) {
                return score;
            } else {
                throw new Error(error);
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    async function getLeaderboards() {
        try {
            const { data: leaderboards, data: { error } } = await axios.get("/clickbait/label/leaderboard/10")
            if(!error) {
                return leaderboards;
            } else {
                throw new Error(error);
            }
        } catch(e) {
            throw new Error(e);
        }
    }
</script>