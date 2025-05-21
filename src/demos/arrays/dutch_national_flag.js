const dnfArrayInput = document.getElementById('dnfArrayInput');
const dnfStartBtn = document.getElementById('dnfStartBtn');
const dnfPauseBtn = document.getElementById('dnfPauseBtn');
const dnfResetBtn = document.getElementById('dnfResetBtn');
const dnfArrayContainer = document.getElementById('dnfArrayContainer');

let dnfIntervalId = null;
let dnfArr = [];
let low = 0;
let mid = 0;
let high = 0;

function dnfRenderArray() {
    dnfArrayContainer.innerHTML = '';
    dnfArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i === low) {
            div.classList.add('pointer-low');
        }
        if (i === mid) {
            div.classList.add('pointer-mid');
        }
        if (i === high) {
            div.classList.add('pointer-high');
        }
        dnfArrayContainer.appendChild(div);
    });
}

function dnfStep() {
    if (mid > high) {
        dnfPause();
        return;
    }
    if (dnfArr[mid] === 0) {
        [dnfArr[low], dnfArr[mid]] = [dnfArr[mid], dnfArr[low]];
        low++;
        mid++;
    } else if (dnfArr[mid] === 1) {
        mid++;
    } else {
        [dnfArr[mid], dnfArr[high]] = [dnfArr[high], dnfArr[mid]];
        high--;
    }
    dnfRenderArray();
}

function dnfStart() {
    dnfArr = dnfArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    low = 0;
    mid = 0;
    high = dnfArr.length - 1;
    dnfRenderArray();
    dnfPause();
    dnfIntervalId = setInterval(dnfStep, 1000);
}

function dnfPause() {
    if (dnfIntervalId) {
        clearInterval(dnfIntervalId);
        dnfIntervalId = null;
    }
}

function dnfReset() {
    dnfPause();
    low = 0;
    mid = 0;
    high = dnfArr.length - 1;
    dnfRenderArray();
}

dnfStartBtn.addEventListener('click', dnfStart);
dnfPauseBtn.addEventListener('click', dnfPause);
dnfResetBtn.addEventListener('click', dnfReset);

dnfRenderArray();
