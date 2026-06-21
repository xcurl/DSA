/* ============================================================
 * "Strings" PROBLEM DATA
 * ------------------------------------------------------------
 * Same shape as every other topic file — see data/topics.js
 * for how to wire up a new one.
 * ============================================================ */
window.TOPIC_DATA = {
  title: "Strings",
  days: [
    {
      name: "Easy",
      problems: [
        { title: "Valid Anagram",            approach: "Frequency Map",          target: "Meta, Uber" },
        { title: "Valid Palindrome",         approach: "Two Pointers",           target: "Meta, Spotify" },
        { title: "Reverse String",           approach: "Two Pointers",           target: "Apple, Microsoft" },
        { title: "First Unique Char",        approach: "Frequency Map",          target: "Amazon, Bloomberg" },
        { title: "Longest Common Prefix",    approach: "Vertical Scanning",      target: "Apple, Amazon" },
        { title: "strStr",                   approach: "Sliding Window / KMP",   target: "Google, Meta" },
        { title: "Valid Parentheses",        approach: "Stack",                  target: "Meta, Amazon" },
        { title: "Isomorphic Strings",       approach: "Hash Map",               target: "LinkedIn, Meta" },
        { title: "Word Pattern",             approach: "Hash Map",               target: "Uber, Apple" },
        { title: "Add Strings",              approach: "Simulation",             target: "Meta, Airbnb" },
        { title: "Reverse Vowels",           approach: "Two Pointers",           target: "Apple, Google" },
        { title: "Ransom Note",              approach: "Frequency Map",          target: "Spotify, Amazon" },
        { title: "Length Last Word",         approach: "Reverse Scan",           target: "Apple, Amazon" },
        { title: "Array Equivalence",        approach: "Two Pointers / Builder", target: "Meta, Google" },
        { title: "Roman to Integer",         approach: "Hash Map + Linear Scan", target: "Amazon, Microsoft" }
      ]
    },
    {
      name: "Medium",
      problems: [
        { title: "Longest Substring No Repeat",   approach: "Sliding Window",            target: "Meta, Amazon" },
        { title: "Longest Palindrome Substring",  approach: "Expand Around Center",      target: "Amazon, Microsoft" },
        { title: "atoi",                          approach: "String Parsing",            target: "Meta, Amazon" },
        { title: "Group Anagrams",                approach: "Hash Map + Sorting",        target: "Amazon, Uber" },
        { title: "Longest Repeating Replacement", approach: "Sliding Window",            target: "Google, Meta" },
        { title: "Valid Sudoku",                  approach: "Hash Set Validation",       target: "Amazon, Apple" },
        { title: "Decode String",                 approach: "Stack",                     target: "Bloomberg, Google" },
        { title: "Find All Anagrams",             approach: "Sliding Window",            target: "Meta, Amazon" },
        { title: "Min Add Parentheses",           approach: "Greedy / Counter",          target: "Meta, Google" },
        { title: "Palindromic Substrings",        approach: "Expand Around Center",      target: "Meta, Google" },
        { title: "String Compression",            approach: "Two Pointers",              target: "Apple, Microsoft" },
        { title: "Min Deletions",                 approach: "Greedy + Hash Set",         target: "Microsoft, Meta" },
        { title: "Generate Parentheses",          approach: "Backtracking",              target: "Amazon, Meta" },
        { title: "Longest Palindrome 2-Letter",   approach: "Greedy Count",              target: "Google, Amazon" },
        { title: "Letter Combinations",           approach: "Backtracking",              target: "Amazon, Meta" }
      ]
    },
    {
      name: "Hard",
      problems: [
        { title: "Minimum Window Substring",      approach: "Sliding Window",            target: "Meta, Amazon" },
        { title: "Edit Distance",                 approach: "DP (2D Table)",             target: "Google, LinkedIn" },
        { title: "Longest Valid Parentheses",     approach: "Stack / DP",                target: "Amazon, Meta" },
        { title: "Wildcard Matching",             approach: "DP (2D Table)",             target: "Google, Meta" },
        { title: "Regular Expression",            approach: "DP (2D Table)",             target: "Meta, Google" },
        { title: "Text Justification",            approach: "Greedy Simulation",         target: "LinkedIn, Airbnb" },
        { title: "Word Ladder",                   approach: "BFS",                       target: "Amazon, Meta" },
        { title: "Substring Concatenation",       approach: "Sliding Window + Hash Map", target: "Amazon, Apple" },
        { title: "Palindrome Pairs",              approach: "Trie / Hash Map",           target: "Airbnb, Google" },
        { title: "Distinct Subsequences",         approach: "DP (2D Table)",             target: "Google, Amazon" }
      ]
    }
  ]
};
