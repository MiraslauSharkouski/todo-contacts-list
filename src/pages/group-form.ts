// // src/pages/group-form.ts
// import Toast from "../components/toast";
// import { Validator } from "../utils/validator";
// import { StorageManager } from "../services/storage-manager";
// import { updateDropdowns } from "../utils/update-dropdowns";
// import type { Group } from "../types/group";
// import { TRASH_ICON } from "../components/svg-icons/trash";

// function renderGroupItem(group: Group) {
//   const groupList = document.querySelector(".groups-list") as HTMLElement;
//   if (!groupList) return;

//   // Проверяем, не отрендерена ли группа уже
//   if (groupList.querySelector(`[data-id="${group.id}"]`)) return;

//   const div = document.createElement("div");
//   div.className = "group-item";
//   div.dataset.id = group.id;
//   div.innerHTML = `
//     <div class="edit-group">${group.name}</div>
//     <button type="button" class="trash">${TRASH_ICON}</button>
//   `;

//   groupList.appendChild(div);

//   // --- Обработчик клика — редактирование ---
//   div.addEventListener("click", () => {
//     const input = document.querySelector<HTMLInputElement>(
//       ".group-form .input-container input[name='groupName']"
//     );
//     const btnSave = document.querySelector<HTMLButtonElement>(
//       ".group-form .btn-blue"
//     );

//     if (input && btnSave) {
//       input.value = group.name;
//       input.closest(".input-container")?.classList.add("visible");
//       btnSave.textContent = "Сохранить";
//     }
//   });

//   // --- Удаление группы ---
//   const trashBtn = div.querySelector(".trash") as HTMLButtonElement;
//   if (trashBtn) {
//     trashBtn.addEventListener("click", () => {
//       const confirmDelete = window.confirm(
//         "Вы уверены? Это приведет к удалению всех контактов этой группы"
//       );
//       if (confirmDelete) {
//         StorageManager.deleteGroup(group.id);
//         div.remove();
//         Toast.show("Группа и связанные контакты удалены", "success");
//       }
//     });
//   }
// }

// export function setupGroupForm() {
//   const form = document.querySelector(".group-form") as HTMLFormElement;
//   if (!form) return;

//   const inputContainer = form.querySelector(
//     ".input-container"
//   ) as HTMLDivElement;
//   const input = form.querySelector(
//     "input[name='groupName']"
//   ) as HTMLInputElement;
//   const btnAdd = form.querySelector(".btn-text-blue") as HTMLButtonElement;
//   const btnSave = form.querySelector(".btn-blue") as HTMLButtonElement;

//   if (!inputContainer || !input || !btnAdd || !btnSave) {
//     console.warn("Не все элементы формы группы найдены");
//     return;
//   }

//   // --- Клик на "Добавить" ---
//   btnAdd.addEventListener("click", (e) => {
//     e.preventDefault();
//     input.value = "";
//     inputContainer.classList.add("visible");
//     input.focus();
//   });

//   // --- Сохранение группы ---
//   btnSave.addEventListener("click", (e) => {
//     e.preventDefault();

//     const groupName = input.value.trim();
//     const groupId = crypto.randomUUID();

//     if (!groupName) {
//       Toast.show("Введите название группы", "error");
//       return;
//     }

//     if (!Validator.isUniqueGroupName(groupName)) {
//       Toast.show("Группа с таким названием уже существует", "error");
//       return;
//     }
//     const group = { id: groupId, name: groupName };
//     const groups = StorageManager.getGroups();
//     groups.push({ id: groupId, name: groupName });
//     StorageManager.saveGroups(groups);

//     renderGroupItem({ id: groupId, name: groupName });
//     // Теперь можно обновить дропдаун выбора группы
//     renderGroupItem(group); // Рендерим в .groups-list
//     updateDropdowns();
//     Toast.show("Группа успешно добавлена");

//     inputContainer.classList.remove("visible");
//     input.value = "";
//   });
// }
// // --- Рендер всех групп при загрузке ---
// window.addEventListener("DOMContentLoaded", () => {
//   const groups = StorageManager.getGroups();
//   groups.forEach((group) => renderGroupItem(group));
// });

