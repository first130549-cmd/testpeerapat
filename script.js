document.addEventListener("DOMContentLoaded", function(){

// ===== Elements =====
const scaleSlider = document.getElementById("scale");
const card = document.getElementById("card");
const startTestBtn = document.getElementById("startTestBtn");
const calibrationSection = document.getElementById("calibration");
const distanceModal = document.getElementById("distanceModal");

const beginTestBtn = document.getElementById("beginTestBtn");
const testSection = document.getElementById("testSection");
const letterDisplay = document.getElementById("letterDisplay");
const answerButtons = document.getElementById("answerButtons");
const questionInfo = document.getElementById("questionInfo");
const resultSection = document.getElementById("resultSection");
const resultContent = document.getElementById("resultContent");

const eyeModal = document.getElementById("eyeModal");
const eyeTitle = document.getElementById("eyeTitle");
const eyeInstruction = document.getElementById("eyeInstruction");
const eyeStartBtn = document.getElementById("eyeStartBtn");


// ===== Calibration =====
let pixelPerMM = 0;
const realCardWidthMM = 85.6;
const baseWidth = 300;

scaleSlider.addEventListener("input", () => {
  const newWidth = baseWidth * (scaleSlider.value / 100);
  card.style.width = newWidth + "px";

  const ratio = 53.98 / 85.6;
  card.style.height = (newWidth * ratio) + "px";
});

startTestBtn.addEventListener("click", () => {

  const pixelWidth = card.offsetWidth;
  pixelPerMM = pixelWidth / realCardWidthMM;

 calibrationSection.classList.add("hidden");

  distanceModal.classList.remove("hidden");
distanceModal.classList.add("show");
});


// ===== Test Data =====
const letters = ["E","F","P","T","O","Z","L","D"];

const levels = [
  { mm: 35, label: "20/100" },
  { mm: 28, label: "20/70" },
  { mm: 22, label: "20/50" },
  { mm: 16, label: "20/30" },
  { mm: 12, label: "20/20" }
];

let currentLevel = 0;
let questionInLevel = 0;
let wrongInLevel = 0;
let currentLetter = "";
let finalResult = "";

let currentEye = "ตาขวา";
let rightEyeResult = "";
let leftEyeResult = "";


// ===== Advice =====
function getAdvice(result){

  if(result === "20/20"){
    return "สายตาอยู่ในเกณฑ์ปกติ";
  }

  if(result === "20/30"){
    return "สายตาลดลงเล็กน้อย ควรตรวจเพิ่มเติม";
  }

  if(result === "20/50"){
    return "สายตาลดลงชัดเจน แนะนำพบผู้เชี่ยวชาญ";
  }

  return "ควรเข้าพบจักษุแพทย์";
}


// ===== Flow =====
beginTestBtn.addEventListener("click", () => {
  distanceModal.classList.add("hidden");
  distanceModal.classList.remove("show");

  showEyeInstruction("ตาขวา");
});

function showEyeInstruction(eye){
  eyeModal.classList.remove("hidden");
  eyeModal.classList.add("show");

  if(eye === "ตาขวา"){
    eyeTitle.innerText = "ทดสอบตาขวา";
    eyeInstruction.innerText = "กรุณาปิดตาซ้าย แล้วมองด้วยตาขวา";
  } else {
    eyeTitle.innerText = "ทดสอบตาซ้าย";
    eyeInstruction.innerText = "กรุณาปิดตาขวา แล้วมองด้วยตาซ้าย";
  }
}

eyeStartBtn.addEventListener("click", () => {

  if(pixelPerMM === 0){
    alert("กรุณา Calibration ก่อนเริ่มทดสอบ");
    return;
  }

  eyeModal.classList.remove("show");
  eyeModal.classList.add("hidden");

  testSection.classList.remove("hidden");
  resetLevel();
  showQuestion();
});

// ===== Question =====
function showQuestion(){

  if(currentLevel >= levels.length){
    finishTest();
    return;
  }

  questionInfo.innerText =
    `ทดสอบ${currentEye} | ระดับ ${levels[currentLevel].label} | ข้อ ${questionInLevel+1}/4`;

  currentLetter =
    letters[Math.floor(Math.random()*letters.length)];

  const fontSizePX =
    levels[currentLevel].mm * pixelPerMM;

  letterDisplay.innerText = currentLetter;
  letterDisplay.style.fontSize = fontSizePX + "px";

  answerButtons.innerHTML = "";

  letters.forEach(l=>{
    const btn = document.createElement("button");
    btn.innerText = l;
    btn.onclick = ()=>checkAnswer(l);
    answerButtons.appendChild(btn);
  });
}


function checkAnswer(selected){

  if(selected !== currentLetter){
    wrongInLevel++;
  }

  questionInLevel++;

  if(wrongInLevel >= 3){
    finishTest();
    return;
  }

  if(questionInLevel >= 4){
    finalResult = levels[currentLevel].label;
    currentLevel++;
    questionInLevel = 0;
    wrongInLevel = 0;
  }

  showQuestion();
}


function resetLevel(){
  currentLevel = 0;
  questionInLevel = 0;
  wrongInLevel = 0;
  finalResult = "";
}


function finishTest(){

  testSection.classList.add("hidden");

  if(!finalResult){
    finalResult = levels[0].label;
  }

  if(currentEye === "ตาขวา"){
    rightEyeResult = finalResult;
    currentEye = "ตาซ้าย";
    showEyeInstruction("ตาซ้าย");
    return;
  }

  leftEyeResult = finalResult;

  resultSection.classList.remove("hidden");

  resultContent.innerHTML = `
    <h2>สรุปผลการทดสอบ</h2>
    <p>ตาขวา: <b>${rightEyeResult}</b></p>
    <p>${getAdvice(rightEyeResult)}</p>
    <br>
    <p>ตาซ้าย: <b>${leftEyeResult}</b></p>
    <p>${getAdvice(leftEyeResult)}</p>
  `;
}

});