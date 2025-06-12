const change_theme = () => {
  let documentDayMode = [...document.querySelectorAll(".dark-light-btn")];
  documentDayMode.map((elem) => {
    elem.addEventListener("click", () => {
      if (elem.innerHTML == '<i class="fa-duotone fa-moon-stars text-dark"></i>') {
        documentDayMode.map((item) => {
          item.innerHTML = '<i class="fa-duotone fa-sun text text-light"></i>';
        });
        document.body.setAttribute("data-bs-theme", "dark");
        document.body.setAttribute("data-theme-mode", "dark");
      } else {
        documentDayMode.map((item) => {
          item.innerHTML = '<i class="fa-duotone fa-moon-stars text-dark"></i>';
        });
        document.body.setAttribute("data-bs-theme", "light");
        document.body.setAttribute("data-theme-mode", "light");
      }
    });
  });
};
export default change_theme;
