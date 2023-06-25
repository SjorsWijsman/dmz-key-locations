<script>
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { activePanel } from "$store";
	import { mobileSize } from "$scripts/media-queries";
	import { maps } from "$data/maps";
	import Icon from "./Icon.svelte";

	let innerWidth;
	let minimalize = false;
	let openMapToggle = false;

	function showMapToggle(panelIsOpen, innerWidth) {
		if (panelIsOpen && mobileSize(innerWidth)) {
			return false;
		}
		return true;
	}

	$: innerWidth > 800 ? (minimalize = false) : (minimalize = true);
</script>

<svelte:window bind:innerWidth />

{#if showMapToggle($activePanel, innerWidth)}
	{#if minimalize}
		<nav class="vertical" transition:fly={{ y: -40 }}>
			<button on:click={() => (openMapToggle = !openMapToggle)} class:isOpen={openMapToggle}>
				{maps[$page?.params?.map].title}
				<Icon icon={"chevron-down"} size={1.5} />
			</button>
			{#if openMapToggle}
				<ul>
					<li class="active" />
					{#each Object.keys(maps) as map}
						<li class:active={map === $page?.params?.map}>
							<a href="../{map}">{maps[map]?.title}</a>
						</li>
					{/each}
				</ul>
			{/if}
		</nav>
	{:else}
		<nav transition:fly={{ y: -40 }}>
			<ul>
				<li class="active" />
				{#each Object.keys(maps) as map}
					<li class:active={map === $page?.params?.map}>
						<a href="../{map}">{maps[map]?.title}</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
{/if}

<style>
	nav {
		position: fixed;
		z-index: 100000;
		left: 50%;
		top: 10px;
		transform: translate(-50%);
		border-radius: 0.5rem;
		background-color: var(--color-black);
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
		opacity: 0.9;
		overflow: hidden;
		pointer-events: all;
		min-width: 11rem;
		display: flex;
		justify-content: center;
	}

	nav.vertical,
	nav.vertical ul {
		flex-direction: column;
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		text-align: center;
		width: 100%;
	}

	a,
	button {
		border: solid 0px transparent;
		display: inline-block;
		padding: 0.5rem 1rem;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.25rem;
		cursor: pointer;
		background-color: transparent;
	}

	li a {
		opacity: 0.75;
	}

	li.active a {
		opacity: 1;
		font-weight: bold;
		cursor: default;
		pointer-events: none;
		background-color: var(--color-black-light);
	}

	button > :global(.icon) {
		transition: transform 200ms ease-out;
	}

	button.isOpen > :global(.icon) {
		transform: rotate(-180deg);
	}
</style>
