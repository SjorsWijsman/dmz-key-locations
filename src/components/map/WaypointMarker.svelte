<script>
	import L from "leaflet";
	import { map, mapData, selectedSector, waypoint } from "$store";

	let waypointMarker;

	$map.on("click", setWaypointMarker);

	function setWaypointMarker(e) {
		const icon = L.icon({
			iconUrl: "/icons/crosshairs.svg",

			iconSize: [16, 16], // size of the icon
			iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
		});

		if (waypointMarker) {
			waypointMarker.remove($map);
			$waypoint = null;
		}

		let { lat, lng } = e.latlng;

		if (lat >= 0 && lng >= 0 && lat <= $mapData.height && lng <= $mapData.width) {
			const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
			lat = Math.round(clamp(lat, 0, $mapData.height));
			lng = Math.round(clamp(lng, 0, $mapData.width));

			waypointMarker = L.marker({ lat, lng }, { icon });
			waypointMarker.addTo($map).on("click", () => {
				waypointMarker.remove($map);
				$waypoint = null;
			});

			$waypoint = {
				lat,
				lng,
				sector: $selectedSector,
			};
		}
	}
</script>
