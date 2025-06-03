// src/utils/update-contact-dropdown.ts

// import { CustomDropdown } from "../components/dropdown/custom-dropdown";
import { StorageManager } from "../services/storage-manager";

// export function updateContactGroupDropdown() {
//   const dropdownContainer = document.querySelector(
//     ".dropdown-group-dropdown-menu--container"
//   );

//   if (!dropdownContainer) {
//     console.warn("Контейнер дропдауна не найден");
//     return;
//   }

//   let ul = dropdownContainer.querySelector(
//     "ul.dropdown-menu.group-list"
//   ) as HTMLElement;

//   if (!ul) {
//     ul = document.createElement("ul");
//     ul.className = "dropdown-menu group-list";
//     dropdownContainer.appendChild(ul);
//   }

//   ul.innerHTML = ""; // Очистка

//   const groups = StorageManager.getGroups();

//   groups.forEach((group) => {
//     const li = document.createElement("li");
//     li.className = "group-item";
//     li.dataset.id = group.id;
//     li.textContent = group.name;

//     li.addEventListener("click", () => {
//       ul.querySelectorAll("li").forEach((i) => i.classList.remove("selected"));
//       li.classList.add("selected");
//     });

//     ul.appendChild(li);
//   });
// }

// src/utils/update-contact-dropdown.ts

// export function updateContactGroupDropdown() {
//   const dropdownContainer = document.querySelector<HTMLElement>(
//     ".dropdown-group-dropdown-menu--container"
//   );

//   if (!dropdownContainer) {
//     console.warn("Не найден .dropdown-group-dropdown-menu--container");
//     return;
//   }

//   const groupDropdown = new CustomDropdown(dropdownContainer.classList[0]);
//   const groups = StorageManager.getGroups();

//   groupDropdown.dataItems = groups.map((g) => ({ id: g.id, name: g.name }));
// }

// src/utils/update-contact-group-dropdown.ts

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
