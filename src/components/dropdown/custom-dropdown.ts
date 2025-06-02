// export class CustomDropdown {
//   private menu: HTMLElement;
//   private trigger: HTMLElement;
//   private itemsContainer: HTMLElement;

//   constructor(selector: string) {
//     const container = document.querySelector<HTMLElement>(selector);
//     if (!container) {
//       console.warn(`Контейнер "${selector}" не найден. Дропдаун отложен.`);
//       this.trigger = null as any; // Чтобы избежать ошибок
//       this.menu = null as any;
//       this.itemsContainer = null as any;
//       return;
//     }

//     this.trigger = container.querySelector(".dropdown-trigger")!;
//     this.menu = container.querySelector(".dropdown-menu")!;
//     this.itemsContainer =
//       this.menu.querySelector("ul") ?? document.createElement("ul");

//     if (!this.menu.contains(this.itemsContainer)) {
//       this.menu.appendChild(this.itemsContainer);
//     }

//     this.initEvents();
//   }

//   public bind(eventType: string, callback: (value: any) => void): void {
//     this.trigger.addEventListener(eventType, () =>
//       callback(this.getSelectedItem())
//     );
//   }

//   public getSelectedItem(): { id: string; name: string } | null {
//     const item = this.itemsContainer.querySelector(".selected");
//     if (!item) return null;

//     // const elementItem = item as HTMLElement;
//     // return {
//     //   id: elementItem.dataset.id!,
//     //   name: elementItem.textContent || "",
//     // };

//     return {
//       id: item.getAttribute("data-id")!,
//       name: item.textContent || "",
//     };
//   }

//   public getSelectedValue(): string | null {
//     const item = this.getSelectedItem();
//     return item?.id || null;
//   }

//   public set dataItems(items: Array<{ id: string; name: string }>) {
//     this.itemsContainer.innerHTML = "";

//     if (items.length === 0) {
//       const emptyItem = document.createElement("li");
//       emptyItem.textContent = "Нет доступных групп";
//       emptyItem.style.color = "#888";
//       this.itemsContainer.appendChild(emptyItem);
//       return;
//     }

//     items.forEach((item) => {
//       const li = document.createElement("li");
//       li.classList.add("group-item");
//       li.setAttribute("data-id", item.id);
//       li.textContent = item.name;
//       li.addEventListener("click", () => {
//         this.itemsContainer
//           .querySelectorAll("li")
//           .forEach((i) => i.classList.remove("selected"));
//         li.classList.add("selected");
//         this.trigger.textContent = item.name + " ";
//         this.trigger.appendChild(
//           document.querySelector(".arrow")!.cloneNode(true)
//         );
//         this.menu.classList.remove("active");
//         this.trigger.classList.remove("active");
//       });
//       this.itemsContainer.appendChild(li);
//     });
//   }

//   private initEvents(): void {
//     this.trigger.addEventListener("click", () => {
//       this.menu.classList.toggle("active");
//       this.trigger.classList.toggle("active");
//     });
//   }
// }

// src/components/dropdown/custom-dropdown.ts

// export class CustomDropdown {
//   private menu: HTMLElement | null;
//   private trigger: HTMLElement | null;
//   private itemsContainer: HTMLUListElement | null;

//   constructor(selector: string) {
//     const container = document.querySelector<HTMLElement>(selector);
//     if (!container) {
//       console.warn(`Контейнер "${selector}" не найден`);
//       this.menu = null;
//       this.trigger = null;
//       this.itemsContainer = null;
//       return;
//     }

//     // --- Триггер (например, кнопка выбора группы)
//     this.trigger = container.querySelector<HTMLElement>(".dropdown-trigger");

//     // --- Меню дропдауна
//     const menuEl = container.querySelector<HTMLElement>(".dropdown-menu");
//     this.menu = menuEl;

//     // --- UL внутри меню
//     let ulEl = menuEl?.querySelector<HTMLUListElement>("ul");

//     if (!ulEl && menuEl) {
//       ulEl = document.createElement("ul");
//       ulEl.className = "group-list";
//       menuEl.appendChild(ulEl);
//     }

//     this.itemsContainer = ulEl ?? null;

//     this.initEvents();
//   }

//   public bind(eventType: string, callback: (value: any) => void): void {
//     if (this.trigger) {
//       this.trigger.addEventListener(eventType, () =>
//         callback(this.getSelectedItem())
//       );
//     }
//   }

//   public getSelectedItem(): { id: string; name: string } | null {
//     if (!this.itemsContainer) return null;

//     const item = this.itemsContainer.querySelector<HTMLElement>(".selected");
//     if (!item) return null;

//     return {
//       id: item.dataset.id!,
//       name: item.textContent || "",
//     };
//   }

