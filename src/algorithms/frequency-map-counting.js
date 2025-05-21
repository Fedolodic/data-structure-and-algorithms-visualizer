function frequencyMapCounting(str) {
  const map = {};
  for (const ch of str) {
    map[ch] = (map[ch] || 0) + 1;
  }
  return map;
}

module.exports = frequencyMapCounting;
