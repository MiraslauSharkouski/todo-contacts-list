// src/utils/update-contact-dropdown.ts

import { StorageManager } from "../services/storage-manager";

export function updateContactGroupDropdown() {
  const dropdownContainer = document.querySelector<HTMLElement>(
    ".dropdown-group-dropdown-menu--container"
  );

  if (!dropdownContainer) return;

  const ul = dropdownContainer.querySelector("ul.dropdown-menu.group-list");

  if (!ul) return;

  ul.innerHTML = "";

  const groups = StorageManager.getGroups();

  groups.forEach((group) => {
    const li = document.createElement("li");
    li.className = "group-item";
    li.setAttribute("data-id", group.id);
    li.textContent = group.name;

    li.addEventListener("click", () => {
      ul.querySelectorAll("li").forEach((item) =>
        item.classList.remove("selected")
      );
      li.classList.add("selected");
    });

    ul.appendChild(li);
  });
}
