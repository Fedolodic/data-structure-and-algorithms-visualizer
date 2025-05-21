const stArrayInput = base.el('stArrayInput');
const stLeftInput = base.el('stLeft');
const stRightInput = base.el('stRight');
const stStartBtn = base.el('stStartBtn');
const stPauseBtn = base.el('stPauseBtn');
const stResetBtn = base.el('stResetBtn');
const stArrayContainer = base.el('stArrayContainer');
const stResultContainer = base.el('stResultContainer');

const stState = { intervalId: null };
let stArr = [];
let stTable = null;
let stL = 0;
let stR = 0;
let stStepIndex = 0;

function buildSparseTable(arr) {
    const n = arr.length;
    const log = new Array(n + 1).fill(0);
    for (let i = 2; i <= n; i++) log[i] = log[Math.floor(i / 2)] + 1;
    const K = log[n] + 1;
    const table = Array.from({ length: K }, () => new Array(n).fill(Infinity));
    for (let i = 0; i < n; i++) table[0][i] = arr[i];
    for (let k = 1; k < K; k++) {
        for (let i = 0; i + (1 << k) <= n; i++) {
            table[k][i] = Math.min(table[k - 1][i], table[k - 1][i + (1 << (k - 1))]);
        }
    }
    return { table, log };
}

function sparseTableQuery(st, l, r) {
    const { table, log } = st;
    const k = log[r - l + 1];
    return Math.min(table[k][l], table[k][r - (1 << k) + 1]);
}

function stRender() {
    stArrayContainer.innerHTML = '';
    stArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i >= stL && i <= stR) div.classList.add('active');
        stArrayContainer.appendChild(div);
    });
}

function stStep() {
    if (stStepIndex === 0) {
        stStepIndex = 1;
    } else {
        const result = sparseTableQuery(stTable, stL, stR);
        stResultContainer.textContent = 'Min: ' + result;
        stPause();
    }
}

function stStart() {
    stArr = stArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    stL = parseInt(stLeftInput.value, 10) || 0;
    stR = parseInt(stRightInput.value, 10) || 0;
    if (stL > stR) [stL, stR] = [stR, stL];
    stTable = buildSparseTable(stArr);
    stResultContainer.textContent = '';
    stStepIndex = 0;
    stRender();
    stPause();
    base.play(stState, stStep, 1000);
}

function stPause() {
  base.pause(stState);
}

function stReset() {
    stPause();
    stStepIndex = 0;
    stResultContainer.textContent = '';
    stRender();
}

stStartBtn.addEventListener('click', stStart);
stPauseBtn.addEventListener('click', stPause);
stResetBtn.addEventListener('click', stReset);

stRender();
