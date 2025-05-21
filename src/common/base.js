function el(id) {
  return document.getElementById(id);
}

function play(state, stepFn, delay = 1000) {
  pause(state);
  state.intervalId = setInterval(stepFn, delay);
}

function pause(state) {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
}

function reset(state, resetFn) {
  pause(state);
  if (typeof resetFn === 'function') {
    resetFn();
  }
}

window.base = { el, play, pause, reset };
