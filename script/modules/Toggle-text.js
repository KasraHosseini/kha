function toggleBtn(element, target, height) {
  element = document.querySelector(element);
  target = document.querySelector(target);
  target.style.overflow = "hidden";
  target.style.height = height + "px";
  element.addEventListener("click", () => {
    if (element.innerHTML == "بستن") {
      target.style.overflow = "hidden";
      target.style.height = height + "px";
      element.innerHTML = "باز کردن";
    } else {
      target.style.height = "fit-content";
      element.innerHTML = "بستن";
    }
  });
}
export default toggleBtn;
