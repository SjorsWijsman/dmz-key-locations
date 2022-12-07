import { writable } from "svelte/store";
import { persistStore } from "./scripts/persist-store";
import { keys } from "./data/key-data";

// Leaflet map, for global reference
export const map = writable(null);
// Map layers (bottom right)
export const layers = writable({});

// Waypoint when user clicks a location that is not a marker
export const waypoint = writable(null);
// List of all key location markers
export const keyMarkers = writable([]);
// Sector user is currently hovering over
export const selectedSector = writable(["A", "0"]);
// Marker user currently has selected
export const selectedMarker = writable(
  window.location.hash ? getHashKey() : { title: "" }
);
// Expanded key info block
export const openKeyInfo = writable(
  window.location.hash ? getHashKey().title : ""
);

// Persists in localStorage
export const activePanel = persistStore("dmzkeys-user-activePanel", "search");
export const searchTerm = persistStore("dmzkeys-user-searchTerm", "");
export const favorites = persistStore("dmzkeys-user-favorites", []);
export const customMarkers = persistStore("dmzkeys-custom-markers", []);
export const showVideo = persistStore("dmzkeys-user-showVideo", false);

function getHashKey() {
  return keys.filter(
    (key) => key.id === window.location.hash.replace("#", "")
  )[0];
}
