const { Menu } = require("./menu");
const { Tabs } = require("./tabs");

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-functionality]").forEach((node) => {
    const component = node.dataset.functionality;

    switch (component) {
      case Menu.componentName:
        return new Menu(node);
      case Tabs.componentName:
        return new Tabs(node);

      default:
        console.error(`Unknown component found: ${component}`);
        return;
    }
  });
});
