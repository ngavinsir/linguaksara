{#if showClickbaitGuide}
  <div 
    style={`transform: translate(${screenWidth > 640 ? '0' : '-50%'}, ${$clickbaitGuideSpring}px);`}
    class="fixed z-30 flex flex-col items-center w-11/12 max-w-xs p-4 rounded-lg clickbait-guide bg-accent-1"
  >
    <span class="text-xs font-bold text-accent-9">{`TUTORIAL - STEP ${contents.length + 1}`}</span> 
    <span class="font-sans text-black">Klik tombol di bawah ini untuk melabel artikel apakah bersifat clickbait atau tidak!</span> 
  </div>
{/if}

<style type="text/postcss">
  .clickbait-guide {
    bottom: 70px;
    left: 50%;
  }

  @screen sm {
    .clickbait-guide {
      bottom: 90px;
      right: 64px;
      transform: none;
      left: auto;
    }
  }
</style>

<svelte:window bind:innerWidth={screenWidth} />

<script>
  import Welcome from "./content/Welcome.svelte";  
  import Clickbait from "./content/Clickbait.svelte";
  import Example from "./content/Example.svelte";
  import { type, jwt, onboardingStep, history, doneOnboarding } from "../../stores.js";
  import { getContext, onDestroy } from "svelte";
  import { spring } from 'svelte/motion';

  const clickbaitGuideSpring = spring(0);
  const { open, close } = getContext("simple-modal");
  const contents = [Welcome, Clickbait, Example];

  let clickbaitGuideInterval = null
  let clickbaitGuideMove = 10;
  let screenWidth;
  let showClickbaitGuide = false;

  $: if($jwt && !$doneOnboarding) {
    start();
  }
  $: show($onboardingStep);
  $: showClickbaitGuide = $onboardingStep > contents.length && !$doneOnboarding && $type == 'clickbait';
  $: if(showClickbaitGuide && !clickbaitGuideInterval) {
    clickbaitGuideInterval = setInterval(() => {
      clickbaitGuideSpring.set($clickbaitGuideSpring + clickbaitGuideMove);
      console.log('interval');
      clickbaitGuideMove *= -1;
    }, 300);
  } else if(clickbaitGuideInterval && !showClickbaitGuide) {
    clearInterval(clickbaitGuideInterval);
    clickbaitGuideInterval = null;
  }

  
  function start() {
    $onboardingStep = 1;
  }

  function show(step) {
    if(step > contents.length) {
      close();
      return;
    }
    open(contents[step-1], { step }, {
      closeButton: false,
      closeOnEsc: false,
      closeOnOuterClick: false,
      styleWindow: {
        backgroundColor: '#3d3d3d', 
        width: '425px',
        maxWidth: '100%'
      }
    })
  }

  onDestroy(() => {
    if(clickbaitGuideInterval) {
      clearInterval(clickbaitGuideInterval);
    }
  })
</script>
