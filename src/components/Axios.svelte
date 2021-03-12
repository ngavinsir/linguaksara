<script>
  import { setContext, getContext } from "svelte";
  import { jwt } from "../stores.js";
  import axios from "axios";
  import config from "../config.js";

  const { show: showNotification } = getContext("notification");

  $: instance.defaults.headers["Authorization"] = `Bearer ${$jwt}`;

  const instance = axios.create({
    baseURL: config.baseUrl,
    headers: {
      Authorization: `Bearer ${$jwt}`,
    },
    timeout: 5000,
  });
  instance.interceptors.response.use(
    (response) => {
      const { data } = response;
      if (
        data &&
        data.status === "Unauthorized" &&
        data.error === "signature is invalid"
      )
        $jwt = "";
      return response;
    },
    (error) => {
      if (error.code === "ECONNABORTED") {
        showNotification("Tidak dapat menghubungi server.", 3000);
      }
      return Promise.reject(error);
    }
  );

  setContext("axios", {
    axios: instance,
  });
</script>

<slot />
