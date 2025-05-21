function cycleSort(arr) {
  for (let cycleStart = 0; cycleStart < arr.length - 1; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < arr.length; i++) {
      if (arr[i] < item) pos++;
    }
    if (pos === cycleStart) continue;
    while (item === arr[pos]) pos++;
    [arr[pos], item] = [item, arr[pos]];
    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < arr.length; i++) {
        if (arr[i] < item) pos++;
      }
      while (item === arr[pos]) pos++;
      [arr[pos], item] = [item, arr[pos]];
    }
  }
  return arr;
}

module.exports = cycleSort;
