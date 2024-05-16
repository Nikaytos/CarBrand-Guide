document.addEventListener("DOMContentLoaded", function () {
  const carWidth = document.querySelector(".car-in-row").offsetWidth;

  document.querySelectorAll(".cars-row").forEach(function (row, index) {
    const arrowLeft = row.querySelector(".arrow-left");
    const arrowRight = row.querySelector(".arrow-right");
    const carsRow = row.querySelector(`.car-in-row${index + 1}-move`);
    handleArrowClick(arrowLeft, carsRow);
    handleArrowClick(arrowRight, carsRow);
  });

  function handleArrowClick(arrow, carsRow) {
    arrow.addEventListener("click", function () {
      let currentMargin = parseFloat(getComputedStyle(carsRow).marginLeft);
      let maxOffset = -carsRow.offsetWidth + carsRow.parentElement.offsetWidth;
      let newMargin = Math.min(
        Math.max(
          currentMargin +
            (arrow.classList.contains("arrow-left") ? carWidth : -carWidth),
          maxOffset
        ),
        0
      );
      carsRow.style.marginLeft = `${newMargin}px`;
    });
  }
});
