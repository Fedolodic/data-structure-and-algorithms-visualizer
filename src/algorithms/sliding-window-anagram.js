function slidingWindowAnagram(text, pattern) {
  if (pattern.length > text.length) return false;
  const need = {};
  for (const ch of pattern) {
    need[ch] = (need[ch] || 0) + 1;
  }
  const window = {};
  let left = 0;
  let matches = 0;
  const required = Object.keys(need).length;
  for (let right = 0; right < text.length; right++) {
    const ch = text[right];
    window[ch] = (window[ch] || 0) + 1;
    if (need[ch] && window[ch] === need[ch]) matches++;

    if (right - left + 1 > pattern.length) {
      const leftChar = text[left];
      if (need[leftChar] && window[leftChar] === need[leftChar]) matches--;
      window[leftChar]--;
      if (window[leftChar] === 0) delete window[leftChar];
      left++;
    }
    if (matches === required) return true;
  }
  return false;
}

module.exports = slidingWindowAnagram;
