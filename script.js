/* ===== Calibration ===== */

// ดึง element
const scaleSlider = document.getElementById("scale");
const card = document.getElementById("card");
const startTestBtn = document.getElementById("startTestBtn");

// ค่า scale ปัจจุบัน
let scaleFactor = 1;

// เลื่อน slider → ปรับขนาดบัตร
scaleSlider.addEventListener("input", () => {
  scaleFactor = scaleSlider.value / 100;
  card.style.transform = `scale(${scaleFactor})`;
});

// กดปุ่มเริ่มทดสอบ (ตอนนี้ยังไม่ทำอะไร)
startTestBtn.addEventListener("click", () => {
  alert("Calibration เสร็จแล้ว!");
});
