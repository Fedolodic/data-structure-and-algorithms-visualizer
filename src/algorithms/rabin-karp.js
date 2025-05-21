function rabinKarp(text, pattern) {
  const m = pattern.length;
  if (m === 0) return 0;
  const base = 256;
  const mod = 101;
  let highPow = 1;
  let textHash = 0;
  let patternHash = 0;
  for (let i = 0; i < m; i++) {
    textHash = (textHash * base + (text.charCodeAt(i) || 0)) % mod;
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
    if (i < m - 1) highPow = (highPow * base) % mod;
  }
  for (let i = 0; i <= text.length - m; i++) {
    if (textHash === patternHash && text.substr(i, m) === pattern) {
      return i;
    }
    const left = text.charCodeAt(i);
    const right = text.charCodeAt(i + m) || 0;
    textHash = (textHash - left * highPow) % mod;
    if (textHash < 0) textHash += mod;
    textHash = (textHash * base + right) % mod;
  }
  return -1;
}

module.exports = rabinKarp;
