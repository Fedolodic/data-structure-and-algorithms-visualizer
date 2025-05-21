const rsArrayInput = document.getElementById('rsArrayInput');
const rsStartBtn = document.getElementById('rsStartBtn');
const rsPauseBtn = document.getElementById('rsPauseBtn');
const rsResetBtn = document.getElementById('rsResetBtn');
const rsArrayContainer = document.getElementById('rsArrayContainer');
const rsBucketsContainer = document.getElementById('rsBucketsContainer');
const rsPseudo = document.getElementById('rsPseudo');

let rsIntervalId = null;
let rsIndex = 0;
let rsArr = [];
let rsBuckets = [];
let rsExp = 1;
let rsMax = 0;

rsPseudo.textContent =
`for exp = 1; max/exp > 0; exp *= 10
    place numbers into buckets by (num/exp) % 10
    concatenate buckets back into array`;

function rsRender() {
  rsArrayContainer.innerHTML = '';
  rsArr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = val;
    if (i === rsIndex && rsIndex < rsArr.length) div.classList.add('active');
    rsArrayContainer.appendChild(div);
  });

  rsBucketsContainer.innerHTML = '';
  rsBuckets.forEach(bucket => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = '[' + bucket.join(',') + ']';
    rsBucketsContainer.appendChild(div);
  });
}

function rsStep() {
  if (rsExp > rsMax) {
    rsPause();
    return;
  }
  if (rsIndex < rsArr.length) {
    const val = rsArr[rsIndex];
    const digit = Math.floor(val / rsExp) % 10;
    rsBuckets[digit].push(val);
    rsIndex++;
    rsRender();
    if (rsIndex === rsArr.length) {
      rsArr = rsBuckets.flat();
      rsBuckets = Array.from({ length: 10 }, () => []);
      rsIndex = 0;
      rsExp *= 10;
      rsRender();
    }
  }
}

function rsStart() {
  rsArr = rsArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v) && v >= 0);
  rsMax = Math.max(...rsArr, 0);
  rsBuckets = Array.from({ length: 10 }, () => []);
  rsIndex = 0;
  rsExp = 1;
  rsRender();
  rsPause();
  rsIntervalId = setInterval(rsStep, 800);
}

function rsPause() {
  if (rsIntervalId) {
    clearInterval(rsIntervalId);
    rsIntervalId = null;
  }
}

function rsReset() {
  rsPause();
  rsBuckets = Array.from({ length: 10 }, () => []);
  rsIndex = 0;
  rsExp = 1;
  rsRender();
}

rsStartBtn.addEventListener('click', rsStart);
rsPauseBtn.addEventListener('click', rsPause);
rsResetBtn.addEventListener('click', rsReset);

rsRender();
