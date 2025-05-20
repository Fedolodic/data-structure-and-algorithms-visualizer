const fmInput = document.getElementById('fmInput');
const fmStartBtn = document.getElementById('fmStartBtn');
const fmPauseBtn = document.getElementById('fmPauseBtn');
const fmResetBtn = document.getElementById('fmResetBtn');
const fmTextContainer = document.getElementById('fmTextContainer');
const fmMapContainer = document.getElementById('fmMapContainer');

let fmIntervalId = null;
let fmIndex = 0;
let fmStr = '';
let fmMap = {};

function fmRender() {
  fmTextContainer.innerHTML = '';
  for (let i = 0; i < fmStr.length; i++) {
    const span = document.createElement('span');
    span.className = 'array-item';
    span.textContent = fmStr[i];
    if (i === fmIndex) {
      span.classList.add('active');
    }
    fmTextContainer.appendChild(span);
  }
  fmMapContainer.innerHTML = '';
  Object.entries(fmMap).forEach(([ch, count]) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = `${ch}:${count}`;
    fmMapContainer.appendChild(div);
  });
}

function fmStep() {
  if (fmIndex >= fmStr.length) {
    fmPause();
    return;
  }
  const ch = fmStr[fmIndex];
  fmMap[ch] = (fmMap[ch] || 0) + 1;
  fmIndex++;
  fmRender();
}

function fmStart() {
  fmStr = fmInput.value;
  fmIndex = 0;
  fmMap = {};
  fmRender();
  fmPause();
  fmIntervalId = setInterval(fmStep, 500);
}

function fmPause() {
  if (fmIntervalId) {
    clearInterval(fmIntervalId);
    fmIntervalId = null;
  }
}

function fmReset() {
  fmPause();
  fmIndex = 0;
  fmMap = {};
  fmRender();
}

fmStartBtn.addEventListener('click', fmStart);
fmPauseBtn.addEventListener('click', fmPause);
fmResetBtn.addEventListener('click', fmReset);

fmRender();
