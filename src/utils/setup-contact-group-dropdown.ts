// src/utils/setup-contact-group-dropdowns.ts

export function setupContactGroupDropdowns() {
  const containers = document.querySelectorAll<HTMLElement>(
    ".dropdown-group.input-main"
  );

  containers.forEach((container) => {
    const trigger = container.querySelector<HTMLElement>(
      ".dropdown-trigger-main"
    );
    const menu = container.querySelector<HTMLElement>(
      ".dropdown-menu.group-list.contact-main"
    );
    const arrow = trigger?.querySelector<HTMLImageElement>("img");

    if (!trigger || !menu) return;

    // --- Обработчик открытия / закрытия ---
    trigger.addEventListener("click", () => {
      menu.classList.toggle("active");
      trigger.classList.toggle("active");

      // --- Поворот стрелки ---
      if (arrow) {
        arrow.style.transform = menu.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0)";
      }
    });
  });
}
