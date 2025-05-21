const peArrayInput = document.getElementById('peArrayInput');
const peStartBtn = document.getElementById('peStartBtn');
const pePauseBtn = document.getElementById('pePauseBtn');
const peResetBtn = document.getElementById('peResetBtn');
const peArrayContainer = document.getElementById('peArrayContainer');
const peInfo = document.getElementById('peInfo');

let peArr = [];
let peLow = 0;
let peHigh = 0;
let peMid = 0;
let peIntervalId = null;

function peRender() {
  peArrayContainer.innerHTML = '';
  peArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === peLow) div.classList.add('pointer-low');
    if (i === peMid) div.classList.add('pointer-mid');
    if (i === peHigh) div.classList.add('pointer-high');
    peArrayContainer.appendChild(div);
  });
  peInfo.textContent = `low=${peLow} high=${peHigh} mid=${peMid}`;
}

function peStep() {
  if (peLow === peHigh) {
    peInfo.textContent = `peak index: ${peLow} value: ${peArr[peLow]}`;
    pePause();
    return;
  }
  peMid = Math.floor((peLow + peHigh) / 2);
  peRender();
  if (peArr[peMid] < peArr[peMid + 1]) {
    peLow = peMid + 1;
  } else {
    peHigh = peMid;
  }
}

function peStart() {
  peArr = peArrayInput.value
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(v => !isNaN(v));
  peLow = 0;
  peHigh = peArr.length - 1;
  peMid = 0;
  peRender();
  pePause();
  peIntervalId = setInterval(peStep, 1000);
}

function pePause() {
  if (peIntervalId) {
    clearInterval(peIntervalId);
    peIntervalId = null;
  }
}

function peReset() {
  pePause();
  peLow = 0;
  peHigh = peArr.length - 1;
  peMid = 0;
  peRender();
}

peStartBtn.addEventListener('click', peStart);
pePauseBtn.addEventListener('click', pePause);
peResetBtn.addEventListener('click', peReset);

peRender();
