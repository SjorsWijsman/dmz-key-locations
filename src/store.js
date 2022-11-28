import { writable } from "svelte/store";
import { persistStore } from "./scripts/persist-store";

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
export const selectedMarker = writable({ title: "" });
// Expanded key info block
export const openKeyInfo = writable("");

// Persists in localStorage
export const activePanel = persistStore("dmzkeys-user-activePanel", "search");
export const searchTerm = persistStore("dmzkeys-user-searchTerm", "");
export const favorites = persistStore("dmzkeys-user-favorites", []);
