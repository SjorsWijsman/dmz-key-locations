<script>
	import { selectedMarker, openKeyInfo, favorites } from "$store";
	import SearchResultContent from "./SearchResultContent.svelte";
	import Icon from "../Icon.svelte";

	export let id,
		map = "al-mazrah",
		title = "Untitled Location",
		keyName = "",
		location = {},
		description = [],
		loot = null,
		video = "",
		tags = [],
		locales = {};

	// Prevent unused variable warning.
	$: loot, video, locales;

	let icon = "key";
	$: icon = $favorites.includes(id)
		? "star"
		: !location?.x || !location?.y
		? "question-mark"
		: "key";

	function toggleDetails() {
		if ($openKeyInfo === id) {
			$openKeyInfo = "";
		} else {
			$openKeyInfo = id;
		}
	}

	selectedMarker.subscribe((selection) => {
		if (selection?.id === id) {
			$openKeyInfo = id;
		}
	});
</script>

<li class:isOpen={$openKeyInfo === id} class:isFavorite={$favorites.includes(id)}>
	<div on:click={toggleDetails} on:keypress={toggleDetails}>
		<span>
			<h2>
				{title}
			</h2>
			{#if keyName}
				<h3>
					<Icon
						{icon}
						color={$favorites.includes(id) ? "var(--color-favorite-light)" : "white"}
						size={1.5}
					/>
					{keyName}
				</h3>
			{/if}
		</span>
		<Icon icon="chevron-down" size={1.5} />
	</div>
	<SearchResultContent {...{ id, map, location, description, tags }} />
</li>

<style>
	li {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		transition: all 0.1s ease-out;
		scroll-margin-top: 4.5rem;
		box-shadow: inset 0 0 0 0 rgba(0, 0, 10, 0);
		opacity: 0.9;
	}

	li.isOpen {
		background-color: var(--color-black-light);
		box-shadow: inset 0 -1rem 1.5rem -1rem rgba(0, 0, 10, 0.6);
		opacity: 1;
	}

	@media (hover: hover) {
		li:hover {
			background-color: var(--color-black-light);
			opacity: 1;
		}
	}

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		height: 100%;
		width: 100%;
		padding: 1rem;
		min-height: 4rem;
	}

	span {
		margin-right: 1rem;
	}

	h2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1rem;
		transition: all 0.05s ease-out;
		font-weight: 500;
		margin: 0;
	}

	h3 {
		display: flex;
		align-items: center;
		margin-left: -0.225rem;
		transition: color 0.3s ease-out;
		font-size: 0.9rem;
	}

	h3 > :global(.icon) {
		margin-right: 0.2rem;
	}

	li.isFavorite span > h3 {
		opacity: 1;
		color: var(--color-favorite-light);
	}

	div > :global(.icon) {
		opacity: 0.5;
		transition: transform 200ms ease-out;
	}

	li.isOpen div > :global(.icon) {
		opacity: 1;
		transform: rotate(-180deg);
	}

	li.isOpen div > :global(.icon) {
		opacity: 1;
	}
</style>
