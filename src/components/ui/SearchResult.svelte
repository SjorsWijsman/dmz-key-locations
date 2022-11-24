<script>
  import { map } from "../../store";

  export let key;

  function goToKeyLocation() {
    $map.setView([4150 - key.location.y, key.location.x], 0, {
      animate: true,
      pan: {
        duration: 0.3,
      },
    });
  }
</script>

<li>
  {key.title}
  <button on:click={goToKeyLocation}>
    <img src="./location-dot.svg" alt="" />
  </button>
</li>

<style>
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 1rem;
    margin: 0 0;
    transition: all 0.1s ease-out;
  }

  li:hover {
    font-weight: bold;
    background-color: var(--color-black-dark);
    padding: 1rem 1rem;
    margin: 0;
  }

  li:hover button {
    background-color: var(--color-main);
    transform: scale(1.2);
  }

  button {
    background-color: var(--color-black-dark);
    border: none;
    margin-left: 1rem;
    border-radius: 0.3rem;
    transition: all 0.1s ease-out;
    cursor: pointer;
    user-select: none;
  }

  button img {
    width: 1rem;
    margin: 0.3rem;
  }
</style>
