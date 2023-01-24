<script>
	import L from "leaflet";
	import { onMount } from "svelte";
	import CustomMarkers from "$components/map/layers/CustomMarkers.svelte";
	import KeyMarkers from "$components/map/layers/KeyMarkers.svelte";
	import MiscMarkers from "$components/map/layers/MiscMarkers.svelte";
	import POILabels from "$components/map/layers/POILabels.svelte";
	import Grid from "$components/map/layers/Grid.svelte";
	import LocationMarker from "$components/map/LocationMarker.svelte";
	import MousePos from "$components/ui/widgets/MousePos.svelte";
	import WaypointPos from "$components/ui/widgets/WaypointPos.svelte";
	import LayerControl from "$components/ui/widgets/LayerControl.svelte";
	import ZoomControl from "$components/ui/widgets/ZoomControl.svelte";
	import { map } from "$store";
	import { isTouchDevice } from "$scripts/platform-check";

	export let mapData;

	let mapContainer;

	onMount(() => {
		const bounds = [
			[0, 0],
			[mapData.height, mapData.width],
		];
		const image = L.imageOverlay(mapData.image, bounds);

		$map = L.map(mapContainer, {
			crs: L.CRS.Simple,
			maxZoom: 5,
			minZoom: -4,
			zoomControl: false,
		});

		image.addTo($map);

		$map.fitBounds(bounds);
		$map.setMaxBounds([
			[-3000, -3000],
			[mapData.height + 3000, mapData.width + 3000],
		]);
		$map.setZoom(-1);
	});
</script>

{#if $map}
	<CustomMarkers />

	{#if mapData?.locations?.keys}
		<KeyMarkers keys={mapData.locations.keys} />
	{/if}

	{#each mapData?.locations?.misc as misc}
		<MiscMarkers {...misc} />
	{/each}

	{#if mapData?.options?.pois}
		<POILabels pois={mapData.options.pois} />
	{/if}
	{#if mapData?.options?.grid}
		<Grid mapHeight={mapData.height} mapWidth={mapData.width} grid={mapData.options.grid} />
	{/if}

	<LocationMarker />

	{#if !isTouchDevice()}
		<MousePos />
	{/if}
	<WaypointPos />
	<ZoomControl />
	<LayerControl />
{/if}
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
