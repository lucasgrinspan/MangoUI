const navToggleButton = document.querySelector("#nav-header-container > button");
const navContainer = document.querySelector("#nav-container");
const nav = document.querySelector("#nav-container nav");
const navHeight = nav.offsetHeight;

navToggleButton.addEventListener("click", () => {
  const isExpanded = navToggleButton.ariaExpanded === "true";
  const targetHeight = isExpanded ? 0 : navHeight;
  const targetMessage = isExpanded ? "Expand navigation" : "Collapse navigation";

  navContainer.style.maxHeight = `${targetHeight}px`;
  navToggleButton.ariaExpanded = !isExpanded;
  navToggleButton.classList.toggle("icon-right-arrow", isExpanded);
  navToggleButton.classList.toggle("icon-down-arrow", !isExpanded);
  navToggleButton.innerText = targetMessage;
});