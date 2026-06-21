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
      name: "Easy ",
      problems: [
        { title: "Two Sum",                 approach: "Hash Map",                target: "FAANG" },
        { title: "Best Time to Buy/Sell Stock", approach: "One Pass (Track Min)", target: "Stripe" },
        { title: "Contains Duplicate",       approach: "Hash Set",                target: "Uber" },
        { title: "Move Zeroes",              approach: "Two Pointers",            target: "Airbnb" },
        { title: "Remove Duplicates",        approach: "Two Pointers",            target: "Microsoft" },
        { title: "Remove Element",           approach: "Two Pointers",            target: "FAANG" },
        { title: "Majority Element",         approach: "Boyer-Moore Voting",      target: "Stripe" },
        { title: "Merge Sorted",             approach: "Two Pointers (Reverse)",  target: "Uber" },
        { title: "Squares of Sorted",        approach: "Two Pointers",            target: "Airbnb" },
        { title: "Find Pivot Index",         approach: "Prefix Sum",              target: "Microsoft" },
        { title: "Missing Number",           approach: "Sum Formula / XOR",       target: "FAANG" },
        { title: "Intersection II",          approach: "Hash Map (Frequency)",    target: "Stripe" },
        { title: "Max Average Subarray",     approach: "Sliding Window",          target: "Uber" },
        { title: "Can Place Flowers",        approach: "Greedy",                  target: "Airbnb" },
        { title: "Single Number",            approach: "XOR",                     target: "Microsoft" }
      ]
    },
    {
      name: "Medium",
      problems: [
        { title: "3Sum",                     approach: "Two Pointers + Sorting",      target: "FAANG" },
        { title: "Container with Water",     approach: "Two Pointers",                target: "Stripe" },
        { title: "Product Except Self",      approach: "Prefix/Suffix Product",       target: "Uber" },
        { title: "Max Subarray",             approach: "Kadane's Algorithm (DP)",     target: "Airbnb" },
        { title: "Merge Intervals",          approach: "Sort + Sweep",                target: "Microsoft" },
        { title: "Search Rotated",           approach: "Modified Binary Search",      target: "FAANG" },
        { title: "Find Min Rotated",         approach: "Binary Search",               target: "Stripe" },
        { title: "Sort Colors",              approach: "Dutch National Flag",         target: "Uber" },
        { title: "Subarray Sum K",           approach: "Prefix Sum + Hash Map",       target: "Airbnb" },
        { title: "Rotate Array",             approach: "Reverse / Cyclic Replacement",target: "Microsoft" },
        { title: "Next Permutation",         approach: "In-place Swap",               target: "FAANG" },
        { title: "Spiral Matrix",            approach: "Boundary Simulation",         target: "Stripe" },
        { title: "Set Matrix Zeroes",        approach: "In-place Marking",            target: "Uber" },
        { title: "Kth Largest",              approach: "Heap / Quickselect",          target: "Airbnb" },
        { title: "Combination Sum",          approach: "Backtracking",                target: "Microsoft" },
        { title: "Trapping Rain Water",       approach: "Two Pointers",                target: "FAANG" },
        { title: "First Missing Positive",    approach: "Cyclic Sort / Index Marking", target: "Stripe" },
        { title: "Sliding Window Max",        approach: "Monotonic Deque",             target: "Uber" },
        { title: "Largest Histogram",         approach: "Monotonic Stack",             target: "Airbnb" },
        { title: "Median Sorted",             approach: "Binary Search (Partition)",   target: "Microsoft" },
        { title: "Reverse Pairs",             approach: "Merge Sort",                  target: "FAANG" },
        { title: "Insert Interval",           approach: "Linear Scan + Merge",         target: "Stripe" },
        { title: "Count Smaller",             approach: "Merge Sort / BIT",            target: "Uber" },
        { title: "Split Array",               approach: "Binary Search on Answer",     target: "Airbnb" },
        { title: "Max Value Equation",        approach: "Monotonic Deque",             target: "Microsoft" }
      ]
    },
    {
      name: "Hard",
      problems: [
        { title: "First Missing Positive",    approach: "Cyclic Sort / Index Marking", target: "FAANG" },
        { title: "Sliding Window Max",        approach: "Monotonic Deque",             target: "Stripe" },
        { title: "Largest Histogram",         approach: "Monotonic Stack",             target: "Uber" },
        { title: "Median Sorted",             approach: "Binary Search (Partition)",   target: "Airbnb" },
        { title: "Reverse Pairs",             approach: "Merge Sort",                  target: "Microsoft" },
        { title: "Insert Interval",           approach: "Linear Scan + Merge",         target: "FAANG" },
        { title: "Count Smaller",             approach: "Merge Sort / BIT",            target: "Stripe" },
        { title: "Split Array",               approach: "Binary Search on Answer",     target: "Uber" },
        { title: "Max Value Equation",        approach: "Monotonic Deque",             target: "Airbnb" },
        { title: "Max Sum of Rectangle",      approach: "Kadane's 2D",                 target: "Microsoft" }
      ]
    }
  ]
};