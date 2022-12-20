<script>
  import { activePanel, selectedMarker } from "$store";
  import { iOS } from "$scripts/platform-check";

  export let panelTitle;
  export let closed = false;

  let highlight = false;

  function openCloseSearchPanel() {
    if ($activePanel === panelTitle) {
      $activePanel = null;
    } else {
      $activePanel = panelTitle;
    }
  }

  selectedMarker.subscribe((marker) => {
    if (panelTitle === "search") {
      marker?.title && $activePanel === null
        ? (highlight = true)
        : (highlight = false);
    }
  });
</script>

<button
  on:click={openCloseSearchPanel}
  class:closed
  class:highlight
  class:scrollbar={!iOS()}
>
  <slot />
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    position: relative;
    height: 3rem;
    width: 3rem;
    margin-top: 0.75rem;
    background-color: var(--color-black);
    border: none;
    cursor: pointer;
    padding: 0.6rem;
    border-radius: 0 0.5rem 0.5rem 0;
    transition: all 0.2s ease-out;
    pointer-events: all;
  }

  button.closed.highlight {
    background-color: var(--color-main);
  }

  button.closed {
    justify-content: flex-end;
    width: 3.75rem;
  }

  @media (hover: hover) {
    button.closed:hover,
    button.closed:focus {
      width: 4.5rem;
    }
  }

  @media (hover: hover) {
    button:hover,
    button:focus {
      background-color: var(--color-black-light);
    }
  }

  button :global(img) {
    max-width: 100%;
    max-height: 100%;
    width: 2rem;
  }

  @media only screen and (max-width: 30rem) {
    button:not(.closed) {
      position: absolute;
      right: 1rem;
      border-radius: 0.5rem;
      background-color: var(--color-black-light);
    }

    button:not(.closed).scrollbar {
      right: 2rem;
    }

    @media (hover: hover) {
      button:hover:not(.closed) {
        background-color: var(--color-black-dark);
      }
    }
  }
</style>
