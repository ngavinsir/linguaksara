<script>
	import Axios from "../../components/Axios.svelte";
	import Notification from "../../components/Notification.svelte";
	import Modal from "../../components/Modal.svelte";
	import utc from "dayjs/plugin/utc";
	import dayjs from "dayjs";
	dayjs.extend(utc);
</script>

<Modal>
	<Notification>
		<Axios>
			<slot />
		</Axios>
	</Notification>
</Modal>
