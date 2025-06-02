import Toast from "../components/toast";
import { StorageManager } from "../services/storage-manager";

function setupDeleteGroupPopup() {
  const trashButton = document.querySelector(".trash");
  const popup = document.querySelector(".popup-delete-group") as HTMLElement;
  const overlay = document.querySelector(".overlay") as HTMLElement;

  if (!trashButton || !popup || !overlay) return;

  trashButton.addEventListener("click", (e) => {
    e.stopPropagation();
    overlay.classList.add("active");
    popup.classList.add("active");
  });

  const cancelButton = popup.querySelector(".cancel-delete");
  const confirmButton = popup.querySelector(".confirm-delete");

  cancelButton?.addEventListener("click", () => {
    overlay.classList.remove("active");
    popup.classList.remove("active");
  });

  confirmButton?.addEventListener("click", () => {
    const groupId = "..."; // Получи ID группы
    StorageManager.deleteGroup(groupId);
    Toast.show("Группа и связанные контакты удалены", "success");
    overlay.classList.remove("active");
    popup.classList.remove("active");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      popup.classList.remove("active");
    }
  });
}
