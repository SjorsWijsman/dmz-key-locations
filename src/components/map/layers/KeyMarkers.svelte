<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import {
    layers,
    map,
    keyMarkers,
    selectedMarker,
    searchTerm,
    favorites,
    openKeyInfo,
    showVideo,
    filter,
    activeLayers,
  } from "$store";
  import { keys } from "$data/key-data";
  import { isTouchDevice } from "$scripts/platform-check";

  let keyLayer = L.layerGroup();

  const iconSettings = {
    iconUrl: "icons/location-dot.svg",
    iconSize: [20, 20], // size of the icon
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  };

  function placeKeyMarkers() {
    // Empty key markers first -> Allows for reloading key markers
    $keyMarkers = [];
    $map.removeLayer(keyLayer);

    // Create new markers
    keys.forEach((key) => {
      if (!key.location || !filterKey(key)) return;

      let isFavorite = $favorites.includes(key.title);
      iconSettings.iconUrl = "icons/location-dot.svg";

      if (key.tags?.includes("mission"))
        iconSettings.iconUrl = "icons/location-dot-mission.svg";

      if (isFavorite) iconSettings.iconUrl = "icons/location-dot-favorite.svg";

      const icon = L.icon(iconSettings);

      let marker = L.marker([4150 - key.location.y, key.location.x], {
        title: key.title,
        icon,
      })
        .bindPopup(setPopupContent(key))
        .on("click", () => setSelectedMarker(key, marker))
        .on("popupopen", () => openPopup(key, marker))
        .on("popupclose", () => closePopup(key, marker));

      $keyMarkers = [...$keyMarkers, marker];
    });

    // Add markers to layerGroup
    keyLayer = L.layerGroup($keyMarkers);

    // Add layer to map
    $map.addLayer(keyLayer);

    // Add to layers store
    $layers = { ...$layers, "Show Key Locations": keyLayer };
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

  function openPopup(key, marker) {
    L.DomUtil.addClass(marker._icon, "active-marker");
    window.location.hash = key.id;
    $selectedMarker = key;
    // Go to location
    $map.setView(
      [4150 - key.location.y + (isTouchDevice() ? 100 : 0), key.location.x],
      0,
      {
        animate: true,
        pan: {
          duration: 0.3,
        },
      }
    );
  }

  function closePopup(key, marker) {
    if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
    window.location.hash = "";
    $selectedMarker = { title: "" };
    $openKeyInfo = "";
  }

  function setSelectedMarker(key, marker) {
    if (L.DomUtil.hasClass(marker._icon, "active-marker")) {
      $searchTerm = "";
    }
  }

  favorites.subscribe((favoriteList) => favoriteMarker(favoriteList));

  // Replaces map marker with favorite marker / back to original marker
  function favoriteMarker(favoriteList) {
    const missionRequiredMarkers = keys
      .filter((key) => key.tags?.includes("mission"))
      .map((key) => key.title);
    for (const marker of $keyMarkers) {
      if (favoriteList.includes(marker.options.title)) {
        marker.setIcon(
          L.icon({
            ...iconSettings,
            iconUrl: "icons/location-dot-favorite.svg",
          })
        );
      } else {
        marker.setIcon(
          L.icon({
            ...iconSettings,
            iconUrl: missionRequiredMarkers.includes(marker.options.title)
              ? "icons/location-dot-mission.svg"
              : "icons/location-dot.svg",
          })
        );
      }
      if ($selectedMarker.title === marker.options.title) {
        L.DomUtil.addClass(marker._icon, "active-marker");
      }
    }
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

  onMount(() => {
    placeKeyMarkers();

    // Opens the marker if window location has a hash
    if (window.location.hash) {
      const title = keys.filter(
        (key) => key.id === window.location.hash.replace("#", "")
      )[0].title;
      for (const marker of $keyMarkers) {
        if (marker.options.title === title) {
          marker.openPopup();
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
