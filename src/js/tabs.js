// Functionality follows ARIA developer guidelines
// https://www.w3.org/TR/wai-aria-practices-1.2/examples/tabs/tabs-1/tabs.html

const tablistQuery = '[role="tablist"]';
const tabButtonQuery = 'button[role="tab"]';
const tabPanelQuery = '[role="tabpanel"]';

class Tabs {
  static componentName = "tabs";
  tabs;
  panels;

  constructor(node) {
    this.tabs = node.querySelectorAll(`${tablistQuery} ${tabButtonQuery}`);
    this.panels = node.querySelectorAll(tabPanelQuery);

    this.setListeners();
  }

  setListeners = () => {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this.handleSelect);
      tab.addEventListener("keydown", this.handleKeyDown);
    });
  };

  handleSelect = (evt) => {
    const { target } = evt;

    this.selectTab(target);
  };

  handleKeyDown = (evt) => {
    const { code, target } = evt;

    let targetNode = null;
    switch (code) {
      case "ArrowLeft":
        targetNode = target.previousElementSibling;
        break;
      case "ArrowRight":
        targetNode = target.nextElementSibling;
        break;
      case "Home":
        targetNode = this.tabs[0];
        break;
      case "End":
        targetNode = this.tabs[this.tabs.length - 1];
      default:
        return;
    }

    evt.preventDefault();

    this.selectTab(targetNode);
  };

  // activates a tab
  selectTab = (tab) => {
    if (!tab) {
      return;
    }

    this.clearSelection();

    const targetPanelId = tab.getAttribute("aria-controls");
    const targetPanel = document.getElementById(targetPanelId);
    targetPanel.removeAttribute("hidden");

    tab.ariaSelected = true;
    tab.removeAttribute("tabindex");
    tab.focus();
  };

  // resets the state of all the tabs
  clearSelection = () => {
    // hides all of the tabs
    this.panels.forEach((panel) => {
      panel.setAttribute("hidden", "");
    });

    // resets aria attributes on tab buttons
    this.tabs.forEach((tab) => {
      tab.setAttribute("tabindex", -1);
      tab.ariaSelected = false;
    });
  };
}

module.exports = {
  Tabs,
};
