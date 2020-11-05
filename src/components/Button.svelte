<button 
    class={`bt flex items-center justify-center ${customClass} ${loading ? "disabled:opacity-100" : ""}`}
    on:click
    {disabled}
>
    {#if loading}
        <Spinner
          size="20"
          speed="750"
          color={spinnerColor}
          thickness="5"
          gap="40"
        />
    {:else}
        {value}
    {/if}
</button>

<script>
    import Spinner from 'svelte-spinner';

    export let disabled;
    export let value;
    export let customClass;
    export let spinnerColor = "#41da8f";
    export let loading;
</script>