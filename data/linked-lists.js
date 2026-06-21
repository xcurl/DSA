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
        { title: "Reverse Linked List",         approach: "Iterative / Recursive",     target: "FAANG" },
        { title: "Merge Two Sorted Lists",      approach: "Two Pointers / Dummy Node", target: "Stripe" },
        { title: "Linked List Cycle",           approach: "Fast & Slow Pointers",      target: "Uber" },
        { title: "Middle of the Linked List",   approach: "Fast & Slow Pointers",      target: "Airbnb" },
        { title: "Palindrome Linked List",      approach: "Fast/Slow + Reverse Mid",   target: "Microsoft" },
        { title: "Remove Linked List Elements", approach: "Dummy Node",                target: "FAANG" },
        { title: "Intersection of Two Lists",   approach: "Two Pointers / Length Diff",target: "Stripe" },
        { title: "Delete Node in a Linked List",approach: "Value Swap / Copy Next",    target: "Uber" },
        { title: "Remove Duplicates",           approach: "Single Pointer Traverse",   target: "Airbnb" },
        { title: "Binary to Integer",           approach: "Bit Manipulation",          target: "Microsoft" }
      ]
    },
    {
      name: "Medium",
      problems: [
        { title: "Add Two Numbers",             approach: "Math / Dummy Node",         target: "FAANG" },
        { title: "Remove Nth Node From End",    approach: "Fast & Slow Pointers",      target: "Stripe" },
        { title: "Copy List with Random Pointer",approach: "Hash Map / Interweaving",  target: "Uber" },
        { title: "Linked List Cycle II",        approach: "Floyd's Cycle-Finding",     target: "Airbnb" },
        { title: "Reorder List",                approach: "Find Mid + Reverse + Merge",target: "Microsoft" },
        { title: "LRU Cache",                   approach: "Doubly Linked List + Map",  target: "FAANG" },
        { title: "Swap Nodes in Pairs",         approach: "Dummy Node / Recursion",    target: "Stripe" },
        { title: "Rotate List",                 approach: "Circular Connect & Break",  target: "Uber" },
        { title: "Sort List",                   approach: "Merge Sort (Bottom-Up)",    target: "Airbnb" },
        { title: "Partition List",              approach: "Two Dummy Lists",           target: "Microsoft" },
        { title: "Odd Even Linked List",        approach: "Two Pointers",              target: "FAANG" },
        { title: "Flatten Multilevel DLL",      approach: "DFS / Stack",               target: "Stripe" },
        { title: "Insertion Sort List",         approach: "Dummy Node + Scan",         target: "Uber" },
        { title: "Add Two Numbers II",          approach: "Stack / Reverse List",      target: "Airbnb" },
        { title: "Design Linked List",          approach: "Object Oriented Design",    target: "Microsoft" }
      ]
    },
    {
      name: "Hard",
      problems: [
        { title: "Merge k Sorted Lists",        approach: "Min-Heap / Divide & Conquer", target: "FAANG" },
        { title: "Reverse Nodes in k-Group",    approach: "Dummy Node + Iteration",      target: "Stripe" },
        { title: "LFU Cache",                   approach: "Two Maps + DLL",              target: "Uber" },
        { title: "All O`one Data Structure",    approach: "Doubly Linked List + Map",    target: "Airbnb" },
        { title: "Design Skiplist",             approach: "Probabilistic List",          target: "Microsoft" }
      ]
    }
  ]
};