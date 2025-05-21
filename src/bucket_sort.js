const bsArrayInput = document.getElementById('bsArrayInput');
const bsStartBtn = document.getElementById('bsStartBtn');
const bsPauseBtn = document.getElementById('bsPauseBtn');
const bsResetBtn = document.getElementById('bsResetBtn');
const bsArrayContainer = document.getElementById('bsArrayContainer');
const bsBucketsContainer = document.getElementById('bsBucketsContainer');
const bsOutputContainer = document.getElementById('bsOutputContainer');

let bsIntervalId = null;
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
  bsIntervalId = setInterval(bsStep, 800);
}

function bsPause() {
  if (bsIntervalId) {
    clearInterval(bsIntervalId);
    bsIntervalId = null;
  }
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
