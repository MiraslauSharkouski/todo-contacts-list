import { moveAddContactButton } from "./utils/move-button";
import { setupDropdowns } from "./components/dropdown/setup-dropdowns";
import { setupDeleteGroupPopup } from "./pages/delete-group-popup";
import { setupContactForm } from "./pages/contact-form";
import { setupGroupForm } from "./pages/group-form";
import { setupAllGroupDropdowns } from "./utils/setup-all-group-dropdowns";
import { updateContactGroupDropdown } from "./utils/update-contact-group-dropdown";
import { initializeContactList } from "./utils/initialize-contact-list";
import { setupContactGroupDropdowns } from "./utils/setup-contact-group-dropdown";
// import { updateContactList } from "./utils/update-contact-list";
// import { updateDropdowns } from "./utils/update-dropdowns";

window.addEventListener("DOMContentLoaded", () => {
  moveAddContactButton();

  setupDropdowns();
  setupDeleteGroupPopup();
  setupGroupForm();
  setupContactForm();
  waitForElement(".dropdown-group-dropdown-menu--container", () => {
    updateContactGroupDropdown();
    setupAllGroupDropdowns();
  });
  initializeContactList();
  setupContactGroupDropdowns();
});

// Адаптация под ресайз
window.addEventListener("resize", () => {
  clearTimeout((window as any).__resizeTimer__);
  (window as any).__resizeTimer__ = setTimeout(() => {
    moveAddContactButton(); // Обновляем расположение кнопки
  }, 100);
});

function waitForElement(selector: string, callback: () => void) {
  const interval = setInterval(() => {
    if (document.querySelector(selector)) {
      clearInterval(interval);
      callback();
    }
  }, 50);
}
