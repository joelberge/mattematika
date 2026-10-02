/* Shared problem sets for "world 1" of both adventures, in three difficulty levels.
   Load a book with ?d=1, ?d=2 or ?d=3 to use a set; without it the book keeps its own problems.
   bonus: { type: 'groups', g, n }  → g · n with a picture of g groups of n
          { type: 'plus', a, b }    → a + b with a picture of both groups to count
          { type: 'pizza', t }      → a decimal with halves, drawn as pizza
   boss.super is the spare "superangrep" card (a missing number). */
window.SETS = {
  1: {
    label: 'Lett',
    fights: [
      { q: ['2 + 3 =', '5 - 1 =', '4 + 4 =', '7 - 3 =', '1 + 2 + 3 ='], bonus: { type: 'plus', a: 3, b: 2 }, ans: [5, 4, 8, 4, 6, 5] },
      { q: ['3 + 4 =', '6 - 2 =', '5 + 5 =', '8 - 4 =', '2 + 2 + 2 ='], bonus: { type: 'plus', a: 4, b: 3 }, ans: [7, 4, 10, 4, 6, 7] },
      { q: ['6 + 3 =', '9 - 5 =', '7 + 2 =', '10 - 3 =', '3 + 3 + 1 ='], bonus: { type: 'plus', a: 5, b: 2 }, ans: [9, 4, 9, 7, 7, 7] },
      { q: ['5 + 4 =', '10 - 6 =', '8 + 2 =', '9 - 2 =', '4 + 1 + 4 ='], bonus: { type: 'plus', a: 4, b: 4 }, ans: [9, 4, 10, 7, 9, 8] },
      { q: ['6 + 4 =', '10 - 5 =', '7 + 3 =', '8 - 5 =', '2 + 3 + 4 ='], bonus: { type: 'plus', a: 5, b: 4 }, ans: [10, 5, 10, 3, 9, 9] },
    ],
    boss: { q: ['4 + 5 =', '9 - 3 =', '6 + 6 =', '10 - 4 =', '7 + 3 =', '8 - 6 =', '5 + 2 + 2 =', '10 - 1 - 2 =', '3 + 3 + 3 =', '6 + 5 ='],
            super: '<span class="box">?</span> + 3 = 8', ans: [9, 6, 12, 6, 10, 2, 9, 7, 9, 11, 5] },
  },
  2: {
    label: 'Middels',
    fights: [
      { q: ['34 + 25 =', '68 - 23 =', '47 + 18 =', '2 · 3 =', '50 - 26 ='], bonus: { type: 'groups', g: 3, n: 4 }, ans: [59, 45, 65, 6, 24, 12] },
      { q: ['56 + 32 =', '75 - 38 =', '29 + 46 =', '5 · 2 =', '90 - 45 ='], bonus: { type: 'groups', g: 4, n: 3 }, ans: [88, 37, 75, 10, 45, 12] },
      { q: ['45 + 37 =', '83 - 29 =', '3 · 3 =', '62 + 19 =', '(4 + 6) · 2 ='], bonus: { type: 'groups', g: 3, n: 5 }, ans: [82, 54, 9, 81, 20, 15] },
      { q: ['58 + 26 =', '91 - 47 =', '4 · 5 =', '38 + 38 =', '(10 - 4) · 2 ='], bonus: { type: 'groups', g: 2, n: 10 }, ans: [84, 44, 20, 76, 12, 20] },
      { q: ['67 + 28 =', '100 - 36 =', '5 · 5 =', '49 + 49 =', '(3 + 2) · 4 ='], bonus: { type: 'groups', g: 3, n: 10 }, ans: [95, 64, 25, 98, 20, 30] },
    ],
    boss: { q: ['72 + 19 =', '94 - 46 =', '3 · 4 =', '57 + 35 =', '80 - 27 =', '10 · 3 =', '(6 + 4) · 3 =', '25 + 25 + 25 =', '100 - 55 =', '(9 - 3) · 5 ='],
            super: '<span class="box">?</span> · 5 = 20', ans: [91, 48, 12, 92, 53, 30, 30, 75, 45, 30, 4] },
  },
  3: {
    label: 'Utfordrende',
    fights: [
      { q: ['152 + 39 =', '8 · 6 =', '4 - 13 =', '163 - 45 =', '((6 + 4) · 3) - 5 ='], bonus: { type: 'pizza', t: '2,5 + 2,5 =' }, ans: [191, 48, -9, 118, 25, '5'] },
      { q: ['174 - 58 =', '7 · 6 =', '-5 - 8 =', '205 - 38 =', '((9 - 3) · 4) + 10 ='], bonus: { type: 'pizza', t: '1,5 + 1 =' }, ans: [116, 42, -13, 167, 34, '2,5'] },
      { q: ['168 + 47 =', '9 · 8 =', '2 - 14 =', '187 + 56 =', '(5 · (10 - 4)) + 6 ='], bonus: { type: 'pizza', t: '0,5 + 0,5 + 0,5 =' }, ans: [215, 72, -12, 243, 36, '1,5'] },
      { q: ['231 - 67 =', '9 · 7 =', '-8 + 3 =', '246 + 78 =', '((12 + 8) · 2) - 15 ='], bonus: { type: 'pizza', t: '3,5 + 1,5 =' }, ans: [164, 63, -5, 324, 25, '5'] },
      { q: ['191 - 56 =', '9 · 9 =', '-9 - 9 =', '175 + 48 =', '((15 - 7) · 5) - 12 ='], bonus: { type: 'pizza', t: '6,5 - 2,5 =' }, ans: [135, 81, -18, 223, 28, '4'] },
    ],
    boss: { q: ['267 + 45 =', '8 · 7 =', '283 - 47 =', '6 - 15 =', '-5 - 9 =', '((7 + 5) · 4) - 8 =', '50 - (6 · 7) =', '1,5 + 2,5 =', '10 - 0,5 =', '((150 - 75) + 25) · 2 ='],
            super: '<span class="box">?</span> · 9 = 72', ans: [312, 56, 236, -9, -14, 40, 8, '4', '9,5', 200, 8] },
  },
};
// ?d=2 when rendering PDFs locally, or #d=2&navn=… from the website (the hash never reaches the server)
window.SET_LEVEL = new URLSearchParams(location.hash.includes('=') ? location.hash.slice(1) : location.search.slice(1)).get('d');
window.ACTIVE_SET = window.SETS[window.SET_LEVEL] || null;
