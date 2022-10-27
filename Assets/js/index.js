import showCart from "./cart_show.js";
import hamburgerMenu from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  hamburgerMenu(".hamburger", ".nav__menu-mobile", ".overlay");
  showCart(".cartIcon",".cart-container",".overlay")
});
