import { applyPhoneMask } from "../utils/phone-mask";
import Toast from "../components/toast";
import { StorageManager } from "../services/storage-manager";
import { Validator } from "../utils/validator";

function setupContactForm() {
  const form = document.querySelector(".contact-form") as HTMLFormElement;
  const groupDropdown = new CustomDropdown(
    ".dropdown-group-dropdown-menu--container"
  );

  // Получаем группы для дропдауна
  const groups = StorageManager.getGroups();
  groupDropdown.dataItems = groups.map((g) => ({ id: g.id, name: g.name }));

  const phoneMask = applyPhoneMask("phone-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = phoneMask.unmaskedValue;
    const groupId = groupDropdown.getSelectedValue();

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

    Toast.show("Контакт успешно добавлен", "success");
    form.reset();
  });
}
