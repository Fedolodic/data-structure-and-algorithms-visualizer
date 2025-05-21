function manacherLongestPalindrome(s) {
  if (s.length === 0) return '';
  const t = '#' + s.split('').join('#') + '#';
  const p = new Array(t.length).fill(0);
  let center = 0, right = 0;
  let bestCenter = 0, bestLen = 0;

  for (let i = 0; i < t.length; i++) {
    const mirror = 2 * center - i;
    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }
    while (
      i - p[i] - 1 >= 0 &&
      i + p[i] + 1 < t.length &&
      t[i - p[i] - 1] === t[i + p[i] + 1]
    ) {
      p[i]++;
    }
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
    if (p[i] > bestLen) {
      bestLen = p[i];
      bestCenter = i;
    }
  }
  const start = Math.floor((bestCenter - bestLen) / 2);
  return s.substring(start, start + bestLen);
}

module.exports = manacherLongestPalindrome;
