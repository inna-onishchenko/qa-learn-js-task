# QA JavaScript Practice Task

You are building a small **data-processing API** and a **dashboard page** on top of it, then covering everything with **Playwright tests**.

## Setup

```bash
npm install
npx -w e2e playwright install chromium
npm run dev          # start the server at http://localhost:3000
npm test             # run Playwright tests (starts server automatically)
```

## How to work through this

1. Read a task below.
2. Implement the endpoint in `packages/app/src/routes/` and register it in `packages/app/src/index.js`.
3. Write a Playwright test in `packages/e2e/tests/` that verifies your endpoint.
4. Run `npm test` — green means done, move on.

For frontend tasks: add UI to `packages/app/public/index.html`, then write Playwright browser tests.

> **Rule**: where a task says "without using `<method>`" — implement the logic yourself with loops/conditions. You still need to know what the real method does because your tests should verify that your implementation matches its behavior.

---

## Part 1 — String Endpoints

Each endpoint is `POST /api/string/<name>` and accepts/returns JSON.

### 1.1 · split

Split a string into an array by a separator. **Without using `String.prototype.split`.**

```
POST /api/string/split
{ "str": "a,b,c", "separator": "," }
→ { "result": ["a", "b", "c"] }
```

Topics: loops, arrays, string indexing.

### 1.2 · repeat

Repeat a string `n` times. **Without using `String.prototype.repeat`.**

```
POST /api/string/repeat
{ "str": "ab", "count": 3 }
→ { "result": "ababab" }
```

Topics: loops, string concatenation.

### 1.3 · trim

Remove leading and trailing whitespace. **Without using `String.prototype.trim`.**

```
POST /api/string/trim
{ "str": "  hello world  " }
→ { "result": "hello world" }
```

Topics: loops, character comparison.

### 1.4 · includes

Check if a string contains a substring and return its index (or -1). **Without using `String.prototype.includes` or `indexOf`.**

```
POST /api/string/includes
{ "str": "hello world", "search": "world" }
→ { "result": true, "index": 6 }
```

Topics: nested loops, conditionals.

### 1.5 · padStart

Pad a string from the start to a target length. **Without using `String.prototype.padStart`.**

```
POST /api/string/padStart
{ "str": "42", "length": 5, "fill": "0" }
→ { "result": "00042" }
```

Topics: loops, string building.

---

## Part 2 — Array Endpoints

Each endpoint is `POST /api/array/<name>`.

### 2.1 · map

Apply a named transformation to every element. **Without using `Array.prototype.map`.**

Supported operations: `"double"`, `"square"`, `"toUpperCase"`, `"negate"`.

```
POST /api/array/map
{ "arr": [1, 2, 3], "operation": "double" }
→ { "result": [2, 4, 6] }
```

Topics: loops, conditionals, switch/if-else.

### 2.2 · filter

Filter elements by a named condition. **Without using `Array.prototype.filter`.**

Supported conditions: `"even"`, `"odd"`, `"positive"`, `"greaterThan:<n>"` (e.g. `"greaterThan:5"`).

```
POST /api/array/filter
{ "arr": [1, 2, 3, 4, 5, 6], "condition": "even" }
→ { "result": [2, 4, 6] }
```

Topics: loops, conditionals, string parsing (for `greaterThan:<n>`).

### 2.3 · reduce

Reduce an array to a single value. **Without using `Array.prototype.reduce`.**

Supported operations: `"sum"`, `"product"`, `"max"`, `"min"`, `"concat"`.

```
POST /api/array/reduce
{ "arr": [1, 2, 3, 4], "operation": "sum" }
→ { "result": 10 }
```

Topics: loops, accumulator pattern.

### 2.4 · find

Return the first element matching a condition (same conditions as filter), or `null`. **Without using `Array.prototype.find`.**

```
POST /api/array/find
{ "arr": [1, 3, 4, 6], "condition": "even" }
→ { "result": 4 }
```

Topics: loops, early return.

### 2.5 · sort

Sort an array of numbers. **Without using `Array.prototype.sort`.** Implement any sorting algorithm (bubble sort is fine).

