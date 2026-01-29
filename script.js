/* ===== Calibration ===== */


const scaleSlider = document.getElementById("scale");
const card = document.getElementById("card");
const startTestBtn = document.getElementById("startTestBtn");


let scaleFactor = 1;


scaleSlider.addEventListener("input", () => {
  scaleFactor = scaleSlider.value / 100;
  card.style.transform = `scale(${scaleFactor})`;
});


startTestBtn.addEventListener("click", () => {
  alert("Calibration เสร็จแล้ว!");
});
