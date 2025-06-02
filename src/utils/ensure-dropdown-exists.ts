// src/utils/ensure-dropdown-exists.ts
// import type { Group } from "../types/group";

export function ensureDropdownExists() {
  const existing = document.querySelector(
    ".dropdown-group-dropdown-menu--container"
  );
  if (existing) return;

  //   const div = document.createElement("div");
  //     div.className = "group-item";
  //     div.dataset.id = group.id;
  //     div.innerHTML = `
  //       <div class="edit-group">${group.name}</div>
  //     `;

  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown-group-dropdown-menu--container";

  dropdownContainer.innerHTML = `
    <div class="dropdown-group input">
      <div class="dropdown-trigger">Выберите группу</div>
    </div>
    <ul class="dropdown-menu group-list"></ul>
  `;

  const inputsContainer = document.querySelector(
    ".contact-form .inputs-container"
  );
  if (inputsContainer) {
    inputsContainer.appendChild(dropdownContainer);
  } else {
    console.warn("Не найден .inputs-container для дропдауна");
  }
}
