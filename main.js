async function loadWasm() {
  const response = await fetch('bubble.wasm');
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {});
  return instance.exports;
}

function visualize(arr) {
  const container = document.getElementById('visualization');
  container.innerHTML = '';
  const max = Math.max(...arr);
  arr.forEach(value => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = ((value / max) * 100) + '%';
    container.appendChild(bar);
  });
}

loadWasm().then(exports => {
  const { memory, bubble_sort, __heap_base } = exports;
  const button = document.getElementById('run');
  button.addEventListener('click', () => {
    const length = 10;
    const heapBase = __heap_base.value;
    const arr = new Int32Array(memory.buffer, heapBase, length);
    for (let i = 0; i < length; i++) {
      arr[i] = Math.floor(Math.random() * 100);
    }
    visualize(arr);
    bubble_sort(heapBase, length);
    setTimeout(() => visualize(arr), 100);
  });
});
