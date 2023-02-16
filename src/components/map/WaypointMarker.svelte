<script>
	import L from "leaflet";
	import { map, selectedSector, waypoint } from "$store";

	let waypointMarker;

	export let yMax, xMax;

	$map.on("click", setWaypointMarker);

	function setWaypointMarker(e) {
		const icon = L.icon({
			iconUrl: "./icons/crosshairs.svg",

			iconSize: [16, 16], // size of the icon
			iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
		});

		if (waypointMarker) {
			waypointMarker.remove($map);
			$waypoint = null;
		}

		let { lat, lng } = e.latlng;

		if (lat >= 0 && lng >= 0 && lat <= yMax && lng <= xMax) {
			const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
			lat = Math.round(clamp(lat, 0, yMax));
			lng = Math.round(clamp(lng, 0, xMax));

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
