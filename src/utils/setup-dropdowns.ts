// src/utils/setup-dropdowns.ts

export function setupDropdowns() {
  const dropdownContainers = document.querySelectorAll<HTMLElement>(
    ".dropdown-group-dropdown-menu--container"
  );

  if (dropdownContainers.length === 0) {
    console.warn("Не найдены контейнеры дропдаунов");
    return;
  }

  dropdownContainers.forEach((container) => {
    const trigger = container.querySelector<HTMLElement>(".dropdown-trigger");
    const menu = container.querySelector<HTMLElement>(".dropdown-menu");
    const arrow = trigger?.querySelector<HTMLImageElement>("img");

    if (!trigger || !menu) {
      console.warn(
        "В одном из дропдаунов не найдены элементы .dropdown-trigger или .dropdown-menu"
      );
      return;
    }

    // --- Обработчик открытия/закрытия ---
    trigger.addEventListener("click", () => {
      menu.classList.toggle("active");
      trigger.classList.toggle("active");

      if (arrow) {
        arrow.style.transform = menu.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0)";
      }
    });

    // --- При клике на пункт списка — выбираем группу ---
    menu.querySelectorAll(".group-item").forEach((li) => {
      li.addEventListener("click", () => {
        // Убираем выделение у всех пунктов
        menu
          .querySelectorAll(".group-item")
          .forEach((item) => item.classList.remove("selected"));
        // Выделяем выбранный
        li.classList.add("selected");

        // Можешь добавить кастомную логику здесь
        // Например, обновление текста в `.dropdown-trigger`
        trigger.textContent = li.textContent + " ";
        if (arrow) {
          trigger.appendChild(arrow.cloneNode(true)); // Восстанавливаем стрелку
        }
      });
    });
  });
}
