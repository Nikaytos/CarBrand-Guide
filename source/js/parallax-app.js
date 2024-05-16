const textElement = document.getElementById("parallaxText");

window.addEventListener("scroll", function () {
  const currentScrollPosition = window.scrollY;

  // Змінено з transform на opacity
  textElement.style.opacity = `${
    1 - currentScrollPosition / (window.innerHeight * 0.5)
  }`;
});
