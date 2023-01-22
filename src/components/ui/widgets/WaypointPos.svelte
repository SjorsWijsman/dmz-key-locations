<script>
	import L from "leaflet";
	import { map, waypoint, customMarkerData, customMarkers } from "$store";

	const WaypointCoordinates = L.Control.extend({
		onAdd: ($map) => {
			const container = L.DomUtil.create("div");

			waypoint.subscribe((value) => {
				if (value) {
					let sector = $waypoint?.sector;
					let lat = $waypoint?.lat;
					let lng = $waypoint?.lng;
					const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
					const y = 4150 - Math.round(clamp(lat, 0, 4150));
					const x = Math.round(clamp(lng, 0, 4150));

					const span = L.DomUtil.create("span", "mouse-position");
					span.classList.add("waypoint-position");

					const locationIcon = L.DomUtil.create("img");
					locationIcon.setAttribute("src", "./icons/crosshairs.svg");

					const sectorSpan = L.DomUtil.create("span");
					sectorSpan.innerHTML = `${sector?.join("")}`;

					const xSpan = L.DomUtil.create("span");
					xSpan.innerHTML = `x:${x}m`;
					const ySpan = L.DomUtil.create("span");
					ySpan.innerHTML = `y:${y}m`;

					const customMarker = L.DomUtil.create("input");
					customMarker.setAttribute("type", "image");
					customMarker.setAttribute("src", "./icons/flag.svg");

					span.appendChild(locationIcon);
					span.appendChild(sectorSpan);
					span.appendChild(xSpan);
					span.appendChild(ySpan);
					span.appendChild(customMarker);

					container.onclick = (e) => {
						saveCustomMarker(e, { lat, lng });
					};

					container.appendChild(span);
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
				y: 4150 - coordinates.lat,
			},
			title: "Custom Marker",
		};

		const sameLocation = $customMarkers.filter((item) => {
			const { lat, lng } = item.getLatLng();
			return lng === coordinates.lng && lat === coordinates.lat;
		})[0];

		sameLocation ? sameLocation.openPopup() : ($customMarkerData = [...$customMarkerData, marker]);
	}

	$map.addControl(new WaypointCoordinates({ position: "bottomleft" }));
</script>
