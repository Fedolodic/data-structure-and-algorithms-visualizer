const lruOpsInput = document.getElementById('lruOpsInput');
const lruCapInput = document.getElementById('lruCapInput');
const lruStartBtn = document.getElementById('lruStartBtn');
const lruPauseBtn = document.getElementById('lruPauseBtn');
const lruResetBtn = document.getElementById('lruResetBtn');
const lruCacheContainer = document.getElementById('lruCacheContainer');
const lruOpInfo = document.getElementById('lruOpInfo');

let lruIntervalId = null;
let lruIndex = 0;
let lruOps = [];
let lruCache = null;

function createLRUCacheDemo(cap) {
  const map = new Map();
  const head = { prev: null, next: null };
  const tail = { prev: head, next: null };
  head.next = tail;

  function remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  function insert(node) {
    node.prev = tail.prev;
    node.next = tail;
    tail.prev.next = node;
    tail.prev = node;
  }

  function get(key) {
    if (!map.has(key)) return null;
    const node = map.get(key);
    remove(node);
    insert(node);
    return node.value;
  }

  function put(key, value) {
    if (map.has(key)) {
      const node = map.get(key);
      node.value = value;
      remove(node);
      insert(node);
    } else {
      if (map.size >= cap) {
        const lru = head.next;
        remove(lru);
        map.delete(lru.key);
      }
      const node = { key, value };
      insert(node);
      map.set(key, node);
    }
  }

  function entries() {
    const out = [];
    let cur = head.next;
    while (cur !== tail) {
      out.push([cur.key, cur.value]);
      cur = cur.next;
    }
    return out;
  }

  return { get, put, entries };
}

function parseOps(str) {
  return str.split(',').map(op => {
    op = op.trim();
    if (op.startsWith('put')) {
      const m = op.match(/put\s+(\d+)\s+(\d+)/);
      if (m) return { type: 'put', key: +m[1], value: +m[2] };
    } else if (op.startsWith('get')) {
      const m = op.match(/get\s+(\d+)/);
      if (m) return { type: 'get', key: +m[1] };
    }
    return null;
  }).filter(Boolean);
}

function lruRender() {
  lruCacheContainer.innerHTML = '';
  lruCache.entries().forEach(([k,v]) => {
    const div = document.createElement('div');
    div.className = 'array-item';
    div.textContent = `${k}:${v}`;
    lruCacheContainer.appendChild(div);
  });
  if (lruIndex < lruOps.length) {
    const op = lruOps[lruIndex];
    lruOpInfo.textContent = op.type === 'put'
      ? `put(${op.key},${op.value})`
      : `get(${op.key})`;
  } else {
    lruOpInfo.textContent = 'done';
  }
}

function lruStep() {
  if (lruIndex >= lruOps.length) { lruPause(); return; }
  const op = lruOps[lruIndex];
  if (op.type === 'put') lruCache.put(op.key, op.value);
  else lruCache.get(op.key);
  lruIndex++;
  lruRender();
}

function lruStart() {
  lruOps = parseOps(lruOpsInput.value);
  const cap = parseInt(lruCapInput.value, 10) || 1;
  lruCache = createLRUCacheDemo(cap);
  lruIndex = 0;
  lruRender();
  lruPause();
  lruIntervalId = setInterval(lruStep, 800);
}

function lruPause() {
  if (lruIntervalId) {
    clearInterval(lruIntervalId);
    lruIntervalId = null;
  }
}

function lruReset() {
  lruPause();
  const cap = parseInt(lruCapInput.value, 10) || 1;
  lruCache = createLRUCacheDemo(cap);
  lruIndex = 0;
  lruRender();
}

lruStartBtn.addEventListener('click', lruStart);
lruPauseBtn.addEventListener('click', lruPause);
lruResetBtn.addEventListener('click', lruReset);

lruReset();
