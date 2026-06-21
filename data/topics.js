/* ============================================================
 * TOPICS DATA
 * ------------------------------------------------------------
 * index.html renders its topic cards purely from this array.
 * To add a new topic page:
 *   1. Create data/<id>.js  (copy data/linked-lists.js as a starting point)
 *   2. Add an entry below with the same `id`
 *   3. Set ready: true
 * That's it — template.html and index.html need no changes.
 *
 * Fields:
 *   id     - matches the data file name (data/<id>.js) and is passed
 *            as template.html?topic=<id>
 *   name   - card title
 *   desc   - card subtitle
 *   icon   - one of the keys defined in ICONS inside index.html
 *            ("list", "link", "tree" — add more there if you need one)
 *   ready  - true: card links to template.html?topic=<id>
 *            false: card renders disabled as a "coming soon" placeholder
 * ============================================================ */
window.TOPICS = [
  {
    id: "arrays",
    name: "Arrays",
    desc: "Two pointers, sliding window, prefix sums",
    icon: "list",
    ready: true
  },
  {
    id: "strings",
    name: "Strings",
    desc: "Frequency maps, sliding window, string DP",
    icon: "list",
    ready: true
  },
  {
    id: "linked-lists",
    name: "Linked Lists",
    desc: "Reversal, cycle detection, merging",
    icon: "link",
    ready: true
  },
  {
    id: "trees-graphs",
    name: "Trees & Graphs",
    desc: "DFS/BFS, traversals, union-find",
    icon: "tree",
    ready: false
  }
];