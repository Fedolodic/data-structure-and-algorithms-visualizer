const psArrayInput = document.getElementById('psArrayInput');
const psStartBtn = document.getElementById('psStartBtn');
const psPauseBtn = document.getElementById('psPauseBtn');
const psResetBtn = document.getElementById('psResetBtn');
const psArrayContainer = document.getElementById('psArrayContainer');
const psPrefixContainer = document.getElementById('psPrefixContainer');

let psIntervalId = null;
let psArr = [];
let prefixArr = [];
let psIndex = 0;

function psRender() {
    psArrayContainer.innerHTML = '';
    psPrefixContainer.innerHTML = '';

    psArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i === psIndex) {
            div.classList.add('active');
        }
        psArrayContainer.appendChild(div);
    });

    prefixArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i === psIndex) {
            div.classList.add('active');
        }
        psPrefixContainer.appendChild(div);
    });
}

function psStep() {
    if (psIndex === 0) {
        prefixArr[0] = psArr[0];
    } else {
        prefixArr[psIndex] = prefixArr[psIndex - 1] + psArr[psIndex];
    }
    psRender();
    psIndex++;
    if (psIndex >= psArr.length) {
        psPause();
    }
}

function psStart() {
    psArr = psArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    prefixArr = new Array(psArr.length).fill(0);
    psIndex = 0;
    psRender();
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
    prefixArr = new Array(psArr.length).fill(0);
    psRender();
}

psStartBtn.addEventListener('click', psStart);
psPauseBtn.addEventListener('click', psPause);
psResetBtn.addEventListener('click', psReset);

psRender();

