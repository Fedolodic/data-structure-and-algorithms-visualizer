# Visualization Roadmap

This repo will serve as a simple data structure and algorithm visualizer.  Each pattern below should have an illustrative animation, a short textual explanation, and optional user input to customize examples.

## 1. Setup
- Decide on a frontend framework (React or vanilla JS is fine)
- Prepare a build system (npm with webpack or similar)
- [x] Add a basic page layout with navigation between categories

## 2. Arrays & Strings
Implement demos for:
- ~~A-01 Sliding Window~~
- ~~A-02 Two Pointers~~
- ~~A-03 Prefix Sum / Difference Array~~
- ~~A-04 Run-Length Encoding~~
- ~~A-05 Dutch National Flag (3-way partition)~~
- ~~A-06 Rolling Hash / Rabin-Karp~~
- ~~A-07 Z-Algorithm (Z-Function)~~
- ~~A-08 KMP Prefix Function~~
- ~~A-09 Manacher Center Expansion~~
- ~~A-10 Boyer-Moore Majority-Vote~~
- ~~A-11 Cycle Sort / In-place Rearrangement~~
- ~~A-12 Monotonic Stack (Next Greater Element)~~
 - ~~A-13 Sparse Table Range Query~~
- ~~A-14 Segment Tree Range Sum (static arrays)~~

## 3. Hashing & Counting
Add visualizations for:
- ~~H-01 Frequency Map Counting~~
- H-02 Ordered Map / TreeMap Window
- ~~H-03 Hash-Set Intersection~~
- ~~H-04 Hash-Map Two-Sum~~
- ~~H-05 Prefix-Sum + Hash (subarray = K)~~
- ~~H-06 Sliding Window w/ Counter (anagram)~~
- H-07 Bloom Filter
- H-08 Cuckoo Hashing
- H-09 LRU Cache (hash + linked-list)
- ~~H-10 Counting Sort~~
- ~~H-11 Bucket Sort~~
- ~~H-12 Bit-Set / Bitmap Counting~~

## 4. Recursion & Backtracking
Create step-by-step tracers for:
- R-01 Permutation Tree
- R-02 Combination / Subset Builder
- R-03 N-Queens Solver
- R-04 Sudoku Solver
- R-05 Backtrack Pruner (used[]/freq)
- R-06 Word Search DFS
- R-07 Flood Fill
- R-08 Generate Parentheses
- R-09 Expression Add Operators
- R-10 Hamiltonian Path DFS
- R-11 Deduped Permutation (sorted + skip)
- R-12 Combination Sum (choose/skip)
- R-13 K-Partition DFS
- R-14 Decision-Tree + Memo guard

## 5. Sorting & Greedy
Show animations for:
- G-01 Interval Merge
- G-02 Sweep Line Events
- G-03 Greedy Exchange (change-making)
- G-04 Activity Selection
- ~~G-05 Counting Sort (dup in H but used greedily)~~
- G-06 Radix Sort
- G-07 Top-K with Heap
- G-08 Monotonic Stack Skyline
- G-09 Job Sequencing w/ DSU
- G-10 Gas-Station Circuit
- G-11 Arrow Burst Balloons
- G-12 Partition Labels
- G-13 Minimum Intervals Removal
- G-14 Minimum Window Interval Cover

## 6. Binary Search & Divide-Conquer
Include interactive traces for:
- B-01 Lower / Upper Bound
- B-02 Rotated Array Search
- B-03 Peak Element
- B-04 First / Last Occurrence
- B-05 Median of Two Sorted Arrays
- B-06 K-th Smallest in Sorted Matrix
- B-07 “Aggressive Cows” (min-dist search)
- B-08 Exponential Search
- B-09 Ternary Search (unimodal)
- B-10 Binary Search on Answer (parametric)
- B-11 Quick-Select (Hoare / Lomuto)
- B-12 Merge Sort
- B-13 Divide-Conquer Max Subarray
- B-14 Fast Fourier Transform (FFT)

## 7. Dynamic Programming
For each DP pattern provide tables and transitions:
- D-01 Memoization Tree
- D-02 0/1 Knapsack
- D-03 Unbounded Knapsack
- D-04 Longest Common Subsequence
- D-05 Edit Distance
- D-06 Palindrome DP
- D-07 State-Compression DP (bitmask)
- D-08 Longest Increasing Subsequence (patience)
- D-09 Grid Paths (unique/mine/coin)
- D-10 Tree DP (post-order)
- D-11 Interval DP (Matrix-Chain)
- D-12 Subset Sum
- D-13 Coin Change Fewest
- D-14 House Robber (linear & circular)
- D-15 Digit DP (count numbers with property)

## 8. Trees & Graphs
Plan to animate traversal and graph algorithms:
- T-01 DFS
- T-02 BFS
- T-03 Union-Find (DSU)
- T-04 Topological Sort
- T-05 MST Kruskal
- T-06 MST Prim
- T-07 Articulation Point / Bridge
- T-08 Tarjan SCC
- T-09 Dijkstra
- T-10 Bellman-Ford
- T-11 Floyd-Warshall
- T-12 A* Search
- T-13 Binary Lifting LCA
- T-14 Euler Tour Flatten
- T-15 Segment Tree (dynamic)
- T-16 Binary Indexed Tree
- T-17 Heavy-Light Decomposition
- T-18 Mo’s Algorithm on Trees

## 9. Design & Simulation
Diagrams and simple UI for:
- S-01 LRU Cache
- S-02 LFU Cache
- S-03 Token Bucket Rate Limiter
- S-04 Event Queue Simulation
- S-05 OOP Decomposer / Service Layer
- S-06 Parking Lot Design
- S-07 URL Shortener
- S-08 Publish-Subscribe Message Queue
- S-09 Sharded Key-Value Store
- S-10 Leaderboard (heap+hash)
- S-11 File-System Trie
- S-12 Order-Book Matching Engine

## 10. Concurrency & Systems
Model concurrency scenarios visually:
- C-01 Mutex / Lock
- C-02 Binary / Counting Semaphore
- C-03 Read-Write Lock
- C-04 Monitor Pattern
- C-05 Barrier / Latch
- C-06 Producer-Consumer Queue
- C-07 Paxos Consensus
- C-08 Raft Consensus
- C-09 Leaky Bucket Rate Limiter
- C-10 Thread-Pool Executor

## General Tasks
- ~~Build minimal controls (start/pause/reset) for each visualization~~
- Provide code snippets or pseudocode side-by-side with animations
- ~~Write short text descriptions of each pattern~~
- ~~Add unit tests where possible to verify algorithm outputs~~
- ~~Document how to run the visualizer locally~~
- Remember to update `explainer.md` whenever a new demo or algorithm is added

