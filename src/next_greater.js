const ngeArrayInput = document.getElementById('ngeArrayInput');
const ngeStartBtn = document.getElementById('ngeStartBtn');
const ngePauseBtn = document.getElementById('ngePauseBtn');
const ngeResetBtn = document.getElementById('ngeResetBtn');
const ngeArrayContainer = document.getElementById('ngeArrayContainer');
const ngeStackContainer = document.getElementById('ngeStackContainer');
const ngeResultContainer = document.getElementById('ngeResultContainer');

let ngeIntervalId = null;
let ngeArr = [];
let ngeStack = [];
let ngeRes = [];
let ngeIndex = 0;

function ngeRender() {
    ngeArrayContainer.innerHTML = '';
    ngeArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i === ngeIndex) div.classList.add('active');
        ngeArrayContainer.appendChild(div);
    });

    ngeStackContainer.innerHTML = '';
    ngeStack.slice().reverse().forEach(val => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        ngeStackContainer.appendChild(div);
    });

    ngeResultContainer.innerHTML = '';
    ngeRes.forEach(val => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val === undefined ? '' : val;
        ngeResultContainer.appendChild(div);
    });
}

function ngeStep() {
    while (ngeStack.length && ngeStack[ngeStack.length - 1] <= ngeArr[ngeIndex]) {
        ngeStack.pop();
    }
    ngeRes[ngeIndex] = ngeStack.length ? ngeStack[ngeStack.length - 1] : -1;
    ngeStack.push(ngeArr[ngeIndex]);
    ngeRender();
    ngeIndex--;
    if (ngeIndex < 0) {
        ngePause();
    }
}

function ngeStart() {
    ngeArr = ngeArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    ngeRes = new Array(ngeArr.length);
    ngeStack = [];
    ngeIndex = ngeArr.length - 1;
    ngeRender();
    ngePause();
    ngeIntervalId = setInterval(ngeStep, 800);
}

function ngePause() {
    if (ngeIntervalId) {
        clearInterval(ngeIntervalId);
        ngeIntervalId = null;
    }
}

function ngeReset() {
    ngePause();
    ngeIndex = ngeArr.length - 1;
    ngeStack = [];
    ngeRes = new Array(ngeArr.length);
    ngeRender();
}

ngeStartBtn.addEventListener('click', ngeStart);
ngePauseBtn.addEventListener('click', ngePause);
ngeResetBtn.addEventListener('click', ngeReset);

ngeRender();
