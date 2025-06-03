// src/utils/ensure-dropdown-exists.ts

// import { StorageManager } from "../services/storage-manager";

export function ensureDropdownExists() {
  const existing = document.querySelector(
    ".dropdown-group-dropdown-menu--container"
  );
  if (existing) return;

  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown-group-dropdown-menu--container";

  dropdownContainer.innerHTML = `
    <div class="dropdown-group input">
      <div class="dropdown-trigger">Выберите группу</div>
    </div>
    <ul class="dropdown-menu group-list"></ul>
  `;

  const inputsContainer = document.querySelector(".inputs-container");
  if (inputsContainer) {
    inputsContainer.appendChild(dropdownContainer);
  }
}
