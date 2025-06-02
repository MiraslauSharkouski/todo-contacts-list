// src/utils/create-group-container.ts

import type { Group } from "../types/group";
import { StorageManager } from "../services/storage-manager";

export function createGroupContainerIfHasContacts(group: Group) {
  const contacts = StorageManager.getContacts().filter(
    (contact) => contact.groupId === group.id
  );

  if (contacts.length === 0) return;

  // --- Проверяем, существует ли уже контейнер ---
  const existing = document.querySelector(
    `.dropdown-trigger.main[data-id="${group.id}"]`
  );
  if (existing) return;

  // --- Создаём контейнер для группы ---
  const container = document.createElement("div");
  container.className = "dropdown-group-dropdown-menu--container main";

  container.innerHTML = `
    <div class="dropdown-group input main">
      <div class="dropdown-trigger main" data-id="${group.id}">
        ${group.name}
        <img src="./public/svg/arrow.svg" alt="arrow" />
      </div>
    </div>
    <ul class="dropdown-menu group-list contact main"></ul>
  `;

  // --- Вставляем после .mobile-button-container ---
  const mobileButtonContainer = document.querySelector(
    ".mobile-button-container"
  );

  if (!mobileButtonContainer) {
    console.warn("Не найден .mobile-button-container");
    return;
  }

  mobileButtonContainer.insertAdjacentElement("afterend", container);
}
