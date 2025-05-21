const rotArrayInput = document.getElementById('rotArrayInput');
const rotTargetInput = document.getElementById('rotTarget');
const rotStartBtn = document.getElementById('rotStartBtn');
const rotPauseBtn = document.getElementById('rotPauseBtn');
const rotResetBtn = document.getElementById('rotResetBtn');
const rotArrayContainer = document.getElementById('rotArrayContainer');
const rotInfo = document.getElementById('rotInfo');

let rotArr = [];
let rotTarget = 0;
let rotLow = 0;
let rotHigh = 0;
let rotMid = 0;
let rotIntervalId = null;
let rotFound = false;

function rotRender() {
  rotArrayContainer.innerHTML = '';
  rotArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === rotLow) div.classList.add('pointer-low');
    if (i === rotMid) div.classList.add('pointer-mid');
    if (i === rotHigh) div.classList.add('pointer-high');
    if (rotFound && i === rotMid) div.classList.add('pair-found');
    rotArrayContainer.appendChild(div);
  });
  rotInfo.textContent = `low=${rotLow} high=${rotHigh} mid=${rotMid}`;
}

function rotStep() {
  if (rotLow > rotHigh) {
    rotInfo.textContent = 'target not found';
    rotPause();
    return;
  }
  rotMid = Math.floor((rotLow + rotHigh) / 2);
  rotRender();
  const midVal = rotArr[rotMid];
  if (midVal === rotTarget) {
    rotFound = true;
    rotRender();
    rotPause();
    return;
  }
  if (rotArr[rotLow] <= midVal) {
    if (rotTarget >= rotArr[rotLow] && rotTarget < midVal) {
      rotHigh = rotMid - 1;
    } else {
      rotLow = rotMid + 1;
    }
  } else {
    if (rotTarget > midVal && rotTarget <= rotArr[rotHigh]) {
      rotLow = rotMid + 1;
    } else {
      rotHigh = rotMid - 1;
    }
  }
}

function rotStart() {
  rotArr = rotArrayInput.value
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(v => !isNaN(v));
  rotTarget = parseInt(rotTargetInput.value, 10) || 0;
  rotLow = 0;
  rotHigh = rotArr.length - 1;
  rotMid = 0;
  rotFound = false;
  rotRender();
  rotPause();
  rotIntervalId = setInterval(rotStep, 1000);
}

function rotPause() {
  if (rotIntervalId) {
    clearInterval(rotIntervalId);
    rotIntervalId = null;
  }
}

function rotReset() {
  rotPause();
  rotLow = 0;
  rotHigh = rotArr.length - 1;
  rotMid = 0;
  rotFound = false;
  rotRender();
}

rotStartBtn.addEventListener('click', rotStart);
rotPauseBtn.addEventListener('click', rotPause);
rotResetBtn.addEventListener('click', rotReset);

rotRender();
