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
	import mapImage from "$assets/map.jpg";
	import { map } from "$store";
	import { isTouchDevice } from "$scripts/platform-check";

	let mapContainer;

	onMount(() => {
		const bounds = [
			[0, 0],
			[4150, 4150],
		];
		const image = L.imageOverlay(mapImage, bounds);

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

	<POILabels />
	<Grid />

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