//   public getSelectedValue(): string | null {
//     const item = this.getSelectedItem();
//     return item?.id || null;
//   }

//   public set dataItems(items: Array<{ id: string; name: string }>) {
//     if (!this.itemsContainer) {
//       console.warn("itemsContainer не определён", this.menu);
//       return;
//     }

//     this.itemsContainer.innerHTML = "";

//     if (items.length === 0) {
//       const li = document.createElement("li");
//       li.textContent = "Нет доступных групп";
//       li.style.color = "#888";
//       this.itemsContainer.appendChild(li);
//       return;
//     }

//     items.forEach((group) => {
//       const li = document.createElement("li");
//       li.className = "group-item";
//       li.setAttribute("data-id", group.id);
//       li.textContent = group.name;

//       li.addEventListener("click", () => {
//         this.itemsContainer!.querySelectorAll("li").forEach((i) =>
//           i.classList.remove("selected")
//         );
//         li.classList.add("selected");

//         if (this.trigger) {
//           this.trigger.textContent = group.name + " ";
//           const arrow = document.querySelector(".arrow")?.cloneNode(true);
//           if (arrow) {
//             // Очищаем предыдущий arrow
//             const existingArrow = this.trigger.querySelector("img, svg");
//             if (existingArrow) existingArrow.remove();
//             this.trigger.appendChild(arrow);
//           }
//         }
//       });

//       this.itemsContainer?.appendChild(li);
//     });
//   }

//   private initEvents(): void {
//     if (!this.trigger || !this.menu) return;

//     this.trigger.addEventListener("click", () => {
//       this.menu?.classList.toggle("active");
//       this.trigger?.classList.toggle("active");
//     });
//   }
// }

// src/components/dropdown/custom-dropdown.ts

export class CustomDropdown {
  private menu: HTMLElement | null;
  private trigger: HTMLElement | null;
  private itemsContainer: HTMLUListElement | null;

  constructor(selector: string) {
    const container = document.querySelector<HTMLElement>(selector);
    if (!container) {
      console.warn(`Контейнер "${selector}" не найден`);
      this.menu = null;
      this.trigger = null;
      this.itemsContainer = null;
      return;
    }

    // --- Инициализируем элементы ---
    this.trigger = container.querySelector<HTMLElement>(".dropdown-trigger");
    this.menu = container.querySelector<HTMLElement>(".dropdown-menu");

    let ulEl = this.menu?.querySelector<HTMLUListElement>("ul");

    if (!ulEl && this.menu) {
      ulEl = document.createElement("ul");
      ulEl.className = "dropdown-menu group-list";
      this.menu.appendChild(ulEl);
    }

    this.itemsContainer = ulEl ?? null;

    this.initEvents();
  }

  public bind(eventType: string, callback: (value: any) => void): void {
    if (this.trigger) {
      this.trigger.addEventListener(eventType, () =>
        callback(this.getSelectedItem())
      );
    }
  }

  public getSelectedItem(): { id: string; name: string } | null {
    if (!this.itemsContainer) return null;

    const item = this.itemsContainer.querySelector<HTMLElement>(".selected");
    if (!item) return null;

    return {
      id: item.dataset.id!,
      name: item.textContent || "",
    };
  }

  public getSelectedValue(): string | null {
    const item = this.itemsContainer?.querySelector(".selected");
    return item?.getAttribute("data-id") ?? null;
  }

  public set dataItems(items: Array<{ id: string; name: string }>) {
    if (!this.itemsContainer) {
      console.warn("itemsContainer не определён", this.menu);
      return;
    }

    this.itemsContainer.innerHTML = "";

    if (items.length === 0) {
      const emptyLi = document.createElement("li");
      emptyLi.textContent = "Нет доступных групп";
      emptyLi.style.color = "#888";
      this.itemsContainer.appendChild(emptyLi);
      return;
    }

    items.forEach((group) => {
      const li = document.createElement("li");
      li.className = "group-item";
      li.setAttribute("data-id", group.id);
      li.textContent = group.name;

      li.addEventListener("click", () => {
        this.itemsContainer!.querySelectorAll("li").forEach((i) =>
          i.classList.remove("selected")
        );
        li.classList.add("selected");

        if (this.trigger) {
          this.trigger.textContent = group.name + " ";
          this.trigger.appendChild(
            document.querySelector(".arrow")!.cloneNode(true)
          );
        }

        if (this.menu) {
          this.menu.classList.remove("active");
          this.trigger?.classList.remove("active");
        }
      });

      this.itemsContainer.appendChild(li);
    });
  }

  private initEvents(): void {
    if (!this.trigger || !this.menu) return;

    this.trigger.addEventListener("click", () => {
      this.menu?.classList.toggle("active");
      this.trigger?.classList.toggle("active");
    });
  }
}

export default { CustomDropdown };
