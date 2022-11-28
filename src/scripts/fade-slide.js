import { slide } from "svelte/transition";

export function fadeSlide(node, options) {
  const slideTrans = slide(node, options);
  return {
    duration: options.duration,
    css: (t, u) => `
        ${slideTrans.css(t, u)}
        opacity: ${t};
      `,
  };
}