```
POST /api/array/sort
{ "arr": [3, 1, 4, 1, 5], "order": "asc" }
→ { "result": [1, 1, 3, 4, 5] }
```

Topics: nested loops, comparison, swap.

### 2.6 · flat

Flatten a nested array to a given depth. **Without using `Array.prototype.flat`.**

```
POST /api/array/flat
{ "arr": [1, [2, [3, [4]]]], "depth": 2 }
→ { "result": [1, 2, 3, [4]] }
```

Topics: recursion, `Array.isArray`.

---

## Part 3 — Object & Data Structure Endpoints

These endpoints exercise destructuring, spread/rest, Maps, Sets, and optional chaining.

### 3.1 · pick — `POST /api/object/pick`

Return a new object with only the listed keys.

```
{ "obj": { "a": 1, "b": 2, "c": 3 }, "keys": ["a", "c"] }
→ { "result": { "a": 1, "c": 3 } }
```

**Implementation requirement**: use the spread operator or destructuring in your solution.

Topics: object destructuring, spread operator.

### 3.2 · merge — `POST /api/object/merge`

Deep-merge multiple objects. Later values overwrite earlier ones.

```
{ "objects": [{ "a": 1 }, { "b": 2 }, { "a": 10, "c": 3 }] }
→ { "result": { "a": 10, "b": 2, "c": 3 } }
```

**Implementation requirement**: use the spread operator and rest parameters in the route handler.

Topics: spread operator, rest parameters.

### 3.3 · unique — `POST /api/array/unique`

Remove duplicate values from an array. **Use `Set` in your implementation.**

```
{ "arr": [1, 2, 2, 3, 3, 3] }
→ { "result": [1, 2, 3] }
```

Topics: `Set`, spread operator (`[...new Set()]`).

### 3.4 · intersection — `POST /api/array/intersection`

Return elements that exist in both arrays.

```
{ "a": [1, 2, 3, 4], "b": [3, 4, 5, 6] }
→ { "result": [3, 4] }
```

**Implementation requirement**: use `Set` for lookup.

Topics: `Set`, `for...of` loop.

### 3.5 · wordFrequency — `POST /api/string/wordFrequency`

Count how many times each word appears in a string. Return as a sorted array of `[word, count]` pairs (most frequent first).

```
{ "text": "the cat sat on the mat the cat" }
→ { "result": [["the", 3], ["cat", 2], ["sat", 1], ["on", 1], ["mat", 1]] }
```

**Implementation requirement**: use a `Map` to accumulate counts, then convert to entries for the response.

Topics: `Map`, `for...of`, `.entries()`, sorting.

### 3.6 · safeGet — `POST /api/object/safeGet`

Safely access a deeply nested property by a dot-separated path. Return `null` if any part of the path is missing.

```
{ "obj": { "a": { "b": { "c": 42 } } }, "path": "a.b.c" }
→ { "result": 42 }

{ "obj": { "a": {} }, "path": "a.b.c" }
→ { "result": null }
```

**Implementation requirement**: use optional chaining (`?.`) where possible, and the nullish coalescing operator (`??`) for the fallback.

Topics: optional chaining, nullish coalescing, `for...of`, `split`.

---

## Part 4 — Chaining & Composition

### 4.1 · pipeline — `POST /api/pipeline`

Accept an array of numbers and a list of operations. Apply operations in order, return the result.

Each operation is a string: `"filter:even"`, `"map:double"`, `"sort:asc"`, `"reduce:sum"`, etc. (reuse the same operations you already support in Parts 2.1–2.5).

```
{
  "arr": [5, 3, 8, 1, 4, 2],
  "operations": ["filter:even", "map:double", "sort:desc"]
}
→ { "result": [16, 8, 4] }
```

**Implementation requirement**: this time you **should** use the real `.filter()`, `.map()`, `.sort()`, `.reduce()` methods — chain them together.

Topics: method chaining, higher-order functions, `for...of`.

### 4.2 · transform — `POST /api/object/transform`

