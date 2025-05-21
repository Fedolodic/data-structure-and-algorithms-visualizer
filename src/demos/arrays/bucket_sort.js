const bsArrayInput = base.el('bsArrayInput');
const bsStartBtn = base.el('bsStartBtn');
const bsPauseBtn = base.el('bsPauseBtn');
const bsResetBtn = base.el('bsResetBtn');
const bsArrayContainer = base.el('bsArrayContainer');
const bsBucketsContainer = base.el('bsBucketsContainer');
const bsOutputContainer = base.el('bsOutputContainer');

const bsState = { intervalId: null };
let bsIndex = 0;
let bsArr = [];
let bsBuckets = [];
let bsOutput = [];
const bsBucketSize = 10; // range size per bucket

function bsRender() {
  bsArrayContainer.innerHTML = '';
  bsArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === bsIndex && bsIndex < bsArr.length) div.classList.add('active');
    bsArrayContainer.appendChild(div);
  });

  bsBucketsContainer.innerHTML = '';
  bsBuckets.forEach((bucket, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = '[' + bucket.join(',') + ']';
    bsBucketsContainer.appendChild(div);
  });

  bsOutputContainer.innerHTML = '';
  bsOutput.forEach(val => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    bsOutputContainer.appendChild(div);
  });
}

function bsStep() {
  if (bsIndex < bsArr.length) {
    const val = bsArr[bsIndex];
    const idx = Math.floor(val / bsBucketSize);
    bsBuckets[idx].push(val);
    bsIndex++;
    bsRender();
    if (bsIndex === bsArr.length) {
      bsBuckets.forEach(b => b.sort((a, b) => a - b));
      bsOutput = bsBuckets.flat();
    }
  } else {
    bsPause();
  }
}

function bsStart() {
  bsArr = bsArrayInput.value
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(v => !isNaN(v) && v >= 0 && v < 100);
  const bucketCount = Math.floor(100 / bsBucketSize);
  bsBuckets = Array.from({ length: bucketCount }, () => []);
  bsOutput = [];
  bsIndex = 0;
  bsRender();
  bsPause();
  base.play(bsState, bsStep, 800);
}

function bsPause() {
  base.pause(bsState);
}

function bsReset() {
  bsPause();
  bsIndex = 0;
  bsBuckets = bsBuckets.map(() => []);
  bsOutput = [];
  bsRender();
}

bsStartBtn.addEventListener('click', bsStart);
bsPauseBtn.addEventListener('click', bsPause);
bsResetBtn.addEventListener('click', bsReset);

bsRender();
