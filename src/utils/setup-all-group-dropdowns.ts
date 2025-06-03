// src/utils/setup-all-group-dropdowns.ts

export function setupAllGroupDropdowns() {
  const containers = document.querySelectorAll<HTMLElement>(
    ".dropdown-group-dropdown-menu--container"
  );

  if (containers.length === 0) {
    console.warn("Не найдены контейнеры дропдаунов");
    return;
  }

  containers.forEach((container) => {
    const trigger = container.querySelector<HTMLElement>(".dropdown-trigger");
    const menu = container.querySelector<HTMLElement>(".dropdown-menu");

    if (!trigger || !menu) return;

    const arrow = trigger.querySelector<HTMLImageElement>("img");

    // --- Открытие / закрытие дропдауна ---
    trigger.addEventListener("click", () => {
      menu.classList.toggle("active");
      trigger.classList.toggle("active");

      if (arrow) {
        arrow.style.transform = menu.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0)";
      }
    });

    // --- Выбор пункта ---
    menu.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const li = target.closest(".group-item") as HTMLLIElement | null;

      if (!li) return;

      //   const selectedId = li.getAttribute("data-id");
      const selectedName = li.textContent?.trim();

      // Убираем выделение у всех
      menu
        .querySelectorAll(".group-item")
        .forEach((item) => item.classList.remove("selected"));
      li.classList.add("selected");

      // Обновляем текст триггера
      if (trigger && selectedName) {
        trigger.textContent = selectedName + " ";
        if (arrow) trigger.appendChild(arrow); // восстанавливаем стрелку
        if (arrow) {
          arrow.style.transform = "rotate(0)";
        } else {
          console.warn("Стрелка не найдена");
        }
      }

      // Закрываем меню после выбора
      menu.classList.remove("active");
      trigger.classList.remove("active");
    });
  });
}
