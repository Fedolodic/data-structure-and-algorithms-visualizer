const zInput = base.el('zInput');
const zStartBtn = base.el('zStartBtn');
const zPauseBtn = base.el('zPauseBtn');
const zResetBtn = base.el('zResetBtn');
const zStringContainer = base.el('zStringContainer');
const zValuesContainer = base.el('zValuesContainer');

const zState = { intervalId: null };
let zStr = '';
let zArr = [];
let zL = 0;
let zR = 0;
let zIndex = 1;

function zRender() {
    zStringContainer.innerHTML = '';
    for (let i = 0; i < zStr.length; i++) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = zStr[i];
        if (i === zIndex) div.classList.add('active');
        zStringContainer.appendChild(div);
    }
    zValuesContainer.innerHTML = '';
    for (let i = 0; i < zStr.length; i++) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = (zArr[i] !== undefined) ? zArr[i] : '';
        zValuesContainer.appendChild(div);
    }
}

function zStep() {
    if (zIndex >= zStr.length) {
        zPause();
        return;
    }
    if (zIndex <= zR) {
        zArr[zIndex] = Math.min(zR - zIndex + 1, zArr[zIndex - zL]);
    } else {
        zArr[zIndex] = 0;
    }
    while (zIndex + zArr[zIndex] < zStr.length && zStr[zArr[zIndex]] === zStr[zIndex + zArr[zIndex]]) {
        zArr[zIndex]++;
    }
    if (zIndex + zArr[zIndex] - 1 > zR) {
        zL = zIndex;
        zR = zIndex + zArr[zIndex] - 1;
    }
    zRender();
    zIndex++;
}

function zStart() {
    zStr = zInput.value || '';
    zArr = new Array(zStr.length);
    zL = 0;
    zR = 0;
    zIndex = 1;
    zRender();
    zPause();
    base.play(zState, zStep, 800);
}

function zPause() {
  base.pause(zState);
}

function zReset() {
    zPause();
    zIndex = 1;
    zArr = new Array(zStr.length);
    zL = 0;
    zR = 0;
    zRender();
}

zStartBtn.addEventListener('click', zStart);
zPauseBtn.addEventListener('click', zPause);
zResetBtn.addEventListener('click', zReset);

zRender();
