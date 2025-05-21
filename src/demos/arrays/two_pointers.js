const tpArrayInput = base.el('tpArrayInput');
const tpTargetInput = base.el('tpTarget');
const tpStartBtn = base.el('tpStartBtn');
const tpPauseBtn = base.el('tpPauseBtn');
const tpResetBtn = base.el('tpResetBtn');
const tpArrayContainer = base.el('tpArrayContainer');

const tpState = { intervalId: null };
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
    base.play(tpState, tpStep, 1000);
}

function tpPause() {
  base.pause(tpState);
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
