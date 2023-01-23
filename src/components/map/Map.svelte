<script>
	import L from "leaflet";
	import { onMount } from "svelte";
	import CustomMarkers from "$components/map/layers/CustomMarkers.svelte";
	import KeyMarkers from "$components/map/layers/KeyMarkers.svelte";
	import DeaddropMarkers from "$components/map/layers/DeaddropMarkers.svelte";
	import SpawnMarkers from "$components/map/layers/SpawnMarkers.svelte";
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
			[7150, 7150],
		]);
		$map.setZoom(-1);
	});
</script>

{#if $map}
	<CustomMarkers />
	<KeyMarkers />
	<DeaddropMarkers />
	<SpawnMarkers />

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
