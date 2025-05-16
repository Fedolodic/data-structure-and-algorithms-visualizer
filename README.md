# Data Structure and Algorithm Visualizer

This repository contains a minimal prototype of an algorithm visualizer powered by WebAssembly. The demo uses a bubble sort routine written in C, compiled to a `.wasm` module with `clang`, and loaded in the browser using plain JavaScript.

## Running the demo

Open `index.html` in a modern browser. Click **Sort Random Array** to generate a random list of numbers, run the `bubble_sort` WebAssembly function, and visualize the sorted result.

No external build tools or package managers are required.
