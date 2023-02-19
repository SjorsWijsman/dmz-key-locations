<script>
	import { onMount } from "svelte";
	import { layers, customMarkers, customMarkerData } from "$store";
	import Markers from "../Markers.svelte";

	let placeMarkers;

	const title = "Show Custom Markers";

	onMount(() => {
		customMarkerData.subscribe((markers) => {
			$layers = $layers.map((layer) => {
				if (layer.title === title) layer.on = true;
				return layer;
			});

			const markerData = markers.map((marker) => {
				return {
					...marker,
					popupContent: `<p>${marker.title}</p>`,
				};
			});

			$customMarkers = placeMarkers(markerData);
		});
	});
</script>

<Markers bind:placeMarkers {title} markerId={"id"} iconUrl={"/icons/markers/location-user.svg"} />
