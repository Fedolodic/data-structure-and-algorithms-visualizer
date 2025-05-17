importScripts('https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js');

async function loadWasm() {
  const response = await fetch('bubble.wasm');
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {});
  const { memory, bubble_sort, __heap_base } = instance.exports;

  return function wasmSort(array) {
    const ptr = __heap_base.value;
    const buf = new Int32Array(memory.buffer, ptr, array.length);
    buf.set(array);
    bubble_sort(ptr, array.length);
    return Array.from(buf);
  };
}

const pyodideReady = loadPyodide();
const wasmReady = loadWasm();

Promise.all([pyodideReady, wasmReady]).then(([pyodide, wasmSort]) => {
  pyodide.globals.set('wasm_sort', wasmSort);
  self.postMessage('ready');
});

self.onmessage = async (event) => {
  await Promise.all([pyodideReady, wasmReady]);
  const { id, code } = event.data;
  try {
    let result = await self.pyodide.runPythonAsync(code);
    self.postMessage({ id, result });
  } catch (err) {
    self.postMessage({ id, error: err.toString() });
  }
};
