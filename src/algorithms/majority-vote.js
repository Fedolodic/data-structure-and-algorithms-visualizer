function majorityVote(arr) {
  let candidate = null;
  let count = 0;
  for (const val of arr) {
    if (count === 0) {
      candidate = val;
      count = 1;
    } else if (val === candidate) {
      count++;
    } else {
      count--;
    }
  }
  if (candidate === null) return null;
  let occur = 0;
  for (const val of arr) {
    if (val === candidate) occur++;
  }
  return occur > arr.length / 2 ? candidate : null;
}

module.exports = majorityVote;
