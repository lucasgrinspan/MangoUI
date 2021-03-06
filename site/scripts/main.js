const navToggleButton = document.querySelector("#nav-header-container > button");
const navContainer = document.querySelector("#nav-container");
const nav = document.querySelector("#nav-container nav");
const navHeight = nav?.offsetHeight;

navToggleButton?.addEventListener("click", () => {
  const isExpanded = navToggleButton.ariaExpanded === "true";
  const targetHeight = isExpanded ? 0 : navHeight + 1; /* border */
  const targetMessage = isExpanded ? "Expand navigation" : "Collapse navigation";

  navContainer.style.maxHeight = `${targetHeight}px`;
  navToggleButton.ariaExpanded = !isExpanded;
  navToggleButton.classList.toggle("icon-right-arrow", isExpanded);
  navToggleButton.classList.toggle("icon-down-arrow", !isExpanded);
  navToggleButton.innerText = targetMessage;
});

// theme handlers
const root = document.getElementsByTagName("html")[0];
const themeMenuItem = document.getElementById(mangoUiTheme) || document.getElementById("sunset");

themeMenuItem.ariaChecked = true;

const themeButtons = document.querySelectorAll("#theme-picker-container button");

// theme toggle menu
Array.from(themeButtons).forEach((themeButton) => {
  themeButton.addEventListener("click", ({ target }) => {
    const theme = target.id;
    root.dataset.theme = theme;
    localStorage.setItem("mango-theme", theme);
  });
});
