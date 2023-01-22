<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import {
    favorites,
    keyMarkers,
    filter,
    showVideo,
    selectedMarker,
    openKeyInfo,
    searchTerm,
    activePanel,
  } from "$store";
  import { keys } from "$data/al-mazrah/locations/keys";
  import Markers from "../Markers.svelte";

  let placeMarkers, iconSettings;

  function placeKeyMarkers() {
    const keyData = keys.filter(filterKey).map((key) => {
      let isFavorite = $favorites.includes(key.title);
      let isMission = key.tags?.includes("mission");

      let iconUrl = "icons/markers/location-dot.svg";
      if (isFavorite) iconUrl = "icons/markers/location-favorite.svg";
      if (isMission) iconUrl = "icons/markers/location-mission.svg";

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
    } else if ($filter === "favorite" && $favorites.includes(key.title)) {
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
      .map((key) => key.title);

    for (const marker of $keyMarkers) {
      // Set icon to favorite
      if (favoriteList.includes(marker.options.title)) {
        marker.setIcon(
          L.icon({
            ...iconSettings,
            iconUrl: "icons/markers/location-favorite.svg",
          })
        );
      } else {
        marker.setIcon(
          L.icon({
            ...iconSettings,
            iconUrl: missionRequiredMarkers.includes(marker.options.title)
              ? "icons/markers/location-mission.svg"
              : "icons/markers/location-dot.svg",
          })
        );
      }
      // Set marker as active again
      if ($selectedMarker.title === marker.options.title) {
        L.DomUtil.addClass(marker._icon, "active-marker");
      }
    }
  }

  function openPopup(key, marker) {
    L.DomUtil.addClass(marker._icon, "active-marker");
    window.location.hash = key.id;
    delete key.iconUrl;
    delete key.popupContent;
    $selectedMarker = key;
  }

  function closePopup(key, marker) {
    if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
    window.location.hash = "";
    $searchTerm = "";
    $selectedMarker = { title: "" };
    $openKeyInfo = "";
  }

  onMount(() => {
    placeKeyMarkers();

    // Opens the marker if window location has a hash
    if (window.location.hash) {
      $activePanel = "search";
      const title = keys.filter(
        (key) => key.id === window.location.hash.replace("#", "")
      )[0].title;
      for (const marker of $keyMarkers) {
        if (marker.options.title === title) {
          setTimeout(() => {
            marker.openPopup();
          }, 500);
        }
      }
    }

    // Prevents first time subscription trigger
    let initialised = false;

    // Rerender key markers on showVideo preference update
    showVideo.subscribe(() => {
      if (initialised) placeKeyMarkers();
    });

    filter.subscribe(() => {
      if (initialised) placeKeyMarkers();
    });

    initialised = true;
  });
</script>

<Markers
  bind:placeMarkers
  bind:iconSettings
  openPopupFunction={openPopup}
  closePopupFunction={closePopup}
  title={"Show Key Locations"}
/>
