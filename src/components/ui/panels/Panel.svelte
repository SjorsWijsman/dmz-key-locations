<script>
  import { fly } from "svelte/transition";
  import { activePanel } from "$store";
  import OpenClosePanel from "./OpenClosePanel.svelte";

  export let panelTitle = "";
  export let openIcon = "./icons/heart.svg";
  export let closeIcon = "./icons/xmark.svg";
  export let closeIconOffset = 0;
</script>

{#if $activePanel === panelTitle}
  <div transition:fly={{ x: -200 }}>
    <section>
      <slot />
    </section>

    <OpenClosePanel {panelTitle}>
      <img src={closeIcon} alt="Close {panelTitle} panel" />
    </OpenClosePanel>
  </div>
{:else if $activePanel === null}
  <div
    transition:fly={{ x: -50, delay: 1 }}
    style:top={`${closeIconOffset}rem`}
  >
    <OpenClosePanel {panelTitle} closed={true}>
      <img src={openIcon} alt="Open {panelTitle} panel" />
    </OpenClosePanel>
  </div>
{/if}

<style>
  div {
    position: fixed;
    display: flex;
    z-index: 10000;
    margin: 10px;
    margin-left: 0;
    pointer-events: none;
  }

  section {
    display: flex;
    flex-direction: column;
    background-color: var(--color-black);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    margin-left: 10px;
    opacity: 0.9;
    resize: vertical;
    width: 23rem;
    min-height: 10rem;
    max-height: 50vh;
    height: 30rem;
    overflow-y: scroll;
    pointer-events: all;
    padding-bottom: 5rem;
  }

  @media only screen and (max-width: 30rem) {
    section,
    div {
      width: calc(100% - 10px);
    }
  }
</style>
