# Dutch National Flag Algorithm

The Dutch National Flag algorithm sorts an array of values that are only `0`, `1`, or `2` using three pointers: `low`, `mid`, and `high`.

- `low` tracks the boundary for values less than `1`.
- `mid` scans through the array.
- `high` tracks the boundary for values greater than `1`.

During each step:
1. If the value at `mid` is `0`, swap with the value at `low` and move both `low` and `mid` forward.
2. If the value at `mid` is `1`, just move `mid` forward.
3. If the value at `mid` is `2`, swap with the value at `high` and move `high` backward.

This partitions the array into three segments `[0s | 1s | 2s]` in a single pass.
