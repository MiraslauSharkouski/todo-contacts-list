// src/components/custom-dropdown.ts
class CustomDropdown {
  private menu: HTMLElement;
  private trigger: HTMLElement;
  private itemsContainer: HTMLElement;

  constructor(private selector: string) {
    const container = document.querySelector<HTMLElement>(selector);
    if (!container) throw new Error("Dropdown контейнер не найден");

    this.trigger = container.querySelector(".dropdown-trigger")!;
    this.menu = container.querySelector(".dropdown-menu")!;
    this.itemsContainer = this.menu.querySelector("ul")!;

    this.initEvents();
  }

  public bind(eventType: string, callback: (value: any) => void): void {
    this.trigger.addEventListener(eventType, () =>
      callback(this.getSelectedItem())
    );
  }

  public getSelectedValue(): string | null {
    const selectedItem = this.itemsContainer.querySelector(".selected");
    return selectedItem ? selectedItem.getAttribute("data-value") : null;
  }

  public getSelectedItem(): { id: string; name: string } | null {
    const item = this.itemsContainer.querySelector(".selected");
    return item ? { id: item.dataset.id!, name: item.textContent || "" } : null;
  }

  public set dataItems(items: Array<{ id: string; name: string }>) {
    this.itemsContainer.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("group-item");
      li.setAttribute("data-id", item.id);
      li.textContent = item.name;
      li.addEventListener("click", () => {
        this.itemsContainer
          .querySelectorAll("li")
          .forEach((i) => i.classList.remove("selected"));
        li.classList.add("selected");
        this.trigger.textContent = item.name + " ";
        this.trigger.appendChild(
          document.querySelector(".arrow")!.cloneNode(true)
        );
        this.menu.classList.remove("active");
        this.trigger.classList.remove("active");
      });
      this.itemsContainer.appendChild(li);
    });
  }

  private initEvents(): void {
    this.trigger.addEventListener("click", () => {
      this.menu.classList.toggle("active");
      this.trigger.classList.toggle("active");
    });
  }
}
