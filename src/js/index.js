const { Menu } = require("./menu");

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-functionality]").forEach((node) => {
    const component = node.dataset.functionality;

    switch (component) {
      case Menu.name:
        return new Menu(node);

      default:
        console.error(`Unknown component found: ${component}`);
        return;
    }
  });
});
