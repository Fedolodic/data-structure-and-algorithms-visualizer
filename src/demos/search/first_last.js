const flArrayInput = base.el('flArrayInput');
const flTargetInput = base.el('flTarget');
const flStartBtn = base.el('flStartBtn');
const flPauseBtn = base.el('flPauseBtn');
const flResetBtn = base.el('flResetBtn');
const flArrayContainer = base.el('flArrayContainer');
const flInfo = base.el('flInfo');

let arr = [];
let target = 0;
let low = 0;
let high = 0;
let mid = 0;
let phase = 'first';
let first = -1;
let last = -1;
const flState = { intervalId: null };

function render() {
  flArrayContainer.innerHTML = '';
  arr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === low) div.classList.add('pointer-low');
    if (i === mid) div.classList.add('pointer-mid');
    if (i === high) div.classList.add('pointer-high');
    flArrayContainer.appendChild(div);
  });
  flInfo.textContent = `phase=${phase} low=${low} high=${high} mid=${mid}`;
}

function step() {
  if (phase === 'first') {
    if (low > high) {
      first = arr[low] === target ? low : -1;
      phase = 'last';
      low = 0;
      high = arr.length - 1;
      mid = 0;
      render();
      return;
    }
    mid = Math.floor((low + high) / 2);
    render();
    if (arr[mid] >= target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  } else {
    if (low > high) {
      last = arr[high] === target ? high : -1;
      flInfo.textContent = `first=${first} last=${last}`;
      pause();
      return;
    }
    mid = Math.floor((low + high) / 2);
    render();
    if (arr[mid] <= target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
}

function start() {
  arr = flArrayInput.value
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(v => !isNaN(v))
    .sort((a, b) => a - b);
  target = parseInt(flTargetInput.value, 10) || 0;
  low = 0;
  high = arr.length - 1;
  mid = 0;
  first = -1;
  last = -1;
  phase = 'first';
  render();
  pause();
  if (arr.length > 0) base.play(flState, step, 1000);
}

function pause() {
  base.pause(flState);
}

function reset() {
  pause();
  low = 0;
  high = arr.length - 1;
  mid = 0;
  phase = 'first';
  flInfo.textContent = '';
  render();
}

flStartBtn.addEventListener('click', start);
flPauseBtn.addEventListener('click', pause);
flResetBtn.addEventListener('click', reset);

render();
