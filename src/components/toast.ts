class Toast {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "toast-container";
    document.body.appendChild(this.container);
  }

  show(message: string, type: "success" | "error" = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.innerText = message;
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => this.container.removeChild(toast), 300);
      }, 3000);
    }, 100);
  }
}

export default new Toast();
