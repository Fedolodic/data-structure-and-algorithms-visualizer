const psArrayInput = document.getElementById('psArrayInput');
const psStartBtn = document.getElementById('psStartBtn');
const psPauseBtn = document.getElementById('psPauseBtn');
const psResetBtn = document.getElementById('psResetBtn');
const psOriginalContainer = document.getElementById('psOriginalContainer');
const psPrefixContainer = document.getElementById('psPrefixContainer');

let psIntervalId = null;
let psIndex = 0;
let psArr = [];
let psPrefixArr = [];
let psRunningSum = 0;

function psRenderArrays() {
    psOriginalContainer.innerHTML = '';
    psPrefixContainer.innerHTML = '';
    psArr.forEach((val, i) => {
        const origDiv = document.createElement('div');
        origDiv.className = 'array-item';
        origDiv.textContent = val;
        if (i === psIndex) {
            origDiv.classList.add('active');
        }
        psOriginalContainer.appendChild(origDiv);

        const prefixDiv = document.createElement('div');
        prefixDiv.className = 'array-item';
        prefixDiv.textContent = psPrefixArr[i] !== undefined ? psPrefixArr[i] : '';
        psPrefixContainer.appendChild(prefixDiv);
    });
}

function psStep() {
    psRunningSum += psArr[psIndex];
    psPrefixArr[psIndex] = psRunningSum;
    psRenderArrays();
    psIndex++;
    if (psIndex >= psArr.length) {
        psPause();
    }
}

function psStart() {
    psArr = psArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    psPrefixArr = new Array(psArr.length);
    psRunningSum = 0;
    psIndex = 0;
    psRenderArrays();
    psPause();
    psIntervalId = setInterval(psStep, 1000);
}

function psPause() {
    if (psIntervalId) {
        clearInterval(psIntervalId);
        psIntervalId = null;
    }
}

function psReset() {
    psPause();
    psIndex = 0;
    psRunningSum = 0;
    psPrefixArr = new Array(psArr.length);
    psRenderArrays();
}

psStartBtn.addEventListener('click', psStart);
psPauseBtn.addEventListener('click', psPause);
psResetBtn.addEventListener('click', psReset);

psRenderArrays();
