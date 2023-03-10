<script>
	import L from "leaflet";
	import { onDestroy, onMount } from "svelte";
	import {
		favorites,
		keyMarkers,
		filter,
		showVideo,
		selectedMarker,
		searchTerm,
		openKeyInfo,
	} from "$store";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import Markers from "../Markers.svelte";

	export let keys = [];

	let unsubShowVideo, unsubFilter;

	let placeMarkers, removeMarkers, iconSettings;

	function placeKeyMarkers() {
		const keyData = keys.filter(filterKey).map((key) => {
			let isFavorite = $favorites.includes(key.id);
			let isMission = key.tags?.includes("mission");

			let iconUrl = "/icons/markers/location-dot.svg";
			if (isFavorite) iconUrl = "/icons/markers/location-favorite.svg";
			if (isMission) iconUrl = "/icons/markers/location-mission.svg";

			const popupContent = setPopupContent(key);

			return {
				...key,
				iconUrl,
				popupContent,
			};
		});

		$keyMarkers = placeMarkers(keyData);
	}

	function filterKey(key) {
		if ($filter === "all") {
			return true;
		} else if ($filter === "favorite" && $favorites.includes(key.id)) {
			return true;
		} else if ($filter === "mission" && key.tags?.includes("mission")) {
			return true;
		} else if ($filter === "fortress" && key.tags?.includes("fortress")) {
			return true;
		}
		return false;
	}

	function setPopupContent(key) {
		let popup = L.popup({
			className: key.video ? "has-video" : "",
		});
		if (key.video && $showVideo) {
			popup.setContent(`
    <iframe src="https://www.youtube.com/embed/${key.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <p>${key.title}</p>
  `);
		} else {
			popup.setContent(`
    <p>${key.title}</p>
  `);
		}
		return popup;
	}

	favorites.subscribe((favoriteList) => favoriteMarker(favoriteList));

	// Replaces map marker with favorite marker / back to original marker
	function favoriteMarker(favoriteList) {
		const missionRequiredMarkers = keys
			.filter((key) => key.tags?.includes("mission"))
			.map((key) => key.id);

		for (const marker of $keyMarkers) {
			// Set icon to favorite
			if (favoriteList.includes(marker.options.title)) {
				marker.setIcon(
					L.icon({
						...iconSettings,
						iconUrl: "/icons/markers/location-favorite.svg",
					})
				);
			} else {
				marker.setIcon(
					L.icon({
						...iconSettings,
						iconUrl: missionRequiredMarkers.includes(marker.options.title)
							? "/icons/markers/location-mission.svg"
							: "/icons/markers/location-dot.svg",
					})
				);
			}
			// Set marker as active again
			if ($selectedMarker.id === marker.options.title) {
				L.DomUtil.addClass(marker._icon, "active-marker");
			}
		}
	}

	function openPopup(key, marker) {
		L.DomUtil.addClass(marker._icon, "active-marker");
		goto(`/${$page.params?.map}/${key.id}`);
		delete key.iconUrl;
		delete key.popupContent;
		$selectedMarker = key;
	}

	function closePopup(key, marker) {
		if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
		goto(`/${$page.params?.map}`);
		$searchTerm = "";
		$selectedMarker = { id: "" };
		$openKeyInfo = "";
	}

	onMount(() => {
		placeKeyMarkers();

		// Prevents first time subscription trigger
		let initialised = false;

		// Rerender key markers on showVideo preference update
		unsubShowVideo = showVideo.subscribe(() => {
			if (initialised) placeKeyMarkers();
		});

		unsubFilter = filter.subscribe(() => {
			if (initialised) placeKeyMarkers();
		});

		initialised = true;
	});

	onDestroy(() => {
		unsubShowVideo();
		unsubFilter();
		removeMarkers();
	});
</script>

<Markers
	bind:placeMarkers
	bind:removeMarkers
	bind:iconSettings
	openPopupFunction={openPopup}
	closePopupFunction={closePopup}
	title={"Show Key Locations"}
	markerId={"id"}
/>
