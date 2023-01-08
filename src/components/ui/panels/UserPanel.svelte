<script>
  import Panel from "./Panel.svelte";
  import { showVideo, customMarkerData, customMarkers } from "$store";

  function setSelectedMarker(marker) {
    $customMarkers
      .filter((customMarker) => customMarker.options.title === marker.id)[0]
      ?.openPopup();
  }

  function removeMarker(marker) {
    $customMarkerData = $customMarkerData.filter(
      (item) => item.id !== marker.id
    );
  }
</script>

<Panel panelTitle={"user"} icon={"./icons/user.svg"} openIconOffset={1}>
  <section>
    <h2>User Preferences</h2>
    <form action="" on:submit|preventDefault>
      <input
        type="checkbox"
        name="showVideo"
        id="showVideo"
        bind:checked={$showVideo}
      />
      <label for="showVideo">
        Display video above key marker (if available)
      </label>
    </form>
  </section>
  <section>
    <h2>Custom Markers</h2>
    <p>Note: Custom Markers are still WIP</p>
    <ul>
      {#each $customMarkerData as marker}
        <li
          on:click|stopPropagation={() => setSelectedMarker(marker)}
          on:keypress={() => setSelectedMarker(marker)}
        >
          <article>
            <h3>{marker.title}</h3>
            <p>
              x:{marker.location?.x}m y:{marker.location?.y}m
            </p>
          </article>
          <button on:click|stopPropagation={() => removeMarker(marker)}>
            <img src="./icons/trash.svg" alt="remove" />
          </button>
        </li>
      {:else}
        <li class="empty">
          <p>
            Add a custom marker by selecting a location on the map and clicking
            on the coordinate bar in the bottom left.
          </p>
        </li>
      {/each}
    </ul>
  </section>
</Panel>

<style>
  section {
    padding: 1rem 0;
  }

  h2 {
    margin: 0.5rem 1rem;
  }

  p {
    margin: 0 1rem;
    margin-bottom: 1rem;
  }

  h3 {
    opacity: 1;
  }

  form {
    display: grid;
    grid-template-columns: 3rem 6fr;
    padding-bottom: 2rem;
    margin: 0 1rem;
    margin-top: 1rem;
  }

  label,
  input {
    cursor: pointer;
    margin: auto 0;
  }

  label {
    opacity: 0.9;
  }

  input {
    height: 1.8rem;
    width: 1.8rem;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  li {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 1rem;
    margin: 0;
    transition: all 0.1s ease-out;
    scroll-margin-top: 4.5rem;
  }

  @media (hover: hover) {
    li:not(.empty):hover {
      background-color: var(--color-black-dark);
      cursor: pointer;
    }

    li:hover button {
      background-color: var(--color-black);
    }
  }

  li.empty {
    padding: 0 1rem;
    opacity: 0.5;
  }

  li.empty p {
    margin: 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--color-black-dark);
    border: none;
    margin-left: 1rem;
    border-radius: 0.3rem;
    transition: all 0.1s ease-out;
    cursor: pointer;
    user-select: none;
    align-self: center;
    width: 3rem;
    height: 3rem;
  }

  @media (hover: hover) {
    button:hover:not(:disabled) {
      background-color: var(--color-danger);
      transform: scale(1.2);
    }
  }

  article > p {
    margin: 0;
    opacity: 0.4;
    font-family: var(--font-mono);
  }

  button img {
    width: 1.6rem;
    height: 1.6rem;
  }
</style>
