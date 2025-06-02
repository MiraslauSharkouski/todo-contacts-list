// src/utils/setup-all-group-dropdowns.ts

export function setupAllGroupDropdowns() {
  const containers = document.querySelectorAll<HTMLElement>(
    ".dropdown-group-dropdown-menu--container"
  );

  containers.forEach((container) => {
    const trigger = container.querySelector<HTMLElement>(".dropdown-trigger");
    const menu = container.querySelector<HTMLElement>(".dropdown-menu");

    if (!trigger || !menu) return;

    const arrow = trigger.querySelector<HTMLImageElement>("img");

    trigger.addEventListener("click", () => {
      menu.classList.toggle("active");
      trigger.classList.toggle("active");

      if (arrow) {
        arrow.style.transform = menu.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0)";
      }
    });

    // --- При клике на пункт дропдауна ---
    menu.querySelectorAll(".group-item").forEach((li) => {
      li.addEventListener("click", () => {
        menu
          .querySelectorAll(".group-item")
          .forEach((i) => i.classList.remove("selected"));
        li.classList.add("selected");
      });
    });
  });
}
