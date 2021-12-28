/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Menu } = __webpack_require__(/*! ./menu */ \"./src/js/menu.js\");\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n  document.querySelectorAll(\"[data-functionality]\").forEach((node) => {\n    const component = node.dataset.functionality;\n\n    switch (component) {\n      case Menu.name:\n        return new Menu(node);\n\n      default:\n        console.error(`Unknown component found: ${component}`);\n        return;\n    }\n  });\n});\n\n\n//# sourceURL=webpack://mango-ui-components/./src/js/index.js?");

/***/ }),

/***/ "./src/js/menu.js":
/*!************************!*\
  !*** ./src/js/menu.js ***!
  \************************/
/***/ ((module) => {

eval("// Functionality follows the recommendation from the W3C\n// https://www.w3.org/TR/wai-aria-practices-1.2/#menu\n\nconst buttonQuery = 'button[aria-haspopup=\"menu\"]';\nconst itemContainerQuery = '[role=\"menu\"]';\nconst checkboxRole = \"menuitemcheckbox\";\nconst radioRole = \"menuitemradio\";\n\nclass Menu {\n  static name = \"menu\";\n  componentTarget;\n  button;\n  itemContainer;\n  items;\n\n  constructor(node) {\n    this.componentTarget = node;\n    this.button = node.querySelector(buttonQuery);\n    this.itemContainer = node.querySelector(itemContainerQuery);\n    this.items = Array.from(this.itemContainer.children) || [];\n\n    this.setListeners();\n  }\n\n  setListeners = () => {\n    this.button.addEventListener(\"click\", (e) => {\n      if (e.target.ariaExpanded === \"true\") {\n        this.closeMenu();\n      } else {\n        this.openMenu();\n      }\n    });\n\n    this.items.forEach((item) => {\n      item.addEventListener(\"keydown\", this.handleKeyDown);\n      item.addEventListener(\"click\", this.handleItemSelect);\n    });\n\n    document.addEventListener(\"click\", this.handleDocumentClick);\n  };\n\n  // close the menu if the user clicks outside of it\n  handleDocumentClick = (evt) => {\n    const { target } = evt;\n    const isExpanded = this.button.ariaExpanded === \"true\";\n\n    // we don't want it running on every click since closeMenu moves focus\n    if (!this.componentTarget.contains(target) && isExpanded) {\n      this.closeMenu();\n    }\n  };\n\n  // toggle the selection. If \"enter\" was pressed, close the menu\n  handleCheckboxSelection = (evt) => {\n    const { target } = evt;\n    const isSelected = target.ariaChecked === \"true\";\n    target.ariaChecked = !isSelected;\n\n    this.focusItem(target);\n  };\n\n  // selection is enabled and aria-checked is cleared on all other\n  // items. If \"enter\" was pressed, close the menu as well\n  handleRadioSelection = (evt) => {\n    const { target } = evt;\n\n    this.items.forEach((item) => (item.ariaChecked = false));\n    target.ariaChecked = true;\n\n    this.focusItem(target);\n  };\n\n  // there is different behavior depending on whether Space or Enter was\n  // used for the different types of menu items: normal, checkbox, radio\n  handleItemSelect = (evt) => {\n    const role = evt.target.getAttribute(\"role\");\n    if (role === checkboxRole) {\n      this.handleCheckboxSelection(evt);\n    } else if (role === radioRole) {\n      this.handleRadioSelection(evt);\n    } else {\n      // the menu should close after using a regular menuitem\n      this.closeMenu();\n    }\n  };\n\n  // Resets the tabindices as well and returns focus to the menu button\n  closeMenu = (focusMenuButton = true) => {\n    this.itemContainer.setAttribute(\"hidden\", \"\");\n    this.button.setAttribute(\"aria-expanded\", false);\n    this.items.forEach((item) => item.setAttribute(\"tabindex\", -1));\n    if (focusMenuButton) {\n      this.button.focus();\n    }\n  };\n\n  openMenu = () => {\n    this.itemContainer.removeAttribute(\"hidden\");\n    this.button.setAttribute(\"aria-expanded\", true);\n    this.focusItem(this.items[0]);\n  };\n\n  handleKeyDown = (event) => {\n    const { code, target } = event;\n\n    let targetNode;\n    switch (code) {\n      case \"Escape\":\n        return this.closeMenu();\n      case \"Tab\":\n        return this.closeMenu(false);\n      case \"ArrowUp\":\n        targetNode = target.previousElementSibling;\n        break;\n      case \"ArrowDown\":\n        targetNode = target.nextElementSibling;\n        break;\n      case \"Home\":\n        targetNode = this.items[0];\n        break;\n      case \"End\":\n        targetNode = this.items[this.items.length - 1];\n        break;\n      default:\n        return;\n    }\n\n    // we only want to prevent default of the arrow keys\n    event.preventDefault();\n\n    this.focusItem(targetNode);\n  };\n\n  focusItem = (node) => {\n    if (!node) {\n      return;\n    }\n\n    this.items.forEach((item) => item.setAttribute(\"tabindex\", -1));\n    node.focus();\n    node.setAttribute(\"tabindex\", 0);\n  };\n}\n\nmodule.exports = {\n  Menu,\n  name: \"menu\",\n};\n\n\n//# sourceURL=webpack://mango-ui-components/./src/js/menu.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;