Accept an array of user objects and return computed properties.

```
{
  "users": [
    { "firstName": "John", "lastName": "Doe", "scores": [80, 90, 70] },
    { "firstName": "Jane", "lastName": "Smith", "scores": [95, 85, 100] }
  ]
}
→ {
  "result": [
    { "fullName": "John Doe", "average": 80, "passed": true },
    { "fullName": "Jane Smith", "average": 93.33, "passed": true }
  ]
}
```

Rules: `average` rounded to 2 decimals, `passed` is `true` if average >= 60.

**Implementation requirement**: use `.map()` with destructuring in the callback.

Topics: `.map()`, destructuring, `.reduce()`, template literals.

---

## Part 5 — Frontend Tasks

Add interactive UI cards to `packages/app/public/index.html` and write Playwright **browser** tests for them.

### 5.1 · String Playground

Add a card with:
- A text input for the string
- A text input for the separator
- A "Split" button

On click, call `POST /api/string/split` and render the result as a list of `<span>` elements inside a `<div id="split-result">`.

**Playwright test**: fill the inputs, click the button, assert the `<span>` elements match the expected array.

### 5.2 · Array Pipeline Builder

Add a card with:
- A text input for a comma-separated list of numbers
- A way to add operations (dropdown + "Add" button, or free-text)
- A list showing the current operation pipeline
- A "Run" button

On click, call `POST /api/pipeline` and display the result.

**Playwright test**: build a pipeline of 3 operations, run it, assert the output.

### 5.3 · Word Frequency Visualizer

Add a card with:
- A `<textarea>` for input text
- An "Analyze" button

On click, call `POST /api/string/wordFrequency` and render a simple bar chart using `<div>` elements with dynamic widths (no chart library needed — just styled divs).

**Playwright test**: enter text, click analyze, assert that bars appear and the top word's bar is the widest.

### 5.4 · User Table

Add a card that:
- Calls `POST /api/object/transform` with hardcoded sample data on page load
- Renders a `<table>` with columns: Full Name, Average, Passed
- Rows with `passed: false` have a red background

**Playwright test**: assert table row count, check that a failing student has the red background class.

---

## Part 6 — Error Handling

Go back to every endpoint you built and add input validation. Each endpoint should return a `400` status with a JSON error when the input is invalid. Then write Playwright tests that verify these error responses.

### Error response format

All error responses must follow this shape:

```json
{ "error": "A human-readable message describing what went wrong" }
```

### 6.1 · Missing and wrong-type fields

For every endpoint, return `400` if a required field is missing or has the wrong type.

Examples:

```
POST /api/string/split
{ "str": "hello" }
→ 400 { "error": "\"separator\" is required" }

POST /api/string/split
{ "str": 123, "separator": "," }
→ 400 { "error": "\"str\" must be a string" }

POST /api/array/map
{ "arr": "not an array", "operation": "double" }
→ 400 { "error": "\"arr\" must be an array" }
```

**What to validate per endpoint:**
- String endpoints: `str` must be a string; other params (`separator`, `count`, `search`, `length`, `fill`) must be present and correct type
- Array endpoints: `arr` must be an array; `operation`/`condition`/`order` must be a string
- Object endpoints: `obj` must be an object (and not an array/null); `keys` must be an array; `path` must be a string
- `pipeline`: `arr` must be an array, `operations` must be an array of strings
- `transform`: `users` must be an array where each element has `firstName`, `lastName`, `scores`

Topics: `typeof`, `Array.isArray`, conditionals, early return.

### 6.2 · Invalid operation/condition names

Return `400` when an operation or condition name is not recognized.

```
POST /api/array/map
{ "arr": [1, 2], "operation": "banana" }
→ 400 { "error": "Unknown operation: \"banana\". Supported: double, square, toUpperCase, negate" }

POST /api/array/filter
{ "arr": [1, 2], "condition": "xyz" }
→ 400 { "error": "Unknown condition: \"xyz\". Supported: even, odd, positive, greaterThan:<n>" }
```

Topics: `includes` (on arrays of allowed values), template literals.

