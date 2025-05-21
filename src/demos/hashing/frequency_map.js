const fmInput = base.el('fmInput');
const fmStartBtn = base.el('fmStartBtn');
const fmPauseBtn = base.el('fmPauseBtn');
const fmResetBtn = base.el('fmResetBtn');
const fmTextContainer = base.el('fmTextContainer');
const fmMapContainer = base.el('fmMapContainer');

const fmState = { intervalId: null };
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
  base.play(fmState, fmStep, 500);
}

function fmPause() {
  base.pause(fmState);
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
