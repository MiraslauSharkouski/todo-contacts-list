// src/utils/update-contact-list.ts

import { StorageManager } from "../services/storage-manager";

export function updateContactList(groupId: string) {
  const groupTrigger = document.querySelector(
    `.dropdown-trigger.main[data-id="${groupId}"]`
  ) as HTMLElement;

  const contactList = groupTrigger
    ?.closest(".dropdown-group-dropdown-menu--container")
    ?.querySelector<HTMLElement>(".dropdown-menu.group-list.contact.main");

  if (!contactList) {
    console.warn(`Не найден контейнер для группы ${groupId}`);
    return;
  }

  const contacts = StorageManager.getContacts().filter(
    (c) => c.groupId === groupId
  );

  contactList.innerHTML = ""; // Очистка перед обновлением

  if (contacts.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "В этой группе пока нет контактов";
    emptyLi.style.color = "#888";
    contactList.appendChild(emptyLi);
    return;
  }

  contacts.forEach((contact) => {
    const li = document.createElement("li");
    li.className = "group-item contant main";
    li.innerHTML = `
      <div class="name-container">${contact.name}</div>
      <div class="phone-edit-delete--container">
        <div class="phone">${contact.phone}</div>
        <div class="edit-delete--block">
          <button class="btn-edit"><svg class="svg-edit" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                        viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_11309_213)">
                          <path opacity="0.3"
                            d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                            fill="black" />
                        </g>
                        <defs>
                          <clipPath id="clip0_11309_213">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg></button>
          <button class="trash"><svg class="svg-trash" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                        viewBox="0 0 26 26" fill="none">
                        <g clip-path="url(#clip0_1894_240)">
                          <path opacity="0.3"
                            d="M6.66664 20.3889C6.66664 21.55 7.61664 22.5 8.77775 22.5H17.2222C18.3833 22.5 19.3333 21.55 19.3333 20.3889V7.72222H6.66664V20.3889ZM9.26331 12.8733L10.7516 11.385L13 13.6228L15.2378 11.385L16.7261 12.8733L14.4883 15.1111L16.7261 17.3489L15.2378 18.8372L13 16.5994L10.7622 18.8372L9.27386 17.3489L11.5116 15.1111L9.26331 12.8733ZM16.6944 4.55556L15.6389 3.5H10.3611L9.30553 4.55556H5.61108V6.66667H20.3889V4.55556H16.6944Z"
                            fill="black" />
                        </g>
                        <defs>
                          <clipPath id="clip0_1894_240">
                            <rect width="25.3333" height="25.3333" fill="white"
                              transform="translate(0.333252 0.333313)" />
                          </clipPath>
                        </defs>
                      </svg></button>
        </div>
      </div>
    `;
    contactList.appendChild(li);
    // --- Обработчик удаления контакта ---
    const trashBtn = li.querySelector(".trash") as HTMLButtonElement;
    if (trashBtn) {
      trashBtn.addEventListener("click", () => {
        const updatedContacts = StorageManager.getContacts().filter(
          (c) => c.id !== contact.id
        );
        StorageManager.saveContacts(updatedContacts);
        updateContactList(groupId); // Обновляем список
      });
    }
  });
}
