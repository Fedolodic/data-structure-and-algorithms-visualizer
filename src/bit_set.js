const bsArrayInput = document.getElementById('bsArrayInput');
const bsStartBtn = document.getElementById('bsStartBtn');
const bsPauseBtn = document.getElementById('bsPauseBtn');
const bsResetBtn = document.getElementById('bsResetBtn');
const bsArrayContainer = document.getElementById('bsArrayContainer');
const bsBitContainer = document.getElementById('bsBitContainer');

let bsIntervalId = null;
let bsIndex = 0;
let bsArr = [];
const BS_MAX = 15;
let bsBits = 0;

function bsRender() {
  bsArrayContainer.innerHTML = '';
  bsArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === bsIndex && bsIndex < bsArr.length) div.classList.add('active');
    bsArrayContainer.appendChild(div);
  });

  bsBitContainer.innerHTML = '';
  for (let i = 0; i <= BS_MAX; i++) {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = (bsBits >> i) & 1;
    bsBitContainer.appendChild(div);
  }
}

function bsStep() {
  if (bsIndex < bsArr.length) {
    const val = bsArr[bsIndex];
    if (val >= 0 && val <= BS_MAX) {
      bsBits |= 1 << val;
    }
    bsIndex++;
    bsRender();
  } else {
    bsPause();
  }
}

function bsStart() {
  bsArr = bsArrayInput.value
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(v => !isNaN(v));
  bsBits = 0;
  bsIndex = 0;
  bsRender();
  bsPause();
  bsIntervalId = setInterval(bsStep, 800);
}

function bsPause() {
  if (bsIntervalId) {
    clearInterval(bsIntervalId);
    bsIntervalId = null;
  }
}

function bsReset() {
  bsPause();
  bsBits = 0;
  bsIndex = 0;
  bsRender();
}

bsStartBtn.addEventListener('click', bsStart);
bsPauseBtn.addEventListener('click', bsPause);
bsResetBtn.addEventListener('click', bsReset);

bsRender();
