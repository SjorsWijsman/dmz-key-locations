<script>
	import L from "leaflet";
	import { onMount } from "svelte";
	import { map, mapData, layers } from "$store";

	export let pois = [];

	const title = "Show POI Labels";

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
					.setLatLng([$mapData.height - poi.location.y, poi.location.x])
					.setContent(poi.title)
			);
		});

		// Add markers to layerGroup
		poiLayer = L.layerGroup(markers);

		// Add to layers store if it has not been added yet
		if ($layers.map((item) => item.title).includes(title)) {
			$layers = $layers.map((item) => {
				if (item.title === title) return { ...item, layer: poiLayer };
				return item;
			});
		} else {
			$layers = [...$layers, { title, layer: poiLayer }];
		}
	}

	onMount(placePOILabels);
</script>
