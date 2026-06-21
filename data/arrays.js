/* ============================================================
 * "Arrays" PROBLEM DATA
 * ------------------------------------------------------------
 * Same shape as every other topic file — see data/topics.js
 * for how to wire up a new one.
 * ============================================================ */
window.TOPIC_DATA = {
  title: "Arrays",
  days: [
    {
      name: "Easy",
      problems: [
        { title: "Two Sum",                 approach: "Hash Map",               target: "Amazon, Apple" },
        { title: "Best Time to Buy/Sell Stock", approach: "One Pass (Track Min)", target: "Bloomberg, Microsoft" },
        { title: "Contains Duplicate",      approach: "Hash Set",               target: "Apple, Adobe" },
        { title: "Move Zeroes",             approach: "Two Pointers",           target: "Meta, Apple" },
        { title: "Remove Duplicates",       approach: "Two Pointers",           target: "Meta, Microsoft" },
        { title: "Remove Element",          approach: "Two Pointers",           target: "Amazon, Google" },
        { title: "Majority Element",        approach: "Boyer-Moore Voting",     target: "Microsoft, Google" },
        { title: "Merge Sorted",            approach: "Two Pointers (Reverse)", target: "Meta, Amazon" },
        { title: "Squares of Sorted",       approach: "Two Pointers",           target: "Meta, Uber" },
        { title: "Find Pivot Index",        approach: "Prefix Sum",             target: "Goldman Sachs" },
        { title: "Missing Number",          approach: "Sum Formula / XOR",      target: "Amazon, Microsoft" },
        { title: "Intersection II",         approach: "Hash Map (Frequency)",   target: "Meta, Amazon" },
        { title: "Max Average Subarray",    approach: "Sliding Window",         target: "Google, Amazon" },
        { title: "Can Place Flowers",       approach: "Greedy",                 target: "Meta, LinkedIn" },
        { title: "Single Number",           approach: "XOR",                    target: "Amazon, Palantir" }
      ]
    },
    {
      name: "Medium",
      problems: [
        { title: "3Sum",                    approach: "Two Pointers + Sorting",     target: "Meta, Amazon" },
        { title: "Container with Water",    approach: "Two Pointers",               target: "Amazon, Google" },
        { title: "Product Except Self",     approach: "Prefix/Suffix Product",      target: "Amazon, Apple" },
        { title: "Max Subarray",            approach: "Kadane's Algorithm (DP)",    target: "LinkedIn, Amazon" },
        { title: "Merge Intervals",         approach: "Sort + Sweep",               target: "Meta, Bloomberg" },
        { title: "Search Rotated",          approach: "Modified Binary Search",     target: "LinkedIn, Microsoft" },
        { title: "Find Min Rotated",        approach: "Binary Search",              target: "Amazon, Microsoft" },
        { title: "Sort Colors",             approach: "Dutch National Flag",        target: "Microsoft, Amazon" },
        { title: "Subarray Sum K",          approach: "Prefix Sum + Hash Map",      target: "Meta, Amazon" },
        { title: "Rotate Array",            approach: "Reverse / Cyclic Replacement",target: "Amazon, Microsoft" },
        { title: "Next Permutation",        approach: "In-place Swap",              target: "Meta, Amazon" },
        { title: "Spiral Matrix",           approach: "Boundary Simulation",        target: "Microsoft, Amazon" },
        { title: "Set Matrix Zeroes",       approach: "In-place Marking",           target: "Amazon, Microsoft" },
        { title: "Kth Largest",             approach: "Heap / Quickselect",         target: "Meta, Spotify" },
        { title: "Combination Sum",         approach: "Backtracking",               target: "Amazon, Meta" },
        { title: "Trapping Rain Water",     approach: "Two Pointers",               target: "Amazon, Goldman" },
        { title: "First Missing Positive",  approach: "Cyclic Sort / Index Marking",target: "Amazon, Microsoft" },
        { title: "Sliding Window Max",      approach: "Monotonic Deque",            target: "Amazon, Google" },
        { title: "Largest Histogram",       approach: "Monotonic Stack",            target: "Amazon, Google" },
        { title: "Median Sorted",           approach: "Binary Search (Partition)",  target: "Amazon, Microsoft" },
        { title: "Reverse Pairs",           approach: "Merge Sort",                 target: "Amazon, Google" },
        { title: "Insert Interval",         approach: "Linear Scan + Merge",        target: "Google, Meta" },
        { title: "Count Smaller",           approach: "Merge Sort / BIT",           target: "Google, Amazon" },
        { title: "Split Array",             approach: "Binary Search on Answer",    target: "Google, Amazon" },
        { title: "Max Value Equation",      approach: "Monotonic Deque",            target: "Google, Microsoft" }
      ]
    },
    {
      name: "Hard",
      problems: [
        { title: "First Missing Positive",  approach: "Cyclic Sort / Index Marking", target: "Amazon, Microsoft" },
        { title: "Sliding Window Max",      approach: "Monotonic Deque",             target: "Amazon, Google" },
        { title: "Largest Histogram",       approach: "Monotonic Stack",             target: "Amazon, Google" },
        { title: "Median Sorted",           approach: "Binary Search (Partition)",   target: "Amazon, Microsoft" },
        { title: "Reverse Pairs",           approach: "Merge Sort",                  target: "Amazon, Google" },
        { title: "Insert Interval",         approach: "Linear Scan + Merge",         target: "Google, Meta" },
        { title: "Count Smaller",           approach: "Merge Sort / BIT",            target: "Google, Amazon" },
        { title: "Split Array",             approach: "Binary Search on Answer",     target: "Google, Amazon" },
        { title: "Max Value Equation",      approach: "Monotonic Deque",             target: "Google, Microsoft" },
        { title: "Max Sum of Rectangle",    approach: "Kadane's 2D",                 target: "Google, Amazon" }
      ]
    }
  ]
};
