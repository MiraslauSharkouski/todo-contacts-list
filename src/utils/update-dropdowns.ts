import { CustomDropdown } from "../components/dropdown/custom-dropdown";
import { StorageManager } from "../services/storage-manager";

export function updateDropdowns() {
  const containers = document.querySelectorAll<HTMLElement>(
    ".dropdown-group-dropdown-menu--container"
  );

  if (containers.length === 0) {
    console.warn(
      "Не найдены контейнеры .dropdown-group-dropdown-menu--container"
    );
    return;
  }

  const groups = StorageManager.getGroups();

  containers.forEach((container) => {
    const dropdown = new CustomDropdown(container.classList[0]);

    dropdown.dataItems = groups.map((group) => ({
      id: group.id,
      name: group.name,
    }));
  });
}
