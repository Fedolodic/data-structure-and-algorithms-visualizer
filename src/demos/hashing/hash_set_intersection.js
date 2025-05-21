const hsiArray1Input = document.getElementById('hsiArray1Input');
const hsiArray2Input = document.getElementById('hsiArray2Input');
const hsiStartBtn = document.getElementById('hsiStartBtn');
const hsiPauseBtn = document.getElementById('hsiPauseBtn');
const hsiResetBtn = document.getElementById('hsiResetBtn');
const hsiArray1Container = document.getElementById('hsiArray1Container');
const hsiArray2Container = document.getElementById('hsiArray2Container');
const hsiResultContainer = document.getElementById('hsiResultContainer');

let hsiIntervalId = null;
let hsiIndex = 0;
let hsiArr1 = [];
let hsiArr2 = [];
let hsiSet = new Set();
let hsiResult = [];

function hsiRender() {
  hsiArray1Container.innerHTML = '';
  hsiArr1.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (hsiIndex === i) div.classList.add('active');
    hsiArray1Container.appendChild(div);
  });

  hsiArray2Container.innerHTML = '';
  hsiArr2.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (hsiIndex >= hsiArr1.length && (hsiIndex - hsiArr1.length) === i) {
      div.classList.add('active');
    }
    hsiArray2Container.appendChild(div);
  });

  hsiResultContainer.innerHTML = '';
  hsiResult.forEach(val => {
    const div = document.createElement('div');
    div.className = 'array-item pair-found';
    div.textContent = val;
    hsiResultContainer.appendChild(div);
  });
}

function hsiStep() {
  if (hsiIndex < hsiArr1.length) {
    hsiSet.add(hsiArr1[hsiIndex]);
  } else if (hsiIndex < hsiArr1.length + hsiArr2.length) {
    const idx = hsiIndex - hsiArr1.length;
    const val = hsiArr2[idx];
    if (hsiSet.has(val) && !hsiResult.includes(val)) {
      hsiResult.push(val);
    }
  } else {
    hsiPause();
    return;
  }
  hsiIndex++;
  hsiRender();
}

function hsiStart() {
  hsiArr1 = hsiArray1Input.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
  hsiArr2 = hsiArray2Input.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
  hsiSet = new Set();
  hsiResult = [];
  hsiIndex = 0;
  hsiRender();
  hsiPause();
  hsiIntervalId = setInterval(hsiStep, 800);
}

function hsiPause() {
  if (hsiIntervalId) {
    clearInterval(hsiIntervalId);
    hsiIntervalId = null;
  }
}

function hsiReset() {
  hsiPause();
  hsiSet = new Set();
  hsiResult = [];
  hsiIndex = 0;
  hsiRender();
}

hsiStartBtn.addEventListener('click', hsiStart);
hsiPauseBtn.addEventListener('click', hsiPause);
hsiResetBtn.addEventListener('click', hsiReset);

hsiRender();
