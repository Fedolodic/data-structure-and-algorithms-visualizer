const hmtsArrayInput = document.getElementById('hmtsArrayInput');
const hmtsTargetInput = document.getElementById('hmtsTarget');
const hmtsStartBtn = document.getElementById('hmtsStartBtn');
const hmtsPauseBtn = document.getElementById('hmtsPauseBtn');
const hmtsResetBtn = document.getElementById('hmtsResetBtn');
const hmtsArrayContainer = document.getElementById('hmtsArrayContainer');
const hmtsSeenContainer = document.getElementById('hmtsSeenContainer');

let hmtsIntervalId = null;
let hmtsIndex = 0;
let hmtsArr = [];
let hmtsTarget = 0;
let hmtsSeen = new Set();
let hmtsFoundPair = null;

function hmtsRender() {
    hmtsArrayContainer.innerHTML = '';
    hmtsArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i === hmtsIndex) div.classList.add('active');
        if (hmtsFoundPair && (val === hmtsFoundPair[0] || val === hmtsFoundPair[1])) {
            div.classList.add('pair-found');
        }
        hmtsArrayContainer.appendChild(div);
    });

    hmtsSeenContainer.innerHTML = '';
    hmtsSeen.forEach(val => {
        const div = document.createElement('div');
        div.className = 'array-item seen-item';
        div.textContent = val;
        hmtsSeenContainer.appendChild(div);
    });
}

function hmtsStep() {
    const current = hmtsArr[hmtsIndex];
    const complement = hmtsTarget - current;
    if (hmtsSeen.has(complement)) {
        hmtsFoundPair = [current, complement];
        hmtsRender();
        hmtsPause();
        return;
    }
    hmtsSeen.add(current);
    hmtsRender();
    hmtsIndex++;
    if (hmtsIndex >= hmtsArr.length) {
        hmtsPause();
    }
}

function hmtsStart() {
    hmtsArr = hmtsArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    hmtsTarget = parseInt(hmtsTargetInput.value, 10) || 0;
    hmtsIndex = 0;
    hmtsSeen = new Set();
    hmtsFoundPair = null;
    hmtsRender();
    hmtsPause();
    hmtsIntervalId = setInterval(hmtsStep, 800);
}

function hmtsPause() {
    if (hmtsIntervalId) {
        clearInterval(hmtsIntervalId);
        hmtsIntervalId = null;
    }
}

function hmtsReset() {
    hmtsPause();
    hmtsIndex = 0;
    hmtsSeen = new Set();
    hmtsFoundPair = null;
    hmtsRender();
}

hmtsStartBtn.addEventListener('click', hmtsStart);
hmtsPauseBtn.addEventListener('click', hmtsPause);
hmtsResetBtn.addEventListener('click', hmtsReset);

hmtsRender();
