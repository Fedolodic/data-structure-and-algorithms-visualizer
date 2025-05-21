function countingSort(arr, maxVal = Math.max(...arr)) {
  const counts = new Array(maxVal + 1).fill(0);
  for (const num of arr) {
    counts[num] = (counts[num] || 0) + 1;
  }
  const output = [];
  for (let i = 0; i < counts.length; i++) {
    for (let j = 0; j < counts[i]; j++) {
      output.push(i);
    }
  }
  return output;
}

module.exports = countingSort;
