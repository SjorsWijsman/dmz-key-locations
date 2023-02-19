<script>
	import { layers, activePanel, keyMarkers } from "$store";
	import { keys } from "$data/keys";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	$: if ($page.params?.id) {
		// id changes
	}

	onMount(() => {
		// Open currently selected key from page params
		const keyTitle = keys.filter((key) => key.id === $page.params?.id)[0]?.title;
		if (keyTitle) {
			$layers = $layers.map((item) => {
				if (item.title === "Show Key Locations") item.on = true;
				return item;
			});
			const waitForKeyMarkers = keyMarkers.subscribe((value) => {
				for (const marker of $keyMarkers) {
					if (marker.options.title === keyTitle) {
						marker.openPopup();
						waitForKeyMarkers();
					}
				}
			});
		} else {
			goto(`/${$page.params?.map}`);
		}
	});
</script>
