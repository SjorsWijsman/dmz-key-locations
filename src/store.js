import { writable } from "svelte/store";

export const map = writable(null);
export const layers = writable({});
export const waypoint = writable(null);

export const selectedSector = writable(["A", "0"]);
