const kmpInput = document.getElementById('kmpInput');
const kmpStartBtn = document.getElementById('kmpStartBtn');
const kmpPauseBtn = document.getElementById('kmpPauseBtn');
const kmpResetBtn = document.getElementById('kmpResetBtn');
const kmpStringContainer = document.getElementById('kmpStringContainer');
const kmpValuesContainer = document.getElementById('kmpValuesContainer');

let kmpIntervalId = null;
let kmpStr = '';
let kmpPi = [];
let kmpIndex = 1;
let kmpJ = 0;

function kmpRender() {
    kmpStringContainer.innerHTML = '';
    for (let i = 0; i < kmpStr.length; i++) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = kmpStr[i];
        if (i === kmpIndex) div.classList.add('active');
        kmpStringContainer.appendChild(div);
    }
    kmpValuesContainer.innerHTML = '';
    for (let i = 0; i < kmpStr.length; i++) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = kmpPi[i] !== undefined ? kmpPi[i] : '';
        kmpValuesContainer.appendChild(div);
    }
}

function kmpStep() {
    if (kmpIndex >= kmpStr.length) {
        kmpPause();
        return;
    }
    while (kmpJ > 0 && kmpStr[kmpIndex] !== kmpStr[kmpJ]) {
        kmpJ = kmpPi[kmpJ - 1];
    }
    if (kmpStr[kmpIndex] === kmpStr[kmpJ]) {
        kmpJ++;
    }
    kmpPi[kmpIndex] = kmpJ;
    kmpRender();
    kmpIndex++;
}

function kmpStart() {
    kmpStr = kmpInput.value || '';
    kmpPi = new Array(kmpStr.length).fill(0);
    kmpIndex = 1;
    kmpJ = 0;
    kmpRender();
    kmpPause();
    kmpIntervalId = setInterval(kmpStep, 800);
}

function kmpPause() {
    if (kmpIntervalId) {
        clearInterval(kmpIntervalId);
        kmpIntervalId = null;
    }
}

function kmpReset() {
    kmpPause();
    kmpIndex = 1;
    kmpJ = 0;
    kmpPi = new Array(kmpStr.length).fill(0);
    kmpRender();
}

kmpStartBtn.addEventListener('click', kmpStart);
kmpPauseBtn.addEventListener('click', kmpPause);
kmpResetBtn.addEventListener('click', kmpReset);

kmpRender();
