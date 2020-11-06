<div 
    class="flex flex-col items-center py-8 w-full h-full max-w-5xl mx-auto 
    px-2 sm:px-12 md:px-16 lg:px-20 relative"
>
    <h1 class="font-sans text-white font-bold text-5xl">Progress</h1>
    <div class="flex space-x-4 sm:space-x-8 mt-6 sm:mt-12 self-start items-center">
        <div 
            class="relative font-sans font-semibold text-base sm:text-lg" 
            on:mouseover={() => showDropdown = true} 
            on:mouseout={() => showDropdown = false}
        >
            <span 
                class="rounded-xl px-4 py-2 text-dark-8 bg-accent-5 cursor-pointer
                hover:bg-accent-6 flex items-center"
            >
                {selectItems[selected].label}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-3 text-accent-9 ml-2" fill="currentColor" viewBox="0 0 16 10"><path fill-rule="evenodd" d="M.47.49a1.6 1.6 0 012.26 0l5.26 5.26L13.25.49a1.6 1.6 0 112.26 2.26L9.12 9.14a1.6 1.6 0 01-2.26 0l-6.4-6.4A1.6 1.6 0 01.47.5z" clip-rule="evenodd"/></svg>
            </span>
            <div class={showDropdown ? "dropdown-wrapper" : "hidden"}>
                {#each selectItems as selectItem, i (selectItem.value)}
                    <span 
                        class="font-medium text-white py-1 cursor-pointer hover:underline"
                        on:click={() => {
                            selected = i;
                            showDropdown = false;
                        }}
                    >
                        {selectItem.label}
                    </span>
                {/each}
            </div>
        </div>
        <span class="font-sans font-semibold text-dark-1 text-base sm:text-xl">
            {`${weeks[selected].format("D MMM YYYY")} - ${weeks[selected].add(6, 'day').format("D MMM YYYY")}`}
        </span>
    </div>

    <table class="mt-4 w-full rounded-xl bg-dark-7 relative">
        <thead>
            <tr>
                <th 
                    class="text-left text-sm lg:text-base font-semibold 
                    text-dark-1 uppercase sticky top-0 bg-dark-8" 
                    style={`min-width: ${screenWidth < 400 || (screenWidth >= 640 && screenWidth < 768) ? 8 : 15}rem`}
                >
                    <div class="px-3 lg:px-6 py-3 rounded-tl-xl bg-dark-6 w-full h-full absolute top-0 left-0">
                        Name
                    </div>
                </th>
                {#each screenWidth < 640 ? selectItems.slice(selected, selected+1) : selectItems as selectItem (selectItem.value)}
                    <th 
                        class="px-3 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold 
                        text-dark-1 uppercase sticky top-0 bg-dark-6 whitespace-no-wrap">
                        {selectItem.label}
                    </th>
                {/each}
                <th 
                    class="text-left text-sm lg:text-base font-semibold w-8
                    text-accent-5 uppercase sticky top-0 bg-dark-8"
                    style="min-width: 5rem"
                >
                    <div class="px-3 lg:px-6 py-3 rounded-tr-xl bg-dark-6 w-full h-full absolute top-0 left-0">
                        Total
                    </div>
                </th>
            </tr>
        </thead>
        <tbody class="divide-y divide-dark-5 h-0 w-full" style="min-height: 150px">
            {#if loading}
                <tr>
                    <td colspan={screenWidth < 640 ? 3 : 7} class="py-16">
                        <div class="w-full flex justify-center">
                            <Spinner
                                size="40"
                                speed="750"
                                color="#41da8f"
                                thickness="4"
                                gap="40"
                            />
                        </div>
                    </td>
                </tr>
            {/if}
            {#each progress as item (item[0])}
                <tr class="font-sans text-white font-normal text-xl">
                    <td class="px-3 lg:px-6 py-4">{item[0]}</td>
                    {#each screenWidth < 640 ? item[1].slice(selected, selected+1) : item[1] as week}
                        <td class="px-3 lg:px-6 py-4">{week}</td>
                    {/each}
                    <td class="px-3 lg:px-6 py-4 text-accent-5">
                        {item[1].reduce((a, b) => a + b, 0)}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<svelte:window bind:innerWidth={screenWidth} />

<style type="text/postcss">
    .dropdown-wrapper {
        @apply flex flex-col bg-dark-5 absolute left-0 rounded-lg shadow-xl p-2 px-4 min-w-full z-10;
    }
</style>

<script>
    import Spinner from 'svelte-spinner';
    import dayjs from 'dayjs';
    import { getContext } from 'svelte';

    const { axios } = getContext("axios");

    let loading = true;
    let progress = [];
    let showDropdown = false;
    let selected = 0;
    let screenWidth = 0;
    const startWeek = '2020-11-09T00:00:00+00:00';
    const startWeekDate = dayjs(startWeek).utc();
    const duration = 5;
    const weeks = [startWeekDate];

    for(let i = 1; i < duration; i++) {
        weeks.push(weeks[i-1].add(1, 'w'));
    }

    const selectItems = weeks.map((_, i) => ({
        value: i,
        label: "Week " + (i+1),
    }));

    getProgress();
    async function getProgress() {
        const url = '/clickbait/label/progress/5?start=2020-11-09T00:00:00%2b00:00';
        try {
            const { data: newData } = await axios.get(url);
            processData(newData);
        } catch(err) {
            console.log(err);
        } finally {
            loading = false;
        }
    }

    function processData(labelProgressWeeks) {
        const newData = new Map();
        labelProgressWeeks.forEach(labelProgressWeek => {
            labelProgressWeek.forEach(labelProgress => {
                if(newData.get(labelProgress.name)) {
                    newData.get(labelProgress.name).push(labelProgress.progress);
                } else {
                    newData.set(labelProgress.name, [labelProgress.progress]);
                }
            });
        });
        progress = [...newData.entries()].sort((a, b) => {
            return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
        });
    }
</script>