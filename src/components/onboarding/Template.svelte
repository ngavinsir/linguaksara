<div class="flex flex-col items-center font-sans">
  <span class="text-xs font-bold text-dark-3">{`TUTORIAL - STEP ${step}`}</span> 
  <span class="mt-3 mb-6 text-2xl font-bold leading-tight text-center text-white sm:text-5xl">{title}</span>
  <div class="sm:w-11/12">
    <slot></slot>
  </div>
  <div class="flex flex-row w-full mt-10 font-bold text-accent-5">
    {#if step > 1}
      <span on:click={prev} class="self-start inline-block hover:cursor-pointer" >Prev</span>
    {/if}
    <span on:click={next} class="self-end inline-block ml-auto hover:cursor-pointer">Next</span>
  </div>
</div>

<script>
  import { onboardingStep } from "../../stores.js";

  export let step;
  export let title;

  function next() {
    $onboardingStep += 1;
  }

  function prev() {
    $onboardingStep -= 1;
  }
</script>
