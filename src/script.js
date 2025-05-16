const arrayInput = document.getElementById('arrayInput');
const windowSizeInput = document.getElementById('windowSize');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const arrayContainer = document.getElementById('arrayContainer');

let intervalId = null;
let index = 0;
let arr = [];
let windowSize = 3;

function renderArray() {
    arrayContainer.innerHTML = '';
    arr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i >= index && i < index + windowSize) {
            div.classList.add('active');
        }
        arrayContainer.appendChild(div);
    });
}

function step() {
    renderArray();
    index++;
    if (index > arr.length - windowSize) {
        pause();
    }
}

function start() {
    arr = arrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    windowSize = parseInt(windowSizeInput.value, 10) || 1;
    index = 0;
    renderArray();
    pause();
    intervalId = setInterval(step, 1000);
}

function pause() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function reset() {
    pause();
    index = 0;
    renderArray();
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

renderArray();
