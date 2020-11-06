<script>
	import Axios from "../components/Axios.svelte";
	import Notification from "../components/Notification.svelte";
	import Modal from '../components/Modal.svelte';
	import utc from 'dayjs/plugin/utc';
	import dayjs from 'dayjs';
	dayjs.extend(utc);
</script>

<svelte:head>
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
  	<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
  	<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
	<style>
		body {
			background-color: #272727;
		}
	</style>
</svelte:head>

<Modal><Notification><Axios>
	<slot></slot>
</Axios></Notification></Modal>