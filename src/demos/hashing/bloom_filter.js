const bfAddInput = base.el('bfAddInput');
const bfQueryInput = base.el('bfQueryInput');
const bfAddBtn = base.el('bfAddBtn');
const bfQueryBtn = base.el('bfQueryBtn');
const bfResult = base.el('bfResult');
const bfBits = base.el('bfBits');

const SIZE = 16;
const HASHES = 3;
const bits = new Array(SIZE).fill(0);

function hash(val, seed) {
  let h = 0;
  for (const ch of String(val)) {
    h = (h * seed + ch.charCodeAt(0)) % SIZE;
  }
  return h;
}

function add(val) {
  for (let i = 1; i <= HASHES; i++) {
    bits[hash(val, i + 1)] = 1;
  }
}

function contains(val) {
  for (let i = 1; i <= HASHES; i++) {
    if (bits[hash(val, i + 1)] === 0) return false;
  }
  return true;
}

function render() {
  bfBits.innerHTML = '';
  for (const bit of bits) {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = bit;
    bfBits.appendChild(div);
  }
}

bfAddBtn.addEventListener('click', () => {
  const values = bfAddInput.value.split(',').map(v => v.trim()).filter(v => v);
  values.forEach(add);
  render();
});

bfQueryBtn.addEventListener('click', () => {
  const v = bfQueryInput.value.trim();
  if (!v) return;
  bfResult.textContent = contains(v) ? 'Possibly in set' : 'Definitely not in set';
});

render();

