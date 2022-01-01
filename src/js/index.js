const { Menu } = require("./menu");
const { Tabs } = require("./tabs");

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-functionality]").forEach((node) => {
    const component = node.dataset.functionality;

    switch (component) {
      case Menu.name:
        return new Menu(node);
      case Tabs.name:
        return new Tabs(node);

      default:
        console.error(`Unknown component found: ${component}`);
        return;
    }
  });
});
