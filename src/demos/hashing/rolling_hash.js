const rhTextInput = document.getElementById('rhTextInput');
const rhPatternInput = document.getElementById('rhPatternInput');
const rhStartBtn = document.getElementById('rhStartBtn');
const rhPauseBtn = document.getElementById('rhPauseBtn');
const rhResetBtn = document.getElementById('rhResetBtn');
const rhTextContainer = document.getElementById('rhTextContainer');
const rhPatternContainer = document.getElementById('rhPatternContainer');

let rhIntervalId = null;
let rhText = '';
let rhPattern = '';
let rhIndex = 0;
let rhPatLen = 0;
let rhTextHash = 0;
let rhPatternHash = 0;
let rhHighPow = 1;
const RH_BASE = 256;
const RH_MOD = 101;
let rhMatch = false;

function rhRender() {
    rhTextContainer.innerHTML = '';
    for (let i = 0; i < rhText.length; i++) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = rhText[i];
        if (i >= rhIndex && i < rhIndex + rhPatLen) {
            div.classList.add(rhMatch ? 'pair-found' : 'active');
        }
        rhTextContainer.appendChild(div);
    }
    rhPatternContainer.innerHTML = '';
    for (let c of rhPattern) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = c;
        rhPatternContainer.appendChild(div);
    }
}

function rhStep() {
    if (rhIndex > rhText.length - rhPatLen) {
        rhPause();
        return;
    }
    rhMatch = false;
    if (rhTextHash === rhPatternHash) {
        const substr = rhText.substr(rhIndex, rhPatLen);
        if (substr === rhPattern) {
            rhMatch = true;
            rhRender();
            rhPause();
            return;
        }
    }
    rhRender();
    const leftChar = rhText.charCodeAt(rhIndex);
    const rightChar = rhText.charCodeAt(rhIndex + rhPatLen) || 0;
    rhTextHash = (rhTextHash - leftChar * rhHighPow) % RH_MOD;
    if (rhTextHash < 0) rhTextHash += RH_MOD;
    rhTextHash = (rhTextHash * RH_BASE + rightChar) % RH_MOD;
    rhIndex++;
}

function rhStart() {
    rhText = rhTextInput.value || '';
    rhPattern = rhPatternInput.value || '';
    rhPatLen = rhPattern.length;
    rhIndex = 0;
    rhTextHash = 0;
    rhPatternHash = 0;
    rhHighPow = 1;
    for (let i = 0; i < rhPatLen; i++) {
        rhTextHash = (rhTextHash * RH_BASE + (rhText.charCodeAt(i) || 0)) % RH_MOD;
        rhPatternHash = (rhPatternHash * RH_BASE + rhPattern.charCodeAt(i)) % RH_MOD;
        if (i < rhPatLen - 1) {
            rhHighPow = (rhHighPow * RH_BASE) % RH_MOD;
        }
    }
    rhMatch = false;
    rhRender();
    rhPause();
    rhIntervalId = setInterval(rhStep, 800);
}

function rhPause() {
    if (rhIntervalId) {
        clearInterval(rhIntervalId);
        rhIntervalId = null;
    }
}

function rhReset() {
    rhPause();
    rhIndex = 0;
    rhMatch = false;
    rhRender();
}

rhStartBtn.addEventListener('click', rhStart);
rhPauseBtn.addEventListener('click', rhPause);
rhResetBtn.addEventListener('click', rhReset);

rhRender();
