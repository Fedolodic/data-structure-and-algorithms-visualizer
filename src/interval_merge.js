const imInput = document.getElementById("imInput");
const imStartBtn = document.getElementById("imStartBtn");
const imPauseBtn = document.getElementById("imPauseBtn");
const imResetBtn = document.getElementById("imResetBtn");
const imOriginalContainer = document.getElementById("imOriginalContainer");
const imMergedContainer = document.getElementById("imMergedContainer");

let imIntervalId = null;
let imSorted = [];
let imMerged = [];
let imIndex = 0;

function imRender() {
  imOriginalContainer.innerHTML = "";
  imSorted.forEach((intv, i) => {
    const div = document.createElement("div");
    div.className = "array-item";
    div.textContent = `[${intv[0]},${intv[1]}]`;
    if (i === imIndex) div.classList.add("active");
    imOriginalContainer.appendChild(div);
  });
  imMergedContainer.innerHTML = "";
  imMerged.forEach(intv => {
    const div = document.createElement("div");
    div.className = "array-item";
    div.textContent = `[${intv[0]},${intv[1]}]`;
    imMergedContainer.appendChild(div);
  });
}

function imStep() {
  if (imIndex === 0) {
    imMerged = [imSorted[0].slice()];
  } else {
    const cur = imSorted[imIndex];
    const last = imMerged[imMerged.length - 1];
    if (cur[0] <= last[1]) {
      last[1] = Math.max(last[1], cur[1]);
    } else {
      imMerged.push(cur.slice());
    }
  }
  imRender();
  imIndex++;
  if (imIndex >= imSorted.length) {
    imPause();
  }
}

function imStart() {
  imSorted = imInput.value
    .split(",")
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => p.split("-").map(x => parseInt(x.trim(), 10)))
    .filter(a => a.length === 2 && !isNaN(a[0]) && !isNaN(a[1]));
  imSorted.sort((a, b) => a[0] - b[0]);
  imMerged = [];
  imIndex = 0;
  imRender();
  imPause();
  if (imSorted.length > 0) imIntervalId = setInterval(imStep, 1000);
}

function imPause() {
  if (imIntervalId) {
    clearInterval(imIntervalId);
    imIntervalId = null;
  }
}

function imReset() {
  imPause();
  imMerged = [];
  imIndex = 0;
  imRender();
}

imStartBtn.addEventListener("click", imStart);
imPauseBtn.addEventListener("click", imPause);
imResetBtn.addEventListener("click", imReset);

imRender();

