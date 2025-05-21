const pshArrayInput = base.el('pshArrayInput');
const pshTargetInput = base.el('pshTarget');
const pshStartBtn = base.el('pshStartBtn');
const pshPauseBtn = base.el('pshPauseBtn');
const pshResetBtn = base.el('pshResetBtn');
const pshArrayContainer = base.el('pshArrayContainer');
const pshPrefixContainer = base.el('pshPrefixContainer');
const pshMapContainer = base.el('pshMapContainer');

const pshState = { intervalId: null };
let pshIndex = 0;
let pshArr = [];
let pshTarget = 0;
let pshPrefix = 0;
let pshMap = {0:1};
let pshFound = false;

function pshRender() {
  pshArrayContainer.innerHTML = '';
  pshArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === pshIndex) div.classList.add('active');
    if (pshFound && i === pshIndex) div.classList.add('pair-found');
    pshArrayContainer.appendChild(div);
  });

  pshPrefixContainer.innerHTML = 'Prefix Sum: ' + pshPrefix;

  pshMapContainer.innerHTML = '';
  Object.keys(pshMap).forEach(key => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = key + ':' + pshMap[key];
    pshMapContainer.appendChild(div);
  });
}

function pshStep() {
  if (pshIndex >= pshArr.length || pshFound) {
    pshPause();
    return;
  }
  pshPrefix += pshArr[pshIndex];
  if (pshMap[pshPrefix - pshTarget]) {
    pshFound = true;
  }
  pshMap[pshPrefix] = (pshMap[pshPrefix] || 0) + 1;
  pshRender();
  pshIndex++;
  if (pshIndex >= pshArr.length) {
    pshPause();
  }
}

function pshStart() {
  pshArr = pshArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
  pshTarget = parseInt(pshTargetInput.value, 10) || 0;
  pshIndex = 0;
  pshPrefix = 0;
  pshMap = {0:1};
  pshFound = false;
  pshRender();
  pshPause();
  base.play(pshState, pshStep, 800);
}

function pshPause() {
  base.pause(pshState);
}

function pshReset() {
  pshPause();
  pshIndex = 0;
  pshPrefix = 0;
  pshMap = {0:1};
  pshFound = false;
  pshRender();
}

pshStartBtn.addEventListener('click', pshStart);
pshPauseBtn.addEventListener('click', pshPause);
pshResetBtn.addEventListener('click', pshReset);

pshRender();
