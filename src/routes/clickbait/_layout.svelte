<script>
	import Axios from "../../components/Axios.svelte";
	import Notification from "../../components/Notification.svelte";
	import Modal from "../../components/Modal.svelte";
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

<Modal>
	<Notification>
		<Axios>
			<slot />
		</Axios>
	</Notification>
</Modal>
