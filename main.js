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
  const pyService = new ExecutionService();
  const button = document.getElementById('run');
  const pyButton = document.getElementById('py-run');
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

  pyButton?.addEventListener('click', async () => {
    const length = 10;
    const arr = Array.from({ length }, () => Math.floor(Math.random() * 100));
    visualize(arr);
    try {
      const result = await pyService.run(`wasm_sort(${JSON.stringify(arr)})`);
      visualize(result);
    } catch (err) {
      console.error(err);
    }
  });
});
