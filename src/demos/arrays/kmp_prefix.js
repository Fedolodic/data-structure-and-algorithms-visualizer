const kmpInput = base.el('kmpInput');
const kmpStartBtn = base.el('kmpStartBtn');
const kmpPauseBtn = base.el('kmpPauseBtn');
const kmpResetBtn = base.el('kmpResetBtn');
const kmpStringContainer = base.el('kmpStringContainer');
const kmpValuesContainer = base.el('kmpValuesContainer');

const kmpState = { intervalId: null };
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
    base.play(kmpState, kmpStep, 800);
}

function kmpPause() {
  base.pause(kmpState);
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
