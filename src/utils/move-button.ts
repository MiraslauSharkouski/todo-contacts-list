export function moveAddContactButton() {
  const mobileBreakpoint = 768;
  const template = document.getElementById(
    "add-contact-button-template"
  ) as HTMLTemplateElement;
  const desktopContainer = document.querySelector(".desktop-button-container");
  const mobileContainer = document.querySelector(".mobile-button-container");

  if (!template || (!desktopContainer && !mobileContainer)) {
    console.warn("Не найдены контейнеры или шаблон");
    return;
  }

  // Удаляем старую кнопку
  const existingButton = document.querySelector(".add-contact");
  if (existingButton) existingButton.remove();

  const buttonClone = template.content.cloneNode(true) as DocumentFragment;

  if (window.innerWidth <= mobileBreakpoint) {
    if (mobileContainer) {
      mobileContainer.innerHTML = "";
      mobileContainer.appendChild(buttonClone);
    }
  } else {
    if (desktopContainer) {
      desktopContainer.innerHTML = "";
      desktopContainer.appendChild(buttonClone);
    }
  }

  setupDropdowns(); // После вставки кнопки
}

export function setupDropdowns() {
  const contactDropdown = document.querySelector(
    ".add-contact-dropdown"
  ) as HTMLElement;
  const groupsDropdown = document.querySelector(
    ".groups-dropdown"
  ) as HTMLElement;
  const overlay = document.querySelector(".overlay") as HTMLElement;

  function closeAllMenus() {
    contactDropdown.classList.remove("active");
    groupsDropdown.classList.remove("active");
    overlay.classList.remove("active");
  }

  const addContactBtn = document.querySelector(".add-contact");
  const groupsBtn = document.querySelector(".groups");

  // Открытие меню "Добавить контакт"
  if (addContactBtn && contactDropdown) {
    addContactBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllMenus();
      contactDropdown.classList.add("active");
      overlay.classList.add("active");
    });
  }

  // Открытие меню "Группы"
  if (groupsBtn && groupsDropdown) {
    groupsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllMenus();
      groupsDropdown.classList.add("active");
      overlay.classList.add("active");
    });
  }

  // Закрытие по крестику
  const closeIcons = document.querySelectorAll(
    '.dropdown-title-container img[alt="close"]'
  );

  closeIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllMenus();
    });
  });

  // Закрытие при клике вне меню
  overlay?.addEventListener("click", () => {
    closeAllMenus();
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (
      overlay.classList.contains("active") &&
      !contactDropdown.contains(target) &&
      !groupsDropdown.contains(target) &&
      !target.closest(".add-contact") &&
      !target.closest(".groups")
    ) {
      closeAllMenus();
    }
  });

  // Предотвращаем закрытие при клике внутри меню
  [contactDropdown, groupsDropdown].forEach((menu) => {
    menu?.addEventListener("click", (e) => e.stopPropagation());
  });
}
