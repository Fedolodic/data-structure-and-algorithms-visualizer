const swcTextInput = document.getElementById('swcTextInput');
const swcPatternInput = document.getElementById('swcPatternInput');
const swcStartBtn = document.getElementById('swcStartBtn');
const swcPauseBtn = document.getElementById('swcPauseBtn');
const swcResetBtn = document.getElementById('swcResetBtn');
const swcTextContainer = document.getElementById('swcTextContainer');
const swcMapContainer = document.getElementById('swcMapContainer');

let swcIntervalId = null;
let swcIndex = 0;
let swcText = '';
let swcPattern = '';
let swcNeed = {};
let swcWindow = {};
let swcMatches = 0;
let swcRequired = 0;
let swcFound = false;

function swcRender() {
  swcTextContainer.innerHTML = '';
  for (let i = 0; i < swcText.length; i++) {
    const span = document.createElement('span');
    span.className = 'array-item';
    span.textContent = swcText[i];
    if (i >= swcIndex - swcPattern.length + 1 && i <= swcIndex) {
      span.classList.add('active');
    }
    if (swcFound && i > swcIndex - swcPattern.length && i <= swcIndex) {
      span.classList.add('pair-found');
    }
    swcTextContainer.appendChild(span);
  }
  swcMapContainer.innerHTML = '';
  Object.keys(swcWindow).sort().forEach(k => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = `${k}:${swcWindow[k]}`;
    swcMapContainer.appendChild(div);
  });
}

function swcStep() {
  if (swcIndex >= swcText.length) {
    swcPause();
    return;
  }
  const ch = swcText[swcIndex];
  swcWindow[ch] = (swcWindow[ch] || 0) + 1;
  if (swcNeed[ch] && swcWindow[ch] === swcNeed[ch]) swcMatches++;

  if (swcIndex >= swcPattern.length) {
    const leftChar = swcText[swcIndex - swcPattern.length];
    if (swcNeed[leftChar] && swcWindow[leftChar] === swcNeed[leftChar]) swcMatches--;
    swcWindow[leftChar]--;
    if (swcWindow[leftChar] === 0) delete swcWindow[leftChar];
  }

  if (swcMatches === swcRequired) swcFound = true;
  swcRender();
  swcIndex++;
  if (swcIndex >= swcText.length) swcPause();
}

function swcStart() {
  swcText = swcTextInput.value;
  swcPattern = swcPatternInput.value;
  swcNeed = {};
  for (const ch of swcPattern) {
    swcNeed[ch] = (swcNeed[ch] || 0) + 1;
  }
  swcWindow = {};
  swcMatches = 0;
  swcRequired = Object.keys(swcNeed).length;
  swcIndex = 0;
  swcFound = false;
  swcRender();
  swcPause();
  swcIntervalId = setInterval(swcStep, 800);
}

function swcPause() {
  if (swcIntervalId) {
    clearInterval(swcIntervalId);
    swcIntervalId = null;
  }
}

function swcReset() {
  swcPause();
  swcIndex = 0;
  swcWindow = {};
  swcMatches = 0;
  swcFound = false;
  swcRender();
}

swcStartBtn.addEventListener('click', swcStart);
swcPauseBtn.addEventListener('click', swcPause);
swcResetBtn.addEventListener('click', swcReset);

swcRender();
