const csArrayInput = document.getElementById('csArrayInput');
const csStartBtn = document.getElementById('csStartBtn');
const csPauseBtn = document.getElementById('csPauseBtn');
const csResetBtn = document.getElementById('csResetBtn');
const csArrayContainer = document.getElementById('csArrayContainer');
const csCountContainer = document.getElementById('csCountContainer');
const csOutputContainer = document.getElementById('csOutputContainer');

let csIntervalId = null;
let csIndex = 0;
let csArr = [];
let csCounts = [];
let csOutput = [];
let csMaxVal = 9;

function csRender() {
  csArrayContainer.innerHTML = '';
  csArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === csIndex && csIndex < csArr.length) div.classList.add('active');
    csArrayContainer.appendChild(div);
  });

  csCountContainer.innerHTML = '';
  for (let i = 0; i <= csMaxVal; i++) {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = csCounts[i] || 0;
    csCountContainer.appendChild(div);
  }

  csOutputContainer.innerHTML = '';
  csOutput.forEach(val => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    csOutputContainer.appendChild(div);
  });
}

function csStep() {
  if (csIndex < csArr.length) {
    const val = csArr[csIndex];
    csCounts[val] = (csCounts[val] || 0) + 1;
    csIndex++;
    csRender();
    if (csIndex === csArr.length) {
      csOutput = [];
      for (let i = 0; i <= csMaxVal; i++) {
        for (let j = 0; j < (csCounts[i] || 0); j++) {
          csOutput.push(i);
        }
      }
    }
  } else {
    csPause();
  }
}

function csStart() {
  csArr = csArrayInput.value
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(v => !isNaN(v) && v >= 0 && v <= csMaxVal);
  csCounts = new Array(csMaxVal + 1).fill(0);
  csOutput = [];
  csIndex = 0;
  csRender();
  csPause();
  csIntervalId = setInterval(csStep, 800);
}

function csPause() {
  if (csIntervalId) {
    clearInterval(csIntervalId);
    csIntervalId = null;
  }
}

function csReset() {
  csPause();
  csIndex = 0;
  csCounts = new Array(csMaxVal + 1).fill(0);
  csOutput = [];
  csRender();
}

csStartBtn.addEventListener('click', csStart);
csPauseBtn.addEventListener('click', csPause);
csResetBtn.addEventListener('click', csReset);

csRender();