### 6.3 · Numeric boundary checks

```
POST /api/string/repeat
{ "str": "a", "count": -3 }
→ 400 { "error": "\"count\" must be a non-negative integer" }

POST /api/string/padStart
{ "str": "hello", "length": -1, "fill": "0" }
→ 400 { "error": "\"length\" must be a non-negative integer" }

POST /api/array/flat
{ "arr": [1, [2]], "depth": -1 }
→ 400 { "error": "\"depth\" must be a non-negative integer" }
```

Topics: number validation, `Number.isInteger`.

### 6.4 · Empty inputs

Decide what each endpoint should do with empty inputs and test it:

- `POST /api/string/split` with `{ "str": "", "separator": "," }` — should return `{ "result": [""] }` (matches real `"".split(",")`)
- `POST /api/array/reduce` with `{ "arr": [], "operation": "sum" }` — what should happen? Pick a behavior, document it in a code comment, and test it.
- `POST /api/string/wordFrequency` with `{ "text": "" }` — should return `{ "result": [] }`
- `POST /api/array/intersection` with `{ "a": [], "b": [1, 2] }` — should return `{ "result": [] }`

This task is deliberately open-ended. The point is to **think about edge cases** — a core QA skill.

Topics: edge-case thinking, defensive programming.

### 6.5 · Pipeline error propagation

What happens when one step in a pipeline fails?

```
POST /api/pipeline
{ "arr": [1, 2, 3], "operations": ["filter:even", "reduce:sum", "map:double"] }
```

After `reduce:sum`, the result is a single number (`2`), not an array — so `map:double` can't work.

Return `400` with a message that identifies which step failed and why:

```json
{ "error": "Step 3 (\"map:double\") failed: expected an array but got a number" }
```

Topics: `typeof`, `for...of` with index, error messages, control flow.

### 6.6 · Write negative tests

For each of the above scenarios, write a **dedicated Playwright test file** `packages/e2e/tests/errors.spec.js` (or split by part — `errors-string.spec.js`, etc.) that:

1. Sends the bad request
2. Asserts the response status is `400`
3. Asserts the `error` field in the response body contains a meaningful message

Example:

```js
test("POST /api/string/split — missing separator returns 400", async ({ request }) => {
  const res = await request.post("/api/string/split", {
    data: { str: "hello" },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.error).toContain("separator");
});
```

Topics: negative testing, status code assertions, response body validation.

---

## Checklist

Use this to track your progress:

- [ ] **1.1** `split` endpoint + test
- [ ] **1.2** `repeat` endpoint + test
- [ ] **1.3** `trim` endpoint + test
- [ ] **1.4** `includes` endpoint + test
- [ ] **1.5** `padStart` endpoint + test
- [ ] **2.1** `map` endpoint + test
- [ ] **2.2** `filter` endpoint + test
- [ ] **2.3** `reduce` endpoint + test
- [ ] **2.4** `find` endpoint + test
- [ ] **2.5** `sort` endpoint + test
- [ ] **2.6** `flat` endpoint + test
- [ ] **3.1** `pick` endpoint + test
- [ ] **3.2** `merge` endpoint + test
- [ ] **3.3** `unique` endpoint + test
- [ ] **3.4** `intersection` endpoint + test
- [ ] **3.5** `wordFrequency` endpoint + test
- [ ] **3.6** `safeGet` endpoint + test
- [ ] **4.1** `pipeline` endpoint + test
- [ ] **4.2** `transform` endpoint + test
- [ ] **5.1** String Playground UI + test
- [ ] **5.2** Array Pipeline Builder UI + test
- [ ] **5.3** Word Frequency Visualizer UI + test
- [ ] **5.4** User Table UI + test
- [ ] **6.1** Missing/wrong-type field validation + tests
- [ ] **6.2** Invalid operation/condition names + tests
- [ ] **6.3** Numeric boundary checks + tests
- [ ] **6.4** Empty input edge cases + tests
- [ ] **6.5** Pipeline error propagation + tests
- [ ] **6.6** Negative test suite
