function nextGreaterElements(arr) {
  const res = new Array(arr.length).fill(-1);
  const stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }
    if (stack.length) res[i] = stack[stack.length - 1];
    stack.push(arr[i]);
  }
  return res;
}

module.exports = nextGreaterElements;
