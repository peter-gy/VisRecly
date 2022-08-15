export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Check if an element is in viewport
 *
 * @param element
 * @param offset
 * @returns {boolean}
 */
export function isInViewport(element: HTMLElement, offset = 0) {
  if (!element) return false;
  const top = element.getBoundingClientRect().top;
  return top + offset >= 0 && top - offset <= window.innerHeight;
}
