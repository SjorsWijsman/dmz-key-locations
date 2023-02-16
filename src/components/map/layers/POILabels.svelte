<script>
	import L from "leaflet";
	import { onMount } from "svelte";
	import { map, layers } from "$store";

	export let pois = [];

	function placePOILabels() {
		let poiLayer = [];

		// Place markers
		const markers = [];
		const labelSettings = {
			direction: "center",
			permanent: true,
			className: "map-label",
			pane: "locations",
		};

		$map.createPane("locations");
		$map.getPane("locations").style.zIndex = 650;
		$map.getPane("locations").style.pointerEvents = "none";

		pois.forEach((poi) => {
			markers.push(
				L.tooltip(labelSettings)
					.setLatLng([4150 - poi.location.y, poi.location.x])
					.setContent(poi.title)
			);
		});

		// Add markers to layerGroup
		poiLayer = L.layerGroup(markers);

		// Add to layers store if it has not been added yet
		if (!$layers.map((item) => item.title).includes("Show POI Labels")) {
			$layers = [...$layers, { title: "Show POI Labels", layer: poiLayer }];
		}
	}

	onMount(placePOILabels);
</script>
