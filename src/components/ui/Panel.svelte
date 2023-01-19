<script>
  import { fly } from "svelte/transition";
  import { activePanel, panelHeight } from "$store";
  import { mobileSize } from "$scripts/media-queries";
  import OpenClosePanel from "./OpenClosePanel.svelte";
  import Icon from "./Icon.svelte";

  export let panelTitle = "";
  export let icon = "heart";
  export let openIconOffset = 0;

  let outerWidth;
</script>

<svelte:window bind:outerWidth />

{#if $activePanel === panelTitle}
  <div transition:fly={{ x: -200 }}>
    <section
      bind:clientHeight={$panelHeight}
      style:height={`${$panelHeight}px`}
      class:hasFooter={$$slots.footer}
    >
      {#if $$slots.header || mobileSize(outerWidth)}
        <header class:isEmpty={!$$slots.header}>
          <slot name="header" />
          {#if mobileSize(outerWidth)}
            <OpenClosePanel {panelTitle}>
              <Icon icon={"xmark"} size={2.5} />
            </OpenClosePanel>
          {/if}
        </header>
      {/if}

      <article>
        <slot />
      </article>

      {#if $$slots.footer}
        <footer>
          <slot name="footer" />
        </footer>
      {/if}
    </section>
    {#if !mobileSize(outerWidth)}
      <OpenClosePanel {panelTitle}>
        <Icon icon={"xmark"} size={2.5} />
      </OpenClosePanel>
    {/if}
  </div>
{:else if $activePanel === null}
  <div
    transition:fly={{ x: -50, delay: 1 }}
    style:top={`${openIconOffset * 4}rem`}
  >
    <OpenClosePanel {panelTitle} closed={true}>
      <Icon {icon} size={2.5} />
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
    overflow: hidden;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color-black);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    margin-left: 10px;
    opacity: 0.95;
    width: 23rem;
    min-height: 20rem;
    height: 100%;
    max-height: calc(100vh - 8rem);
    padding-bottom: 6rem;
    resize: vertical;
    overflow-y: scroll;
    overflow-x: hidden;
    pointer-events: all;
  }

  section > *:not(header, footer) {
    flex-grow: 1;
  }

  @media only screen and (max-width: 30rem) {
    section,
    div {
      width: calc(100% - 10px);
    }
  }

  header,
  footer {
    position: sticky;
    z-index: 1;
    top: 0;
    padding: 1rem;
    background-color: var(--color-black);
    width: 100%;
    box-shadow: 0 0 1rem var(--color-black-dark);
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-self: flex-end;
  }

  header.isEmpty {
    justify-content: flex-end;
    padding: 1rem;
    background-color: transparent;
    box-shadow: unset;
    margin-bottom: -4.5rem;
  }

  footer {
    top: unset;
    bottom: 0;
    transform: translateY(6rem);
  }
</style>
