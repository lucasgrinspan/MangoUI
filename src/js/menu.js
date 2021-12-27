// Functionality follows the recommendation from the W3C
// https://www.w3.org/TR/wai-aria-practices-1.2/#menu

const buttonQuery = 'button[aria-haspopup="menu"]';
const itemContainerQuery = '[role="menu"]';
const checkboxRole = "menuitemcheckbox";
const radioRole = "menuitemradio";

class Menu {
  static name = "menu";
  componentTarget;
  button;
  itemContainer;
  items;

  constructor(node) {
    this.componentTarget = node;
    this.button = node.querySelector(buttonQuery);
    this.itemContainer = node.querySelector(itemContainerQuery);
    this.items = Array.from(this.itemContainer.children) || [];

    this.setListeners();
  }

  setListeners = () => {
    this.button.addEventListener("click", (e) => {
      if (e.target.ariaExpanded === "true") {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });

    this.items.forEach((item) => {
      item.addEventListener("keydown", this.handleKeyDown);
      item.addEventListener("click", this.handleItemSelect);
    });

    document.addEventListener("click", this.handleDocumentClick);
  };

  // close the menu if the user clicks outside of it
  handleDocumentClick = (evt) => {
    const { target } = evt;
    const isExpanded = this.button.ariaExpanded === "true";

    // we don't want it running on every click since closeMenu moves focus
    if (!this.componentTarget.contains(target) && isExpanded) {
      this.closeMenu();
    }
  };

  // toggle the selection. If "enter" was pressed, close the menu
  handleCheckboxSelection = (evt) => {
    const { target, code } = evt;
    const isSelected = target.ariaChecked === "true";
    target.ariaChecked = !isSelected;

    if (code === "Enter") {
      this.closeMenu();
    } else {
      this.focusItem(target);
    }
  };

  // selection is enabled and aria-checked is cleared on all other
  // items. If "enter" was pressed, close the menu as well
  handleRadioSelection = (evt) => {
    const { target, code } = evt;

    this.items.forEach((item) => (item.ariaChecked = false));
    target.ariaChecked = true;

    if (code === "Enter") {
      this.closeMenu();
    } else {
      this.focusItem(target);
    }
  };

  // there is different behavior depending on whether Space or Enter was
  // used for the different types of menu items: normal, checkbox, radio
  handleItemSelect = (evt, cancelClick = false) => {
    const role = evt.target.role;
    if (role === checkboxRole) {
      this.handleCheckboxSelection(evt);
    } else if (role === radioRole) {
      this.handleRadioSelection(evt);
    } else {
      // the menu should close after using a regular menuitem
      this.closeMenu();
    }

    // The 'click' event doesn't let you distinguish between Space and Enter.
    // This is one of the few cases where that's important, so if we listen
    // to those keys in keydown, we have to cancel the subsequent 'click'
    // to prevent this function from executing twice
    if (cancelClick) {
      evt.preventDefault();
    }
  };

  // Resets the tabindices as well and returns focus to the menu button
  closeMenu = (focusMenuButton = true) => {
    this.itemContainer.setAttribute("hidden", "");
    this.button.setAttribute("aria-expanded", false);
    this.items.forEach((item) => item.setAttribute("tabindex", -1));
    if (focusMenuButton) {
      this.button.focus();
    }
  };

  openMenu = () => {
    this.itemContainer.removeAttribute("hidden");
    this.button.setAttribute("aria-expanded", true);
    this.focusItem(this.items[0]);
  };

  handleKeyDown = (event) => {
    const { code, target } = event;

    let targetNode;
    switch (code) {
      case "Space":
      case "Enter":
        // handle the selection keys for special behavior
        return this.handleItemSelect(event, true);
      case "Escape":
        return this.closeMenu();
      case "Tab":
        return this.closeMenu(false);
      case "ArrowUp":
        targetNode = target.previousElementSibling;
        break;
      case "ArrowDown":
        targetNode = target.nextElementSibling;
        break;
      case "Home":
        targetNode = this.items[0];
      case "End":
        targetNode = this.items[this.items.length - 1];
      default:
        return;
    }

    // we don't want to cancel any other actions, so we call it here
    event.preventDefault();

    this.focusItem(targetNode);
  };

  focusItem = (node) => {
    if (!node) {
      return;
    }

    this.items.forEach((item) => item.setAttribute("tabindex", -1));
    node.focus();
    node.setAttribute("tabindex", 0);
  };
}

module.exports = {
  Menu,
  name: "menu",
};
