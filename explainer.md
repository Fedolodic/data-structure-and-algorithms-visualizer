# Algorithm Explainers

This document briefly describes each data structure or algorithm currently visualized in this repository.

## Sliding Window
The sliding window technique processes a contiguous subset of items by maintaining a window of fixed or dynamic size that moves across the data. It is useful for tasks like subarray sums or finding patterns in sequences.

## Two Pointers
Two pointers iterate through a collection from different positions, often one from the start and one from the end. The pointers move toward each other to solve problems such as pair sums or checking palindromes in linear time.

## Prefix Sum
A prefix sum array stores the cumulative sum up to each index. By subtracting two prefix sums, we can compute the sum of any subarray in constant time, enabling efficient range queries.

## Run-Length Encoding
Run-length encoding compresses repeated characters or numbers by recording the value and its consecutive count. For example, `AAABB` becomes `3A2B`.

## Dutch National Flag
The Dutch National Flag algorithm sorts an array containing three distinct values (0, 1, 2) using three pointers: low, mid, and high. It partitions the array in a single pass so that all 0s come first, followed by 1s, then 2s.

## Rolling Hash
Rolling hash techniques, such as Rabin-Karp, compute hash values for a moving window of characters. By updating the hash in constant time as the window slides, we can quickly search for a pattern inside a string.

## Z-Algorithm
The Z-algorithm computes an array where each position stores the length of the longest substring starting from that position that is also a prefix of the string. It enables efficient pattern matching and runs in linear time by keeping track of a window of known matches.
