import Toast from "../components/toast";
import { StorageManager } from "../services/storage-manager";
import { Validator } from "../utils/validator";

function setupGroupForm() {
  const form = document.querySelector(".group-form") as HTMLFormElement;
  const input = form.querySelector(
    'input[name="groupName"]'
  ) as HTMLInputElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = input.value.trim();
    if (!name) {
      Toast.show("Введите название группы", "error");
      return;
    }

    if (!Validator.isUniqueGroupName(name)) {
      Toast.show("Группа с таким названием уже существует", "error");
      return;
    }

    const group = {
      id: crypto.randomUUID(),
      name,
    };

    const groups = StorageManager.getGroups();
    groups.push(group);
    StorageManager.saveGroups(groups);

    Toast.show("Группа успешно добавлена", "success");
    input.value = "";
  });
}
