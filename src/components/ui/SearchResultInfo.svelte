<script>
  import { slide } from "svelte/transition";

  export let isOpen;
  export let missionRequirement, description, loot;

  function fadeSlide(node, options) {
    const slideTrans = slide(node, options);
    return {
      duration: options.duration,
      css: (t, u) => `
        ${slideTrans.css(t, u)}
        opacity: ${t};
      `,
    };
  }
</script>

{#if isOpen}
  <section transition:fadeSlide|local={{ duration: 200 }}>
    {#if missionRequirement}
      <p class="warning">
        <img src="./icons/circle-exclamation.svg" alt="" />
        Mission Requirement
      </p>
    {/if}
    <h3>Description</h3>
    <p>
      {description || "WIP"}
    </p>
    <h3>Loot</h3>
    <p>
      {loot || "WIP"}
    </p>
  </section>
{/if}

<style>
  p {
    display: flex;
    align-items: center;
    margin: 0;
    padding-bottom: 1rem;
    font-weight: 350;
    font-size: 0.95rem;
    opacity: 0.85;
  }

  p.warning {
    position: relative;
    color: var(--color-warning);
    padding-top: 0.1rem;
    padding-bottom: 0.5rem;
  }

  p img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
  }

  p:last-child {
    padding-bottom: 0;
  }

  h3 {
    font-size: 1rem;
    opacity: 0.5;
    margin: 0;
    padding-bottom: 0.1rem;
    padding-top: 1rem;
    font-weight: 350;
  }
</style>
