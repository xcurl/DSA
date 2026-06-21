/* ============================================================
 * "Linked List" PROBLEM DATA
 * ------------------------------------------------------------
 * Same shape as every other topic file — see data/topics.js
 * for how to wire up a new one.
 * ============================================================ */
window.TOPIC_DATA = {
  title: "Linked List",
  days: [
    {
      name: "Easy",
      problems: [
        { title: "Reverse Linked List",         approach: "Iterative / Recursive",     target: "Meta, Amazon1" },
        { title: "Merge Two Sorted Lists",      approach: "Two Pointers / Dummy Node", target: "Amazon, Microsoft" },
        { title: "Linked List Cycle",           approach: "Fast & Slow Pointers",      target: "Amazon, Spotify" },
        { title: "Middle of the Linked List",   approach: "Fast & Slow Pointers",      target: "Amazon, Apple" },
        { title: "Palindrome Linked List",      approach: "Fast/Slow + Reverse Mid",   target: "Meta, Amazon" },
        { title: "Remove Linked List Elements", approach: "Dummy Node",                target: "Apple, Google" },
        { title: "Intersection of Two Lists",   approach: "Two Pointers / Length Diff",target: "Amazon, Meta" },
        { title: "Delete Node in a Linked List",approach: "Value Swap / Copy Next",    target: "Apple, Microsoft" },
        { title: "Remove Duplicates",           approach: "Single Pointer Traverse",   target: "Amazon, Adobe" },
        { title: "Binary to Integer",           approach: "Bit Manipulation",          target: "Apple, Amazon" }
      ]
    },
    {
      name: "Medium",
      problems: [
        { title: "Add Two Numbers",             approach: "Math / Dummy Node",         target: "Amazon, Bloomberg" },
        { title: "Remove Nth Node From End",    approach: "Fast & Slow Pointers",      target: "Meta, Amazon" },
        { title: "Copy List with Random Pointer",approach: "Hash Map / Interweaving",  target: "Amazon, Meta" },
        { title: "Linked List Cycle II",        approach: "Floyd's Cycle-Finding",     target: "Meta, Amazon" },
        { title: "Reorder List",                approach: "Find Mid + Reverse + Merge",target: "Meta, Amazon" },
        { title: "LRU Cache",                   approach: "Doubly Linked List + Map",  target: "Amazon, Meta" },
        { title: "Swap Nodes in Pairs",         approach: "Dummy Node / Recursion",    target: "Amazon, Microsoft" },
        { title: "Rotate List",                 approach: "Circular Connect & Break",  target: "Microsoft, Bloomberg" },
        { title: "Sort List",                   approach: "Merge Sort (Bottom-Up)",    target: "Google, Meta" },
        { title: "Partition List",              approach: "Two Dummy Lists",           target: "Microsoft, Apple" },
        { title: "Odd Even Linked List",        approach: "Two Pointers",              target: "Amazon, Microsoft" },
        { title: "Flatten Multilevel DLL",      approach: "DFS / Stack",               target: "Bloomberg, Meta" },
        { title: "Insertion Sort List",         approach: "Dummy Node + Scan",         target: "Google, Microsoft" },
        { title: "Add Two Numbers II",          approach: "Stack / Reverse List",      target: "Amazon, Bloomberg" },
        { title: "Design Linked List",          approach: "Object Oriented Design",    target: "Microsoft, Apple" }
      ]
    },
    {
      name: "Hard",
      problems: [
        { title: "Merge k Sorted Lists",        approach: "Min-Heap / Divide & Conquer", target: "Amazon, Meta" },
        { title: "Reverse Nodes in k-Group",    approach: "Dummy Node + Iteration",      target: "Meta, Amazon" },
        { title: "LFU Cache",                   approach: "Two Maps + DLL",              target: "Amazon, Google" },
        { title: "All O`one Data Structure",    approach: "Doubly Linked List + Map",    target: "LinkedIn, Amazon" },
        { title: "Design Skiplist",             approach: "Probabilistic List",          target: "Amazon, Google" }
      ]
    }
  ]
};
