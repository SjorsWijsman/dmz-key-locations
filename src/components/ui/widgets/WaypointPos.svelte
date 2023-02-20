<script>
	import L from "leaflet";
	import { map, mapData, waypoint, customMarkerData, customMarkers } from "$store";
	import { page } from "$app/stores";

	const WaypointCoordinates = L.Control.extend({
		onAdd: ($map) => {
			const container = L.DomUtil.create("div");

			waypoint.subscribe((value) => {
				if (value) {
					let sector = $waypoint?.sector;
					let lat = $waypoint?.lat;
					let lng = $waypoint?.lng;
					const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
					const y = $mapData.height - Math.round(clamp(lat, 0, $mapData.height));
					const x = Math.round(clamp(lng, 0, $mapData.width));

					container.onclick = (e) => {
						saveCustomMarker(e, { lat, lng });
					};

					container.innerHTML = `
						<span class="mouse-position waypoint-position">
							<img src="/icons/crosshairs.svg"></img>
							<span>
								${sector?.join("")}
							</span>
							x: <span>${x}m</span>
							y: <span>${y}m</span>
							<img src="/icons/flag.svg"></img>
						</span>
					`;
				} else {
					container.innerHTML = "";
				}
			});

			return container;
		},
	});

	function saveCustomMarker(e, coordinates) {
		e.stopPropagation();
		const marker = {
			id: self.crypto.randomUUID(),
			location: {
				x: coordinates.lng,
				y: $mapData.height - coordinates.lat,
			},
			title: "Custom Marker",
			map: $page.params?.map,
		};

		const sameLocation = $customMarkers.filter((item) => {
			const { lat, lng } = item.getLatLng();
			return lng === coordinates.lng && lat === coordinates.lat;
		})[0];

		sameLocation ? sameLocation.openPopup() : ($customMarkerData = [...$customMarkerData, marker]);
	}

	$map.addControl(new WaypointCoordinates({ position: "bottomleft" }));
</script>
