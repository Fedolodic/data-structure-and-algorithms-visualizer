const rleInput = base.el('rleInput');
const rleStartBtn = base.el('rleStartBtn');
const rlePauseBtn = base.el('rlePauseBtn');
const rleResetBtn = base.el('rleResetBtn');
const rleOriginalContainer = base.el('rleOriginalContainer');
const rleEncodedContainer = base.el('rleEncodedContainer');

const rleState = { intervalId: null };
let rleIndex = 0;
let rleStr = '';
let rleOutput = '';
let rleCount = 0;

function rleRender() {
    rleOriginalContainer.innerHTML = '';
    for (let i = 0; i < rleStr.length; i++) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = rleStr[i];
        if (i === rleIndex) {
            div.classList.add('active');
        }
        rleOriginalContainer.appendChild(div);
    }
    rleEncodedContainer.textContent = rleOutput + (rleCount > 0 ? rleStr[rleIndex] + rleCount : '');
}

function rleStep() {
    const char = rleStr[rleIndex];
    if (rleIndex === 0 || char === rleStr[rleIndex - 1]) {
        rleCount++;
    } else {
        rleOutput += rleStr[rleIndex - 1] + rleCount;
        rleCount = 1;
    }
    rleRender();
    rleIndex++;
    if (rleIndex >= rleStr.length) {
        rleOutput += rleStr[rleIndex - 1] + rleCount;
        rleRender();
        rlePause();
    }
}

function rleStart() {
    rleStr = rleInput.value || '';
    rleOutput = '';
    rleCount = 0;
    rleIndex = 0;
    rleRender();
    rlePause();
    base.play(rleState, rleStep, 800);
}

function rlePause() {
  base.pause(rleState);
}

function rleReset() {
    rlePause();
    rleIndex = 0;
    rleOutput = '';
    rleCount = 0;
    rleRender();
}

rleStartBtn.addEventListener('click', rleStart);
rlePauseBtn.addEventListener('click', rlePause);
rleResetBtn.addEventListener('click', rleReset);

rleRender();
