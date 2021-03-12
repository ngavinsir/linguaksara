<script>
  import Bt from "../../../components/Button.svelte";
  import { getContext } from "svelte";
  const { axios } = getContext("axios");
  const { show: showNotification } = getContext("notification");

  let headline = "";
  let prediction = null;
  let loading = false;

  async function fetchPrediction() {
    if (!headline || loading) return;
    try {
      loading = true;
      const { data } = await axios.post(
        "/predict_clickbait",
        JSON.stringify(headline),
        {
          baseURL: "https://clickbait-model.linguaksara.id/",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      prediction = data;
      console.log(prediction);
    } catch (e) {
      console.log(e);
      prediction = null;
      showNotification("Terjadi kesalahan, silahkan coba lagi", 3000);
    } finally {
      loading = false;
    }
  }
</script>

<div
  class="flex flex-col py-8 sm:py-20 mx-auto px-3 space-y-5 max-w-full"
  style="width: fit-content">
  <span class="text-xl sm:text-3xl text-white font-serif self-center"
    >Clickbait</span>
  <div
    class="font-serif text-sm sm:text-lg text-dark-1 w-full flex flex-col space-y-4 max-w-full"
    style="width: 50ch;">
    <div class="flex space-x-4 sm:space-x-8">
      <input
        class="bg-dark-7 rounded-lg text-white text-base leading-tight align-middle 
        outline-none p-2 sm:p-4 font-sans flex-grow shadow-lg placeholder-dark-1"
        placeholder="Enter your headline..."
        bind:value={headline}
        type="text"
        href="clickbait/label/app"
        rel="prefetch" />
      <Bt
        customClass="bg-accent-3 hover:bg-accent-7 font-bold font-sans py-2 sm:py-4 w-32 sm:w-40"
        on:click={fetchPrediction}
        spinnerColor="#000"
        {loading}
        value="Submit" />
    </div>

    {#if prediction !== null}
      <span class="font-sans text-white text-xl self-center pt-10"
        >{`your headline is `}<span
          class={`font-bold italic ${
            prediction ? "text-accent-3" : "text-red-500"
          }`}>{prediction ? "CLICKBAIT" : "NOT CLICKBAIT"}</span
        ></span>
    {/if}
  </div>
</div>
