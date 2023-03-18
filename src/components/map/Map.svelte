<script>
	import L from "leaflet";
	import { onMount } from "svelte";
	import CustomMarkers from "$components/map/layers/CustomMarkers.svelte";
	import KeyMarkers from "$components/map/layers/KeyMarkers.svelte";
	import MiscMarkers from "$components/map/layers/MiscMarkers.svelte";
	import POILabels from "$components/map/layers/POILabels.svelte";
	import Grid from "$components/map/layers/Grid.svelte";
	import WaypointMarker from "$components/map/WaypointMarker.svelte";
	import MousePos from "$components/ui/widgets/MousePos.svelte";
	import WaypointPos from "$components/ui/widgets/WaypointPos.svelte";
	import LayerControl from "$components/ui/widgets/LayerControl.svelte";
	import ZoomControl from "$components/ui/widgets/ZoomControl.svelte";
	import { map, mapData, layers } from "$store";
	import { isTouchDevice } from "$scripts/platform-check";
	import { page } from "$app/stores";

	let mapContainer;

	export let keys;

	function setupMap() {
		if (!Object.keys($mapData).length || !mapContainer) return;

		// Clear map
		$map?.remove();
		$layers.map((item) => {
			delete item.layer;
			return item;
		});

		$map = L.map(mapContainer, {
			crs: L.CRS.Simple,
			maxZoom: 5,
			minZoom: -4,
			zoomControl: false,
		});

		const bounds = [
			[0, 0],
			[$mapData.height, $mapData.width],
		];

		const image = L.imageOverlay($mapData.image, bounds);
		image.addTo($map);

		$map.fitBounds(bounds);
		$map.setMaxBounds([
			[-$mapData.height * 0.5, -$mapData.width * 0.5],
			[$mapData.height * 1.5, $mapData.width * 1.5],
		]);
		$map.setZoom($mapData.options?.defaultZoom ?? -1);
	}

	mapData.subscribe(() => setupMap());
	onMount(() => setupMap());
</script>

{#key $mapData}
	{#if $map && Object.keys($mapData).length}
		<CustomMarkers />
		{#key keys}
			<KeyMarkers keys={keys.filter((key) => key.map === $page.params?.map)} />
		{/key}
		{#each $mapData?.locations?.misc ?? [] as misc}
			<MiscMarkers {...misc} />
		{/each}

		<POILabels pois={$mapData.options.pois} />
		<Grid grid={$mapData.options.grid} />

		<WaypointMarker />

		{#if !isTouchDevice()}
			<MousePos />
		{/if}
		<WaypointPos />
		<ZoomControl />
	{/if}
{/key}
<LayerControl />
<section bind:this={mapContainer} />

<style>
	section {
		height: 100vh;
		background-color: transparent;
	}

	section :global(*) {
		color: var(--color-black-dark);
	}

	section :global(.leaflet-control-attribution) {
		display: none;
	}
</style>
