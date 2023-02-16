<script>
	import L from "leaflet";
	import { map, mapData, layers } from "$store";

	export let openPopupFunction = (markerLocation, marker) => {
		return this;
	};
	export let closePopupFunction = (markerLocation, marker) => {
		return this;
	};

	export let title;
	export let iconUrl = "icons/markers/location-dot.svg";
	export let markerId = "title";

	let layer = L.layerGroup();

	export const iconSettings = {
		iconUrl,
		shadowUrl: "icons/markers/location-black-background.svg",
		iconSize: [20, 20], // size of the icon
		shadowSize: [20, 20],
		iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
		shadowAnchor: [10, 20],
		popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
	};

	export function placeMarkers(markerLocations) {
		let markers = [];

		layer.clearLayers();

		// Add markers to layer
		markerLocations.forEach((markerLocation) => {
			if (markerLocation.location) {
				// If the marker contains an iconUrl: overwrite the iconUrl, else use the global iconUrl
				markerLocation.iconUrl
					? (iconSettings.iconUrl = markerLocation.iconUrl)
					: (iconSettings.iconUrl = iconUrl);

				const icon = L.icon(iconSettings);

				let marker = L.marker(
					[$mapData.height - markerLocation.location?.y, markerLocation.location?.x],
					{
						title: markerLocation[markerId],
						icon,
					}
				)
					.bindPopup(markerLocation.popupContent ?? `<p>${markerLocation.title}</p>`)
					.on("popupopen", () => openPopup(markerLocation, marker))
					.on("popupclose", () => closePopup(markerLocation, marker));

				markers = [...markers, marker];

				marker.addTo(layer);
			}
		});

		// Add to layers store if it has not been added yet
		if (!$layers.map((item) => item.title).includes(title)) {
			$layers = [...$layers, { title, layer }];
		}

		return markers;
	}

	function openPopup(markerLocation, marker) {
		L.DomUtil.addClass(marker._icon, "active-marker");
		// Go to location
		$map.setView([marker.getLatLng()?.lat, marker.getLatLng()?.lng], Math.max(0, $map.getZoom()), {
			animate: true,
			pan: {
				duration: 0.3,
			},
		});
		openPopupFunction(markerLocation, marker);
	}

	function closePopup(markerLocation, marker) {
		if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
		closePopupFunction(markerLocation, marker);
	}
</script>
