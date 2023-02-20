<script>
	import { onMount, onDestroy } from "svelte";
	import { layers, customMarkers, customMarkerData } from "$store";
	import { page } from "$app/stores";
	import Markers from "../Markers.svelte";

	let placeMarkers;
	let unsubMarkerData;

	const title = "Show Custom Markers";

	onMount(() => {
		unsubMarkerData = customMarkerData.subscribe((markers) => {
			$layers = $layers.map((layer) => {
				if (layer.title === title) layer.on = true;
				return layer;
			});

			const markerData = markers
				.filter((marker) => {
					if (marker.map === $page.params?.map) return true;
					if (marker.map === undefined && $page.params?.map === "al-mazrah") return true;
					return false;
				})
				.map((marker) => {
					return {
						...marker,
						popupContent: `<p>${marker.title}</p>`,
					};
				});

			$customMarkers = placeMarkers(markerData);
		});
	});

	onDestroy(() => unsubMarkerData());
</script>

<Markers bind:placeMarkers {title} markerId={"id"} iconUrl={"/icons/markers/location-user.svg"} />
