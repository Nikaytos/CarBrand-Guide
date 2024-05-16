const textElement = document.getElementById("parallaxText");

window.addEventListener("scroll", function () {
  const currentScrollPosition = window.scrollY;
  /*
   * Паралакс ефект
   */
  textElement.style.opacity = `${
    1 - currentScrollPosition / (window.innerHeight * 0.5)
  }`;
});
