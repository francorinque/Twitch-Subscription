const d = document;

export default function hamburgerMenu(icono, menu, overlay) {
  const $toggle = d.querySelector(icono),
    $navMenu = d.querySelector(menu),
    $overlay = d.querySelector(overlay);

  // evento al clickear el hamburger
  openMenuOverlay(icono, $navMenu, $overlay);
  // evento al clickear los, links
  closeMenuOverlay($navMenu, $overlay, menu);
}

function openMenuOverlay(clase, menu, overlay) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(clase) || e.target.matches(`${clase} *`)) {
      menu.classList.toggle("showme");
      overlay.classList.toggle("showme");
    }
  });
}

function closeMenuOverlay(menu, overlay, clase) {
  menu.addEventListener("click", (e) => {
    if (e.target.matches(`${clase} a`)) {
      menu.classList.remove("showme");
      overlay.classList.remove("showme");
    }
  });
}
