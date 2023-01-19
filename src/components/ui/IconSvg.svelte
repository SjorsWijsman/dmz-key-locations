<script>
  import { fadeSlide } from "$scripts/fade-slide";

  export let color;
  export let viewBox = "0 0 512 512";
  export let d;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {viewBox}
  transition:fadeSlide|local={{ duration: 300 }}
>
  {#if Array.isArray(color)}
    <defs>
      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
        {#each color as colorStop, i}
          <stop
            offset={`${(100 / (color.length - 1)) * i}%`}
            stop-color={colorStop}
          />
        {/each}
      </linearGradient>
    </defs>
    <path fill={"url(#gradient)"} {d} />
  {:else}
    <path fill={color} {d} />
  {/if}
</svg>

<style>
  path {
    transition: fill 0.3s ease-out;
  }
</style>
