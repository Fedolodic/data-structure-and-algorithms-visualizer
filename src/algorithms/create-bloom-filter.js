function createBloomFilter(size = 32, hashCount = 3) {
  const bits = new Uint8Array(size);

  function hash(val, seed) {
    let h = 0;
    for (const ch of String(val)) {
      h = (h * seed + ch.charCodeAt(0)) % size;
    }
    return h;
  }

  function add(value) {
    for (let i = 1; i <= hashCount; i++) {
      bits[hash(value, i + 1)] = 1;
    }
  }

  function contains(value) {
    for (let i = 1; i <= hashCount; i++) {
      if (bits[hash(value, i + 1)] === 0) return false;
    }
    return true;
  }

  return { bits, add, contains };
}

module.exports = createBloomFilter;
