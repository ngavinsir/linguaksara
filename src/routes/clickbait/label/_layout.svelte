<script>
  import utc from "dayjs/plugin/utc";
  import dayjs from "dayjs";
  import { getContext } from "svelte";
  dayjs.extend(utc);

  export let segment;

  const { hide, show } = getContext("navbar");
  $: if (segment === "app") {
    hide();
  } else {
    show();
  }
</script>

<slot />
