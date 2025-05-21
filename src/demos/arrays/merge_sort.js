const msArrayInput = document.getElementById('msArrayInput');
const msStartBtn = document.getElementById('msStartBtn');
const msPauseBtn = document.getElementById('msPauseBtn');
const msResetBtn = document.getElementById('msResetBtn');
const msArrayContainer = document.getElementById('msArrayContainer');

let msArr = [];
let msSize = 1;
let msStartIndex = 0;
let msIntervalId = null;
let msActiveStart = -1;
let msActiveEnd = -1;

function msRender() {
  msArrayContainer.innerHTML = '';
  msArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i >= msActiveStart && i < msActiveEnd) div.classList.add('active');
    msArrayContainer.appendChild(div);
  });
}

function merge(start, mid, end) {
  const left = msArr.slice(start, mid);
  const right = msArr.slice(mid, end);
  let i = 0, j = 0, k = start;
  while (i < left.length && j < right.length) {
    msArr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
  }
  while (i < left.length) msArr[k++] = left[i++];
  while (j < right.length) msArr[k++] = right[j++];
}

function msStep() {
  if (msSize >= msArr.length) {
    msPause();
    return;
  }
  if (msStartIndex < msArr.length) {
    const mid = Math.min(msStartIndex + msSize, msArr.length);
    const end = Math.min(msStartIndex + 2 * msSize, msArr.length);
    msActiveStart = msStartIndex;
    msActiveEnd = end;
    merge(msStartIndex, mid, end);
    msStartIndex += 2 * msSize;
  } else {
    msStartIndex = 0;
    msSize *= 2;
  }
  msRender();
}

function msStart() {
  msArr = msArrayInput.value
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(v => !isNaN(v));
  msSize = 1;
  msStartIndex = 0;
  msActiveStart = -1;
  msActiveEnd = -1;
  msRender();
  msPause();
  if (msArr.length > 1) msIntervalId = setInterval(msStep, 800);
}

function msPause() {
  if (msIntervalId) {
    clearInterval(msIntervalId);
    msIntervalId = null;
  }
}

function msReset() {
  msPause();
  msSize = 1;
  msStartIndex = 0;
  msActiveStart = -1;
  msActiveEnd = -1;
  msRender();
}

msStartBtn.addEventListener('click', msStart);
msPauseBtn.addEventListener('click', msPause);
msResetBtn.addEventListener('click', msReset);

msRender();
