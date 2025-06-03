// src/utils/create-group-container.ts

import type { Group } from "../types/group";

export function createGroupContainerIfHasContacts(group: Group) {
  const existing = document.querySelector(
    `.dropdown-trigger-main[data-id="${group.id}"]`
  );

  if (existing) return;

  const container = document.createElement("div");
  container.className = "dropdown-group-dropdown-menu--container-main";
  container.innerHTML = `
    <div class="dropdown-group input-main">
      <div class="dropdown-trigger-main" data-id="${group.id}">
        ${group.name}
        <img src="./public/svg/arrow.svg" alt="arrow" />
      </div>
    </div>
    <ul class="dropdown-menu group-list contact-main"></ul>
  `;

  const mainContainer = document.querySelector(".container") as HTMLElement;
  if (!mainContainer) return;

  // --- Вставляем после .mobile-button-container ---
  const mobileButtonContainer = mainContainer.querySelector(
    ".mobile-button-container"
  );

  if (mobileButtonContainer) {
    mobileButtonContainer.insertAdjacentElement("afterend", container);
  } else {
    mainContainer.appendChild(container);
  }
}
