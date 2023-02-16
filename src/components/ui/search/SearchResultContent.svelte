<script>
	import { fadeSlide } from "$scripts/fade-slide";
	import { favorites, openKeyInfo, keyMarkers, layers } from "$store";
	import { maps } from "$data/maps";
	import Icon from "../Icon.svelte";

	export let id, map, title, location, description, tags;

	let copied = false;

	function openMarkerPopup() {
		$layers = $layers.map((item) => {
			if (item.title === "Show Key Locations") item.on = true;
			return item;
		});
		for (const marker of $keyMarkers) {
			if (marker.options.title === title) {
				// Reopen popup
				marker.closePopup();
				marker.openPopup();
			}
		}
	}

	function toggleFavorite() {
		if ($favorites.includes(title)) {
			$favorites = $favorites.filter((item) => item !== title);
		} else {
			$favorites = [...$favorites, title];
		}
	}

	function copyToClipboard() {
		copied = true;
		const url = window.location.href.split("#")[0];
		navigator.clipboard.writeText(url.concat("#").concat(id));
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

{#if $openKeyInfo === title}
	<section transition:fadeSlide|local={{ duration: 200 }}>
		<div>
			<a href="/{map}" class="tag">
				<Icon src={"icons/markers/location-dot.svg"} size={1.5} />
				{maps[map].title}
			</a>

			{#if tags?.includes("mission")}
				<span class="tag mission">
					<Icon icon={"exclamation-circle"} color={"var(--color-mission)"} size={1.5} />
					Mission Requirement
				</span>
			{/if}

			{#if tags?.includes("fortress")}
				<span class="tag fortress">
					<Icon icon={"fortress"} size={1.5} />
					Fortress
				</span>
			{/if}

			<h3>Description</h3>
			{#if description?.length > 0}
				{#each description as paragraph}
					<p>
						{@html paragraph}
					</p>
				{/each}
			{:else}
				<p>WIP</p>
			{/if}

			<h3>Loot</h3>
			<ol class="loot">
				<li>
					<Icon icon={"question-mark"} />
				</li>
			</ol>
		</div>
		<aside>
			<button on:click|stopPropagation={openMarkerPopup} disabled={!location?.x || !location?.y}>
				{#if location?.x && location?.y}
					{#if $favorites.includes(title)}
						<Icon src={"icons/markers/location-favorite.svg"} size={2.5} />
					{:else if tags?.includes("mission")}
						<Icon src={"icons/markers/location-mission.svg"} size={2.5} />
					{:else}
						<Icon src={"icons/markers/location-dot.svg"} size={2.5} />
					{/if}
				{:else}
					<Icon icon="question-mark" size={2.5} />
				{/if}
			</button>
			{#if $openKeyInfo === title}
				<button
					on:click|stopPropagation={toggleFavorite}
					class="favorite-button"
					disabled={!location}
					transition:fadeSlide|local={{ duration: 200 }}
				>
					<Icon icon="star" size={2.25} />
				</button>
				<button
					on:click|stopPropagation={copyToClipboard}
					class="link-button"
					transition:fadeSlide|local={{ duration: 200 }}
				>
					<Icon icon={copied ? "check" : "link"} size={2.25} />
				</button>
			{/if}
		</aside>
	</section>
{/if}

<style>
	section {
		background-color: var(--color-black-dark);
		padding: 1.5rem 1rem;
		padding-bottom: 3rem;
		display: flex;
	}

	section > div {
		width: 100%;
	}

	aside {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	h3 {
		margin-bottom: 0.2rem;
		margin-top: 1.5rem;
	}

	p {
		margin: 0;
		margin-bottom: 1rem;
		font-weight: 350;
		opacity: 0.85;
	}

	a.tag {
		text-decoration: none;
	}

	a.tag:hover {
		text-decoration: underline;
	}

	.tag {
		display: flex;
		align-items: center;
		/* Offset for icon padding */
		margin-left: -0.225rem;
		position: relative;
	}

	.tag.mission {
		color: var(--color-mission);
	}

	.tag.fortress {
		opacity: 0.75;
	}

	.tag :global(.icon) {
		margin-right: 0.2rem;
	}

	.loot {
		display: flex;
		list-style-type: none;
		padding-left: 0;
	}

	.loot li {
		background-color: var(--color-black);
		padding: 0.2rem;
		margin-right: 0.3rem;
		border-radius: 0.3rem;
		opacity: 0.5;
	}

	/* .loot li.active {
    background-color: var(--color-black-light);
    opacity: 1;
  } */

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: var(--color-black-dark);
		border: none;
		margin-left: 1rem;
		border-radius: 0.3rem;
		transition: all 0.1s ease-out;
		cursor: pointer;
		user-select: none;
		align-self: center;
		width: 3rem;
		height: 3rem;
		margin-top: 1.5rem;
	}

	@media (hover: hover) {
		button:hover:not(:disabled) {
			background-color: var(--color-main);
			transform: scale(1.2);
		}

		button:hover:not(:disabled) > :global(.icon) {
			filter: brightness(1000);
		}
	}

	button:disabled {
		opacity: 0.2;
		cursor: default;
	}

	@media (hover: hover) {
		.favorite-button:hover:not(:disabled) {
			background-color: var(--color-favorite-light);
		}
	}

	:global(li.isOpen) button {
		background-color: var(--color-black);
	}

	:global(li.isFavorite) .favorite-button {
		background-color: var(--color-favorite);
	}
</style>
