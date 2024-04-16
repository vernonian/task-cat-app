

export function focusOnInit(node:any) {
  if (node && typeof node.selec === 'function') {
    node.focus();
  }
}

/**
 * Select the text when element gains focus
 */
export function selectOnFocus(node:any) {
  if (node && typeof node.select === 'function') {
    // Add event listener to get select when focused
    const onFocus = (event) => node.select();
    node.addEventListener("focus", onFocus);
    return {
      // executed when the node is removed from DOM
      destroy: () => node.removeEventListener("focus", onFocus),
    }
  }
}