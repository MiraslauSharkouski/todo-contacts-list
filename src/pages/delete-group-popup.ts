import Toast from "../components/toast";
import { StorageManager } from "../services/storage-manager";

export function setupDeleteGroupPopup() {
  const trashButton = document.querySelector(".trash");
  const popup = document.querySelector(".popup-delete-group") as HTMLElement;
  const overlay = document.querySelector(".overlay") as HTMLElement;

  if (!trashButton || !popup || !overlay) return;

  // При клике на "Корзину" получаем ID группы и открываем попап
  trashButton.addEventListener("click", (e) => {
    e.stopPropagation();

    // 🔍 Находим родительский .group-item для получения ID
    const groupItem = trashButton.closest(".group-item") as HTMLElement;
    if (!groupItem) {
      console.error("Не удалось найти группу для удаления");
      return;
    }

    const groupId = groupItem.dataset.id;
    if (!groupId) {
      console.error("ID группы не найден");
      return;
    }

    // Сохраняем groupId во временное поле или data-атрибут
    (window as any).__DELETE_GROUP_ID__ = groupId;

    overlay.classList.add("active");
    popup.classList.add("active");
  });

  const cancelButton = popup.querySelector(".cancel-delete");
  const confirmButton = popup.querySelector(".confirm-delete");

  //  Отмена удаления
  cancelButton?.addEventListener("click", () => {
    overlay.classList.remove("active");
    popup.classList.remove("active");
  });

  //  Подтверждение удаления
  confirmButton?.addEventListener("click", () => {
    const groupId = (window as any).__DELETE_GROUP_ID__;
    if (!groupId) {
      Toast.show("Не удалось определить группу для удаления", "error");
      return;
    }

    // Удаляем группу и обновляем UI
    StorageManager.deleteGroup(groupId);
    Toast.show("Группа и связанные контакты успешно удалены", "success");

    overlay.classList.remove("active");
    popup.classList.remove("active");

    delete (window as any).__DELETE_GROUP_ID__;
  });

  // Закрытие попапа по клику вне области
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      popup.classList.remove("active");
    }
  });
}
