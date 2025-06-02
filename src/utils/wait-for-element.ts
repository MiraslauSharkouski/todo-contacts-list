// src/utils/wait-for-element.ts

export function waitForElement(selector: string, callback: () => void) {
  const interval = setInterval(() => {
    if (document.querySelector(selector)) {
      clearInterval(interval);
      callback();
    }
  }, 50);
}
