{#if showNotification}
  <div 
    transition:fly={{y:200, duration:300}} 
    class="fixed bottom-0 z-30 w-11/12 max-w-sm p-4 mb-20 bg-red-300 rounded-lg shadow-xl notification"
  >
    <span class="font-sans text-center text-red-900">{notification}</span>
  </div>
{/if}
<slot></slot>

<script>
  import { setContext } from 'svelte';
  import { fly } from "svelte/transition";
  
  let notification = "";
  let showNotification = false;

  const show = (notificationText, duration) => {
    if(showNotification) return;
    notification = notificationText;
    showNotification = true;
    setTimeout(() => {
      showNotification = false;
    }, duration);
  }

  setContext('notification', { show })
</script>

<style type="text/postcss">
  .notification {
    left: 50%;
    transform: translateX(-50%);
  }
</style>

