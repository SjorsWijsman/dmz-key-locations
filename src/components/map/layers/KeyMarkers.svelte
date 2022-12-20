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
  } from "$store";
  import { keys } from "$data/key-data";
  import { isTouchDevice } from "$scripts/platform-check";

  const title = "Show Key Locations";

  let keyLayer = L.layerGroup();

  const iconSettings = {
    iconUrl: "icons/location-dot.svg",
    shadowUrl: "icons/location-black-background.svg",
    iconSize: [20, 20], // size of the icon
    shadowSize: [20, 20],
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 20],
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  };

  function placeKeyMarkers(reload = false) {
    // Empty key markers first -> Allows for reloading key markers
    $keyMarkers = [];

    keyLayer.clearLayers();

    // Create new markers
    keys.forEach((key) => {
      // Return early if it does not have a location or does not pass the current filter
      if (!key.location || !filterKey(key)) return;

      let isFavorite = $favorites.includes(key.title);
      iconSettings.iconUrl = "icons/location-dot.svg";

      if (key.tags?.includes("mission"))
        iconSettings.iconUrl = "icons/location-mission.svg";

      if (isFavorite) iconSettings.iconUrl = "icons/location-favorite.svg";

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

      marker.addTo(keyLayer);
    });

    // Add to layers store if it has not been added yet
    if (!$layers.map((item) => item.title).includes(title)) {
      $layers = [...$layers, { title, layer: keyLayer }];
    }

    if (reload) {
      $layers = $layers.map((layer) => {
        if (layer.title === title) {
          layer.on = true;
        }
        return layer;
      });
    }
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
      // Set icon to favorite
      if (favoriteList.includes(marker.options.title)) {
        marker.setIcon(
          L.icon({
            ...iconSettings,
            iconUrl: "icons/location-favorite.svg",
          })
        );
      } else {
        marker.setIcon(
          L.icon({
            ...iconSettings,
            iconUrl: missionRequiredMarkers.includes(marker.options.title)
              ? "icons/location-mission.svg"
              : "icons/location-dot.svg",
          })
        );
      }
      // Set marker as active again
      if ($selectedMarker.title === marker.options.title) {
        L.DomUtil.addClass(marker._icon, "active-marker");
      }
    }
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
      if (initialised) placeKeyMarkers(true);
    });

    filter.subscribe(() => {
      if (initialised) placeKeyMarkers(true);
    });

    initialised = true;
  });
</script>