// src/pages/group-form.ts

import Toast from "../components/toast";
import { Validator } from "../utils/validator";
import { StorageManager } from "../services/storage-manager";
// import { updateDropdowns } from "../utils/update-dropdowns";
import { updateContactGroupDropdown } from "../utils/update-contact-group-dropdown";

import type { Group } from "../types/group";
import { TRASH_ICON } from "../components/svg-icons/trash";
import { updateDropdowns } from "../utils/update-dropdowns";

/**
 * Рендерит группу в .groups-list
 */
export function renderGroupItem(group: Group) {
  const groupList = document.querySelector(".groups-list") as HTMLElement;
  if (!groupList) return;

  // Проверка на дублирование
  if (groupList.querySelector(`[data-id="${group.id}"]`)) return;

  const div = document.createElement("div");
  div.className = "group-item";
  div.dataset.id = group.id;
  div.innerHTML = `
    <div class="edit-group">${group.name}</div>
    <button type="button" class="trash">${TRASH_ICON}</button>
  `;

  groupList.appendChild(div);

  // --- Обработчик клика — редактирование ---
  div.addEventListener("click", () => {
    const input = document.querySelector<HTMLInputElement>(
      ".group-form .input-container input[name='groupName']"
    );
    const btnSave = document.querySelector<HTMLButtonElement>(
      ".group-form .btn-blue"
    );

    if (input && btnSave) {
      input.value = group.name;
      input.closest(".input-container")?.classList.add("visible");
      btnSave.textContent = "Сохранить";
    }
  });

  // --- Обработчик удаления ---
  const trashBtn = div.querySelector(".trash") as HTMLButtonElement;
  if (trashBtn) {
    trashBtn.addEventListener("click", () => {
      const confirmDelete = window.confirm(
        "Вы уверены? Это удалит все контакты этой группы."
      );
      if (confirmDelete) {
        StorageManager.deleteGroup(group.id);
        div.remove();
        Toast.show("Группа и связанные контакты удалены", "success");
      }
    });
  }
}

/**
 * Инициализирует работу формы добавления группы
 */
export function setupGroupForm() {
  const form = document.querySelector(".group-form") as HTMLFormElement;
  if (!form) {
    console.warn("Форма 'group-form' не найдена");
    return;
  }

  const inputContainer = form.querySelector(
    ".input-container"
  ) as HTMLDivElement;
  const input = form.querySelector(
    "input[name='groupName']"
  ) as HTMLInputElement;
  const btnAdd = form.querySelector(".btn-text-blue") as HTMLButtonElement;
  const btnSave = form.querySelector(".btn-blue") as HTMLButtonElement;

  if (!inputContainer || !input || !btnAdd || !btnSave) {
    console.warn("Не все элементы формы группы найдены");
    return;
  }

  // --- Клик по "Добавить" ---
  btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    input.value = "";
    inputContainer.classList.add("visible");
    input.focus();
  });

  // --- Клик по "Сохранить" ---
  btnSave.addEventListener("click", async (e) => {
    e.preventDefault();

    const groupName = input.value.trim();
    const groupId = crypto.randomUUID();

    if (!groupName) {
      Toast.show("Введите название группы", "error");
      return;
    }

    if (!Validator.isUniqueGroupName(groupName)) {
      Toast.show("Группа с таким названием уже существует", "error");
      return;
    }

    const newGroup = { id: groupId, name: groupName };
    const groups = [...StorageManager.getGroups(), newGroup];
    StorageManager.saveGroups(groups);

    renderGroupItem(newGroup); // Рендерим новую группу
    updateDropdowns(); // Обновляем дропдауны
    updateContactGroupDropdown(); // ← Важно!

    Toast.show("Группа успешно добавлена");

    inputContainer.classList.remove("visible");
    input.value = "";
  });
}

// --- При загрузке страницы — восстанавливаем интерфейс ---
window.addEventListener("DOMContentLoaded", () => {
  const groups = StorageManager.getGroups();
  groups.forEach((group) => renderGroupItem(group));
});
