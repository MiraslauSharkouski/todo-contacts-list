import { applyPhoneMask } from "../utils/phone-mask";
import Toast from "../components/toast";
import { Validator } from "../utils/validator";
import { StorageManager } from "../services/storage-manager";
import { CustomDropdown } from "../components/dropdown/custom-dropdown";
import type { Contact } from "../types/contact";
import { waitForElement } from "../utils/wait-for-element";
import { ensureDropdownExists } from "../utils/ensure-dropdown-exists";
import { updateContactList } from "../utils/update-contact-list";
import { createGroupContainerIfHasContacts } from "../utils/create-group-container";
// import { renderGroupItem } from "../pages/group-form";
// import { updateContactGroupDropdown } from "../utils/update-contact-group-dropdown";

export function setupContactForm() {
  const form = document.querySelector(".contact-form") as HTMLFormElement;
  if (!form) return;

  ensureDropdownExists();

  const groupDropdown = new CustomDropdown(
    ".dropdown-group-dropdown-menu--container"
  );

  // --- Ждём появления контейнера дропдауна ---
  waitForElement(".dropdown-group-dropdown-menu--container", () => {
    const groupDropdown = new CustomDropdown(
      ".dropdown-group-dropdown-menu--container"
    );
    const groups = StorageManager.getGroups();

    groupDropdown.dataItems = groups.map((g) => ({ id: g.id, name: g.name }));
  });

  // --- Подписываемся на событие выбора ---
  groupDropdown.bind("click", (selected) => {
    console.log("Выбрана группа:", selected);
  });

  const phoneMask = applyPhoneMask("phone-input");

  if (!phoneMask) {
    Toast.show("Ошибка маски телефона", "error");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = form.querySelector<HTMLInputElement>("[name='name']");
    const phoneInput = form.querySelector<HTMLInputElement>("[name='phone']");
    const groupId = groupDropdown.getSelectedValue();

    if (!nameInput || !phoneInput || !groupId) {
      Toast.show("Не все поля формы найдены", "error");
      return;
    }

    const name = nameInput.value.trim();
    const phone = phoneMask.unmaskedValue.trim();

    if (!name || !phone || !groupId) {
      Toast.show("Заполните все поля", "error");
      return;
    }

    if (!Validator.isUniquePhoneNumber(phone)) {
      Toast.show("Контакт с таким номером уже существует", "error");
      return;
    }

    const contact: Contact = {
      id: crypto.randomUUID(),
      name,
      phone,
      groupId,
    };

    const contacts = StorageManager.getContacts();
    contacts.push(contact);
    StorageManager.saveContacts(contacts);

    const groups = StorageManager.getGroups();
    const group = groups.find((g) => g.id === groupId);

    if (group) {
      createGroupContainerIfHasContacts(group); // ← Создаётся только при наличии контактов
      updateContactList(group.id); // ← Рендерим контакт
    }

    Toast.show("Контакт успешно добавлен", "success");
    form.reset();
    // updateContactList(groupId);
  });
}
