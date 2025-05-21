const bsArrayInput = document.getElementById('bsArrayInput');
const bsTargetInput = document.getElementById('bsTarget');
const bsStartBtn = document.getElementById('bsStartBtn');
const bsPauseBtn = document.getElementById('bsPauseBtn');
const bsResetBtn = document.getElementById('bsResetBtn');
const bsArrayContainer = document.getElementById('bsArrayContainer');
const bsInfo = document.getElementById('bsInfo');

let bsArr = [];
let target = 0;
let low = 0;
let high = 0;
let mid = 0;
let bsIntervalId = null;

function bsRender() {
    bsArrayContainer.innerHTML = '';
    bsArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i === low) div.classList.add('pointer-low');
        if (i === mid) div.classList.add('pointer-mid');
        if (i === high - 1) div.classList.add('pointer-high');
        bsArrayContainer.appendChild(div);
    });
    bsInfo.textContent = `low=${low} high=${high} mid=${mid}`;
}

function bsStep() {
    if (low >= high) {
        bsInfo.textContent = `lower bound index: ${low}`;
        bsPause();
        return;
    }
    mid = Math.floor((low + high) / 2);
    bsRender();
    if (bsArr[mid] < target) {
        low = mid + 1;
    } else {
        high = mid;
    }
}

function bsStart() {
    bsArr = bsArrayInput.value
        .split(',')
        .map(s => parseInt(s.trim(), 10))
        .filter(v => !isNaN(v))
        .sort((a, b) => a - b);
    target = parseInt(bsTargetInput.value, 10) || 0;
    low = 0;
    high = bsArr.length;
    mid = 0;
    bsRender();
    bsPause();
    bsIntervalId = setInterval(bsStep, 1000);
}

function bsPause() {
    if (bsIntervalId) {
        clearInterval(bsIntervalId);
        bsIntervalId = null;
    }
}

function bsReset() {
    bsPause();
    low = 0;
    high = bsArr.length;
    mid = 0;
    bsRender();
}

bsStartBtn.addEventListener('click', bsStart);
bsPauseBtn.addEventListener('click', bsPause);
bsResetBtn.addEventListener('click', bsReset);

bsRender();
