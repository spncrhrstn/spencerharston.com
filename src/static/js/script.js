// Main navigation hamburger menu
const $navBurgers = document.querySelectorAll(".nav-burger");
if ($navBurgers.length > 0) {
  $navBurgers.forEach(el => {
    el.addEventListener("click", () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
}
