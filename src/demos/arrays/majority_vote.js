const mvArrayInput = base.el('mvArrayInput');
const mvStartBtn = base.el('mvStartBtn');
const mvPauseBtn = base.el('mvPauseBtn');
const mvResetBtn = base.el('mvResetBtn');
const mvArrayContainer = base.el('mvArrayContainer');
const mvCandidateDisplay = base.el('mvCandidateDisplay');

const mvState = { intervalId: null };
let mvIndex = 0;
let mvArr = [];
let candidate = null;
let count = 0;

function mvRender() {
    mvArrayContainer.innerHTML = '';
    mvArr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.textContent = val;
        if (i === mvIndex) {
            div.classList.add('active');
        }
        mvArrayContainer.appendChild(div);
    });
    mvCandidateDisplay.textContent = `Candidate: ${candidate !== null ? candidate : 'none'} Count: ${count}`;
}

function mvStep() {
    const val = mvArr[mvIndex];
    if (count === 0) {
        candidate = val;
        count = 1;
    } else if (val === candidate) {
        count++;
    } else {
        count--;
    }
    mvRender();
    mvIndex++;
    if (mvIndex >= mvArr.length) {
        mvPause();
    }
}

function mvStart() {
    mvArr = mvArrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));
    mvIndex = 0;
    candidate = null;
    count = 0;
    mvRender();
    mvPause();
    base.play(mvState, mvStep, 1000);
}

function mvPause() {
  base.pause(mvState);
}

function mvReset() {
    mvPause();
    mvIndex = 0;
    candidate = null;
    count = 0;
    mvRender();
}

mvStartBtn.addEventListener('click', mvStart);
mvPauseBtn.addEventListener('click', mvPause);
mvResetBtn.addEventListener('click', mvReset);

mvRender();
