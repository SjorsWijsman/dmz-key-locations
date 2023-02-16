<script>
	import "leaflet/dist/leaflet.css";
	import "../../map.css";
	import { fly } from "svelte/transition";
	import Map from "$components/map/Map.svelte";
	import SearchPanel from "$components/ui/panels/SearchPanel.svelte";
	import UserPanel from "$components/ui/panels/UserPanel.svelte";
	import InfoPanel from "$components/ui/panels/InfoPanel.svelte";
	import { mapData, showVideo } from "$store";
	import { maps } from "$data/maps";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	$: setMapData($page.params?.map);

	function setMapData(map) {
		$mapData = maps[map];
		if (!$mapData) goto("/");
	}
</script>

{#if Object.keys(maps).length > 1}
	<header>
		<nav transition:fly={{ y: -40 }}>
			<ul>
				{#each Object.keys(maps) as map}
					<li class:active={map === $page?.params?.map}>
						<a href={map}>{maps[map].title}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>
{/if}
<main class:video-disabled={!$showVideo}>
	<SearchPanel />
	<UserPanel />
	<InfoPanel />
	<Map />
</main>

<style>
	nav {
		position: fixed;
		z-index: 100000;
		left: 50%;
		top: 10px;
		transform: translate(-50%);
		border-radius: 0.5rem;
		background-color: var(--color-black);
		opacity: 0.9;
		overflow: hidden;
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	a {
		display: inline-block;
		padding: 0.5rem 1rem;
		text-decoration: none;
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
</style>
