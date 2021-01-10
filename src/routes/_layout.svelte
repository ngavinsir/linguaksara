<script>
	import { setContext } from "svelte";

	const researches = [
		{
			display: "Clickbait",
			href: "clickbait",
		},
	];

	let showNavBar = true;
	setContext("navbar", {
		hide: () => (showNavBar = false),
		show: () => (showNavBar = true),
	});

	let showDropdown = false;
</script>

<style type="text/postcss">
	.dropdown-wrapper {
		@apply bg-dark-6 absolute left-0 rounded-lg shadow-xl py-3 px-4;
		min-width: 140px;
	}
</style>

<svelte:head>
	<link rel="dns-prefetch" href="//fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@400;700&display=swap"
		rel="stylesheet" />
	<style>
		html {
			height: 100%;
		}
		body {
			background-color: #272727;
			min-height: 100%;
		}
	</style>
</svelte:head>

{#if showNavBar}
	<div
		class="bg-dark-7 fixed top-0 px-10 py-3 flex space-x-12 items-center w-full shadow-md">
		<a
			href="/"
			rel="prefetch"
			class="text-2xl sm:text-3xl text-accent-3 font-serif font-bold">
			linguaksara
		</a>
		<a
			href="/"
			rel="prefetch"
			class="font-sans text-white text-xl hover:underline">Home</a>
		<div
			class="relative ml-auto"
			on:mouseover={() => (showDropdown = true)}
			on:mouseout={() => (showDropdown = false)}>
			<span
				class="font-sans text-white text-xl cursor-pointer">Researches</span>
			<div class={showDropdown ? 'dropdown-wrapper' : 'hidden'}>
				{#each researches as research}
					<a
						href={research.href}
						rel="prefetch"
						class="font-sans text-white text-xl w-full hover:underline">{research.display}</a>
				{/each}
			</div>
		</div>

		<a
			href="/contact"
			rel="prefetch"
			class="font-sans text-white text-xl hover:underline">Contact</a>
	</div>
{/if}

<div class={showNavBar ? 'pt-12' : ''}>
	<slot />
</div>
