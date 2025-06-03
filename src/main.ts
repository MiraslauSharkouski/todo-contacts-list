// import "./style.css";
// import "./reset.css";

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
  moveAddContactButton(); // Перемещаем кнопку

  setupDropdowns(); // Инициализируем дропдауны
  setupDeleteGroupPopup(); // Попап удаления группы
  setupGroupForm(); // Форма создания группы
  setupContactForm(); // Форма создания контакта
  // --- Ждём появления контейнера ---
  waitForElement(".dropdown-group-dropdown-menu--container", () => {
    updateContactGroupDropdown(); // ← Теперь будет работать
    setupAllGroupDropdowns(); // ← Теперь будет работать
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

// function moveAddContactButton() {
//   const mobileBreakpoint = 768;
//   const template = document.getElementById(
//     "add-contact-button-template"
//   ) as HTMLTemplateElement;
//   const desktopContainer = document.querySelector(".desktop-button-container");
//   const mobileContainer = document.querySelector(".mobile-button-container");

//   if (!template || (!desktopContainer && !mobileContainer)) {
//     console.warn("Не найдены контейнеры или шаблон");
//     return;
//   }

//   // Удаляем старую кнопку
//   const existingButton = document.querySelector(".add-contact");
//   if (existingButton) existingButton.remove();

//   const buttonClone = template.content.cloneNode(true) as DocumentFragment;

//   if (window.innerWidth <= mobileBreakpoint) {
//     if (mobileContainer) {
//       mobileContainer.innerHTML = "";
//       mobileContainer.appendChild(buttonClone);
//     }
//   } else {
//     if (desktopContainer) {
//       desktopContainer.innerHTML = "";
//       desktopContainer.appendChild(buttonClone);
//     }
//   }

//   setupDropdowns(); // После вставки кнопки
// }

// function setupDropdowns() {
//   const contactDropdown = document.querySelector(
//     ".add-contact-dropdown"
//   ) as HTMLElement;
//   const groupsDropdown = document.querySelector(
//     ".groups-dropdown"
//   ) as HTMLElement;
//   const overlay = document.querySelector(".overlay") as HTMLElement;

//   function closeAllMenus() {
//     contactDropdown.classList.remove("active");
//     groupsDropdown.classList.remove("active");
//     overlay.classList.remove("active");
//   }

//   const addContactBtn = document.querySelector(".add-contact");
//   const groupsBtn = document.querySelector(".groups");

//   // Открытие меню "Добавить контакт"
//   if (addContactBtn && contactDropdown) {
//     addContactBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       closeAllMenus();
//       contactDropdown.classList.add("active");
//       overlay.classList.add("active");
//     });
//   }

//   // Открытие меню "Группы"
//   if (groupsBtn && groupsDropdown) {
//     groupsBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       closeAllMenus();
//       groupsDropdown.classList.add("active");
//       overlay.classList.add("active");
//     });
//   }

//   // Закрытие по крестику
//   const closeIcons = document.querySelectorAll(
//     '.dropdown-title-container img[alt="close"]'
//   );

//   closeIcons.forEach((icon) => {
//     icon.addEventListener("click", (e) => {
//       e.stopPropagation();
//       closeAllMenus();
//     });
//   });

//   // Закрытие при клике вне меню
//   overlay?.addEventListener("click", () => {
//     closeAllMenus();
//   });

//   document.addEventListener("click", (e) => {
//     const target = e.target as HTMLElement;

//     if (
//       overlay.classList.contains("active") &&
//       !contactDropdown.contains(target) &&
//       !groupsDropdown.contains(target) &&
//       !target.closest(".add-contact") &&
//       !target.closest(".groups")
//     ) {
//       closeAllMenus();
//     }
//   });

//   // Предотвращаем закрытие при клике внутри меню
//   [contactDropdown, groupsDropdown].forEach((menu) => {
//     menu?.addEventListener("click", (e) => e.stopPropagation());
//   });
// }

// // Запуск после полной загрузки DOM
// window.addEventListener("DOMContentLoaded", () => {
//   moveAddContactButton(); // Вставляем кнопку
// });

// // Адаптация под ресайз
// window.addEventListener("resize", () => {
//   clearTimeout((window as any).__resizeTimer__);
//   (window as any).__resizeTimer__ = setTimeout(() => {
//     moveAddContactButton(); // Обновляем расположение кнопки
//   }, 100);
// });

// function setupPopupCloseButton() {
//   const popup = document.querySelector(
//     ".popup.popup-delete-group"
//   ) as HTMLElement;
//   const closeBtn = popup?.querySelector(".close");
//   const overlay = document.querySelector(".overlay") as HTMLElement;

//   if (!popup || !closeBtn || !overlay) return;

//   closeBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     popup.classList.remove("active");
//     overlay.classList.remove("active");
//   });
// }

// // Вызываем после загрузки DOM
// window.addEventListener("DOMContentLoaded", () => {
//   setupAllGroupDropdowns();
//   setupPopupCloseButton();
// });

// function setupDeleteGroupPopup() {
//   const trashButton = document.querySelector(".trash");
//   const overlay = document.querySelector(".overlay") as HTMLElement;
//   const popup = document.querySelector(".popup-delete-group") as HTMLElement;

//   if (!trashButton || !overlay || !popup) return;

//   // Открытие попапа
//   trashButton.addEventListener("click", (e) => {
//     e.stopPropagation();
//     overlay.classList.add("active");
//     popup.classList.add("active");
//   });

//   // Закрытие по клику на "Отмена"
//   const cancelButton = popup.querySelector(".cancel-delete");
//   cancelButton?.addEventListener("click", () => {
//     overlay.classList.remove("active");
//     popup.classList.remove("active");
//   });

//   // Закрытие по клику вне окна
//   overlay.addEventListener("click", (e) => {
//     if (e.target === overlay) {
//       overlay.classList.remove("active");
//       popup.classList.remove("active");
//     }
//   });
// }

// // Вызываем после загрузки DOM
// window.addEventListener("DOMContentLoaded", () => {
//   setupDeleteGroupPopup();
// });
