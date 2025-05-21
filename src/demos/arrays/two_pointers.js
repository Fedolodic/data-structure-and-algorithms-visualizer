const tpArrayInput = document.getElementById('tpArrayInput');
const tpTargetInput = document.getElementById('tpTarget');
const tpStartBtn = document.getElementById('tpStartBtn');
const tpPauseBtn = document.getElementById('tpPauseBtn');
const tpResetBtn = document.getElementById('tpResetBtn');
const tpArrayContainer = document.getElementById('tpArrayContainer');

let tpIntervalId = null;
let left = 0;
let right = 0;
let tpArr = [];
let target = 0;
let found = false;

function tpRenderArray() {
    tpArrayContainer.innerHTML = '';
    tpArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (found && (i === left || i === right)) {
            div.classList.add('pair-found');
        } else if (i === left) {
            div.classList.add('pointer-left');
        } else if (i === right) {
            div.classList.add('pointer-right');
        }
        tpArrayContainer.appendChild(div);
    });
}

function tpStep() {
    tpRenderArray();
    if (found) {
        tpPause();
        return;
    }
    const sum = tpArr[left] + tpArr[right];
    if (sum === target) {
        found = true;
    } else if (sum < target) {
        left++;
    } else {
        right--;
    }
    if (left >= right) {
        tpPause();
    }
}

function tpStart() {
    tpArr = tpArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    tpArr.sort((a, b) => a - b);
    target = parseInt(tpTargetInput.value, 10) || 0;
    left = 0;
    right = tpArr.length - 1;
    found = false;
    tpRenderArray();
    tpPause();
    tpIntervalId = setInterval(tpStep, 1000);
}

function tpPause() {
    if (tpIntervalId) {
        clearInterval(tpIntervalId);
        tpIntervalId = null;
    }
}

function tpReset() {
    tpPause();
    left = 0;
    right = tpArr.length - 1;
    found = false;
    tpRenderArray();
}

tpStartBtn.addEventListener('click', tpStart);
tpPauseBtn.addEventListener('click', tpPause);
tpResetBtn.addEventListener('click', tpReset);

tpRenderArray();
