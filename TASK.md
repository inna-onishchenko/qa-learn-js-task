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
2. Implement the endpoint in `packages/app/src/routes/` and register it in `packages/app/src/index.ts`.
3. Write a Playwright test in `packages/e2e/tests/` that verifies your endpoint.
4. Run `npm test` — green means done, move on.

For frontend tasks: add UI to `packages/app/public/index.html`, then write Playwright browser tests.

> **Rule — two versions**: most tasks ask you to implement something "without using `<method>`". For each of these, create **two endpoints**:
>
> 1. **Manual** — `POST /api/<group>/manual/<name>` — loops, conditions, no built-in shortcut.
> 2. **Built-in** — `POST /api/<group>/builtin/<name>` — using the real method.
>
> For example, task 1.1 (split) becomes:
>
> - `POST /api/string/manual/split` — your loop-based implementation
> - `POST /api/string/builtin/split` — uses `String.prototype.split`
>
> Both endpoints accept the same request body and must return the same result. Write Playwright tests that call **both** and assert their outputs match — that way you prove your manual implementation is correct and you learn what the built-in does.

---

## Part 1 — String Endpoints

Each task produces two endpoints: `POST /api/string/manual/<name>` and `POST /api/string/builtin/<name>`. Both accept the same JSON body and must return the same result.

### 1.1 · split

Split a string into an array by a separator.

- **Manual** (`POST /api/string/manual/split`): without using `String.prototype.split`.
- **Built-in** (`POST /api/string/builtin/split`): using `String.prototype.split`.

```
POST /api/string/manual/split   (or /api/string/builtin/split)
{ "str": "a,b,c", "separator": "," }
→ { "result": ["a", "b", "c"] }
```

Topics: loops, arrays, string indexing.

### 1.2 · repeat

Repeat a string `n` times.

- **Manual** (`POST /api/string/manual/repeat`): without using `String.prototype.repeat`.
- **Built-in** (`POST /api/string/builtin/repeat`): using `String.prototype.repeat`.

```
POST /api/string/manual/repeat   (or /api/string/builtin/repeat)
{ "str": "ab", "count": 3 }
→ { "result": "ababab" }
```

Topics: loops, string concatenation.

### 1.3 · trim

Remove leading and trailing whitespace.

- **Manual** (`POST /api/string/manual/trim`): without using `String.prototype.trim`.
- **Built-in** (`POST /api/string/builtin/trim`): using `String.prototype.trim`.

```
POST /api/string/manual/trim   (or /api/string/builtin/trim)
{ "str": "  hello world  " }
→ { "result": "hello world" }
```

Topics: loops, character comparison.

### 1.4 · includes

Check if a string contains a substring and return its index (or -1).

- **Manual** (`POST /api/string/manual/includes`): without using `String.prototype.includes` or `indexOf`.
- **Built-in** (`POST /api/string/builtin/includes`): using `String.prototype.includes` and `indexOf`.

```
POST /api/string/manual/includes   (or /api/string/builtin/includes)
{ "str": "hello world", "search": "world" }
→ { "result": true, "index": 6 }
```

Topics: nested loops, conditionals.

### 1.5 · padStart

Pad a string from the start to a target length.

- **Manual** (`POST /api/string/manual/padStart`): without using `String.prototype.padStart`.
- **Built-in** (`POST /api/string/builtin/padStart`): using `String.prototype.padStart`.

```
POST /api/string/manual/padStart   (or /api/string/builtin/padStart)
{ "str": "42", "length": 5, "fill": "0" }
→ { "result": "00042" }
```

Topics: loops, string building.

### 1.6 · slice

Extract a portion of a string by start and end index.

- **Manual** (`POST /api/string/manual/slice`): without using `String.prototype.slice` or `substring`.
- **Built-in** (`POST /api/string/builtin/slice`): using `String.prototype.slice`.

```
POST /api/string/manual/slice   (or /api/string/builtin/slice)
{ "str": "hello world", "start": 6, "end": 11 }
→ { "result": "world" }
```

If `end` is omitted, slice to the end of the string. Support negative indices (count from the end).

Topics: loops, negative index handling, conditionals.

### 1.7 · replace

Replace occurrences of a substring within a string.

- **Manual** (`POST /api/string/manual/replace`): without using `String.prototype.replace` or `replaceAll`.
- **Built-in** (`POST /api/string/builtin/replace`): using `String.prototype.replaceAll`.

```
POST /api/string/manual/replace   (or /api/string/builtin/replace)
{ "str": "the cat sat on the cat", "search": "cat", "replacement": "dog" }
→ { "result": "the dog sat on the dog" }
```

Replace **all** occurrences, not just the first.

Topics: loops, string building, searching within strings.

### 1.8 · startsWith / endsWith

Check if a string starts or ends with a given substring.

- **Manual** (`POST /api/string/manual/startsWith`): without using `String.prototype.startsWith` or `endsWith`.
- **Built-in** (`POST /api/string/builtin/startsWith`): using `String.prototype.startsWith` and `endsWith`.

```
POST /api/string/manual/startsWith   (or /api/string/builtin/startsWith)
{ "str": "hello world", "search": "hello", "position": "start" }
→ { "result": true }

POST /api/string/manual/startsWith   (or /api/string/builtin/startsWith)
{ "str": "hello world", "search": "world", "position": "end" }
→ { "result": true }
```

The `position` field is either `"start"` or `"end"`.

Topics: loops, character comparison, conditionals.

---

## Part 2 — Array Endpoints

Each task produces two endpoints: `POST /api/array/manual/<name>` and `POST /api/array/builtin/<name>`. Both accept the same JSON body and must return the same result.

### 2.1 · map

Apply a named transformation to every element.

- **Manual** (`POST /api/array/manual/map`): without using `Array.prototype.map`.
- **Built-in** (`POST /api/array/builtin/map`): using `Array.prototype.map`.

Supported operations: `"double"`, `"square"`, `"toUpperCase"`, `"negate"`.

```
POST /api/array/manual/map   (or /api/array/builtin/map)
{ "arr": [1, 2, 3], "operation": "double" }
→ { "result": [2, 4, 6] }
```

Topics: loops, conditionals, switch/if-else.

### 2.2 · filter

Filter elements by a named condition.

- **Manual** (`POST /api/array/manual/filter`): without using `Array.prototype.filter`.
- **Built-in** (`POST /api/array/builtin/filter`): using `Array.prototype.filter`.

Supported conditions: `"even"`, `"odd"`, `"positive"`, `"greaterThan:<n>"` (e.g. `"greaterThan:5"`).

```
POST /api/array/manual/filter   (or /api/array/builtin/filter)
{ "arr": [1, 2, 3, 4, 5, 6], "condition": "even" }
→ { "result": [2, 4, 6] }
```

Topics: loops, conditionals, string parsing (for `greaterThan:<n>`).

### 2.3 · reduce

Reduce an array to a single value.

- **Manual** (`POST /api/array/manual/reduce`): without using `Array.prototype.reduce`.
- **Built-in** (`POST /api/array/builtin/reduce`): using `Array.prototype.reduce`.

Supported operations: `"sum"`, `"product"`, `"max"`, `"min"`, `"concat"`.

```
POST /api/array/manual/reduce   (or /api/array/builtin/reduce)
{ "arr": [1, 2, 3, 4], "operation": "sum" }
→ { "result": 10 }
```

Topics: loops, accumulator pattern.

### 2.4 · find

Return the first element matching a condition (same conditions as filter), or `null`.

- **Manual** (`POST /api/array/manual/find`): without using `Array.prototype.find`.
- **Built-in** (`POST /api/array/builtin/find`): using `Array.prototype.find`.

```
POST /api/array/manual/find   (or /api/array/builtin/find)
{ "arr": [1, 3, 4, 6], "condition": "even" }
→ { "result": 4 }
```

Topics: loops, early return.

### 2.5 · sort

Sort an array of numbers.

- **Manual** (`POST /api/array/manual/sort`): without using `Array.prototype.sort`. Implement any sorting algorithm (bubble sort is fine).
- **Built-in** (`POST /api/array/builtin/sort`): using `Array.prototype.sort` with a comparator.

```
POST /api/array/manual/sort   (or /api/array/builtin/sort)
{ "arr": [3, 1, 4, 1, 5], "order": "asc" }
→ { "result": [1, 1, 3, 4, 5] }

POST /api/array/manual/sort   (or /api/array/builtin/sort)
{ "arr": [3, 1, 4, 1, 5], "order": "desc" }
→ { "result": [5, 4, 3, 1, 1] }
```

Topics: nested loops, comparison, swap.

### 2.6 · flat

Flatten a nested array to a given depth.

- **Manual** (`POST /api/array/manual/flat`): without using `Array.prototype.flat`.
- **Built-in** (`POST /api/array/builtin/flat`): using `Array.prototype.flat`.

```
POST /api/array/manual/flat   (or /api/array/builtin/flat)
{ "arr": [1, [2, [3, [4]]]], "depth": 2 }
→ { "result": [1, 2, 3, [4]] }
```

Topics: recursion, `Array.isArray`.

### 2.7 · some / every

Check if some or every element in an array matches a condition (same conditions as filter).

- **Manual** (`POST /api/array/manual/some`): without using `Array.prototype.some` or `every`.
- **Built-in** (`POST /api/array/builtin/some`): using `Array.prototype.some` and `every`.

```
POST /api/array/manual/some   (or /api/array/builtin/some)
{ "arr": [1, 3, 5, 8], "condition": "even", "mode": "some" }
→ { "result": true }

POST /api/array/manual/some   (or /api/array/builtin/some)
{ "arr": [1, 3, 5, 8], "condition": "even", "mode": "every" }
→ { "result": false }
```

The `mode` field is either `"some"` or `"every"`.

Topics: loops, early return, boolean logic.

### 2.8 · findIndex

Return the index of the first element matching a condition (same conditions as filter), or `-1`.

- **Manual** (`POST /api/array/manual/findIndex`): without using `Array.prototype.findIndex`.
- **Built-in** (`POST /api/array/builtin/findIndex`): using `Array.prototype.findIndex`.

```
POST /api/array/manual/findIndex   (or /api/array/builtin/findIndex)
{ "arr": [1, 3, 4, 6], "condition": "even" }
→ { "result": 2 }
```

Topics: loops, early return, index tracking.

### 2.9 · reverse

Reverse an array.

- **Manual** (`POST /api/array/manual/reverse`): without using `Array.prototype.reverse`.
- **Built-in** (`POST /api/array/builtin/reverse`): using `Array.prototype.reverse`.

```
POST /api/array/manual/reverse   (or /api/array/builtin/reverse)
{ "arr": [1, 2, 3, 4, 5] }
→ { "result": [5, 4, 3, 2, 1] }
```

Topics: loops, swap, index math.

### 2.10 · at

Access an element by index, supporting negative indices (count from end).

- **Manual** (`POST /api/array/manual/at`): without using `Array.prototype.at`.
- **Built-in** (`POST /api/array/builtin/at`): using `Array.prototype.at`.

```
POST /api/array/manual/at   (or /api/array/builtin/at)
{ "arr": [10, 20, 30, 40, 50], "index": -2 }
→ { "result": 40 }
```

Return `null` if the index is out of bounds.

Topics: negative index handling, conditionals.

### 2.11 · flatMap

Map each element to an array, then flatten the result one level.

- **Manual** (`POST /api/array/manual/flatMap`): without using `Array.prototype.flatMap`.
- **Built-in** (`POST /api/array/builtin/flatMap`): using `Array.prototype.flatMap`.

Supported operations: `"duplicate"` (each element becomes `[el, el]`), `"range"` (each number `n` becomes `[1, 2, ..., n]`), `"split:X"` (each string is split by `X`).

```
POST /api/array/manual/flatMap   (or /api/array/builtin/flatMap)
{ "arr": [1, 2, 3], "operation": "duplicate" }
→ { "result": [1, 1, 2, 2, 3, 3] }

POST /api/array/manual/flatMap   (or /api/array/builtin/flatMap)
{ "arr": ["a-b", "c-d-e"], "operation": "split:-" }
→ { "result": ["a", "b", "c", "d", "e"] }
```

Topics: loops, array building, combining map + flat.

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

### 3.3 · unique

Remove duplicate values from an array.

- **Manual** (`POST /api/array/manual/unique`): without using `Set` — use loops and manual checks.
- **Built-in** (`POST /api/array/builtin/unique`): using `Set` and spread (`[...new Set()]`).

```
POST /api/array/manual/unique   (or /api/array/builtin/unique)
{ "arr": [1, 2, 2, 3, 3, 3] }
→ { "result": [1, 2, 3] }
```

Topics: loops, `Set`, spread operator.

### 3.4 · intersection

Return elements that exist in both arrays.

- **Manual** (`POST /api/array/manual/intersection`): without using `Set` — use nested loops.
- **Built-in** (`POST /api/array/builtin/intersection`): using `Set` for lookup.

```
POST /api/array/manual/intersection   (or /api/array/builtin/intersection)
{ "a": [1, 2, 3, 4], "b": [3, 4, 5, 6] }
→ { "result": [3, 4] }
```

Topics: nested loops, `Set`, `for...of` loop.

### 3.5 · wordFrequency

Count how many times each word appears in a string. Return as a sorted array of `[word, count]` pairs (most frequent first).

- **Manual** (`POST /api/string/manual/wordFrequency`): without using `Map` — use a plain object to accumulate counts.
- **Built-in** (`POST /api/string/builtin/wordFrequency`): using `Map`, then convert with `.entries()`.

```
POST /api/string/manual/wordFrequency   (or /api/string/builtin/wordFrequency)
{ "text": "the cat sat on the mat the cat" }
→ { "result": [["the", 3], ["cat", 2], ["sat", 1], ["on", 1], ["mat", 1]] }
```

Topics: plain objects vs `Map`, `for...of`, `.entries()`, sorting.

### 3.6 · keys / values / entries

Return the keys, values, or entries of an object.

- **Manual** (`POST /api/object/manual/keys`): without using `Object.keys`, `Object.values`, or `Object.entries` — use a `for...in` loop.
- **Built-in** (`POST /api/object/builtin/keys`): using `Object.keys`, `Object.values`, `Object.entries`.

```
POST /api/object/manual/keys   (or /api/object/builtin/keys)
{ "obj": { "a": 1, "b": 2, "c": 3 }, "mode": "keys" }
→ { "result": ["a", "b", "c"] }

POST /api/object/manual/keys   (or /api/object/builtin/keys)
{ "obj": { "a": 1, "b": 2, "c": 3 }, "mode": "values" }
→ { "result": [1, 2, 3] }

POST /api/object/manual/keys   (or /api/object/builtin/keys)
{ "obj": { "a": 1, "b": 2, "c": 3 }, "mode": "entries" }
→ { "result": [["a", 1], ["b", 2], ["c", 3]] }
```

The `mode` field is `"keys"`, `"values"`, or `"entries"`.

Topics: `for...in`, `Object.keys`, `Object.values`, `Object.entries`.

### 3.7 · fromEntries — `POST /api/object/fromEntries`

Convert an array of `[key, value]` pairs into an object.

- **Manual** (`POST /api/object/manual/fromEntries`): without using `Object.fromEntries` — use a loop.
- **Built-in** (`POST /api/object/builtin/fromEntries`): using `Object.fromEntries`.

```
POST /api/object/manual/fromEntries   (or /api/object/builtin/fromEntries)
{ "entries": [["a", 1], ["b", 2], ["c", 3]] }
→ { "result": { "a": 1, "b": 2, "c": 3 } }
```

Topics: loops, object building, `Object.fromEntries`.

### 3.8 · safeGet — `POST /api/object/safeGet`

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

## Part 7 — Rewrite in TypeScript

TypeScript support is already set up in this repo — `tsconfig.json` files are in place and `tsx` is installed. You don't need to configure anything, just start writing `.ts` files.

The goal: take your working JavaScript code and rewrite it in TypeScript, adding proper types. This is exactly what happens in real projects — you inherit JS code and gradually migrate it to TS.

### How it works

- **Routes**: create `.ts` files in `packages/app/src/routes/` (e.g. `string.ts` alongside your existing `string.js`). The server already runs via `tsx`, so `.ts` files work out of the box with `npm run dev`.
- **Tests**: create `.ts` files in `packages/e2e/tests/` (e.g. `string.spec.ts`). Playwright picks up `.ts` tests automatically.

### 7.1 · Type your request/response bodies

For each endpoint, define `interface` or `type` for the request body and response body.

Example for the split endpoint:

```ts
interface SplitRequest {
  str: string;
  separator: string;
}

interface SplitResponse {
  result: string[];
}

router.post("/manual/split", (req: Request, res: Response) => {
  const { str, separator }: SplitRequest = req.body;
  // ...
  const result: SplitResponse = { result: parts };
  res.json(result);
});
```

Do this for **every** endpoint in Parts 1–4. Group related interfaces in a shared `types.ts` file or keep them alongside each route file — your choice.

Topics: `interface`, `type`, type annotations, generics.

### 7.2 · Type the condition/operation helpers

The operations (`"double"`, `"square"`, etc.) and conditions (`"even"`, `"odd"`, etc.) are string literals. Define them as union types:

```ts
type MapOperation = "double" | "square" | "toUpperCase" | "negate";
type FilterCondition = "even" | "odd" | "positive" | `greaterThan:${number}`;
type SortOrder = "asc" | "desc";
```

Update your route handlers to use these types. Notice how TypeScript now catches typos at compile time — the same bugs you wrote error-handling tests for in Part 6.

Topics: union types, template literal types, type narrowing.

### 7.3 · Type the pipeline

The pipeline endpoint is the most interesting to type. Define a type for each operation step and a discriminated union for all of them:

```ts
type PipelineStep =
  | { type: "filter"; condition: FilterCondition }
  | { type: "map"; operation: MapOperation }
  | { type: "sort"; order: SortOrder }
  | { type: "reduce"; operation: ReduceOperation };
```

Parse the string operations (`"filter:even"`) into this typed structure before processing. This is a common real-world pattern — parsing untyped input into typed internal representations.

Topics: discriminated unions, type guards, parsing.

### 7.4 · Rewrite your Playwright tests in TypeScript

Convert your `.spec.js` test files to `.spec.ts`. Key changes:

- Use `import` instead of `require`
- Type the response bodies when asserting:

```ts
import { test, expect } from "@playwright/test";

interface StringResult {
  result: string[];
}

test("POST /api/string/manual/split", async ({ request }) => {
  const res = await request.post("/api/string/manual/split", {
    data: { str: "a,b,c", separator: "," },
  });
  const body: StringResult = await res.json();
  expect(body.result).toEqual(["a", "b", "c"]);
});
```

A working example is already in `packages/e2e/tests/health.spec.ts`.

Topics: imports, type annotations in tests.

### 7.5 · Strict mode checks

Run `npx tsc --noEmit` from the repo root to type-check without building. Fix all errors. The goal is zero type errors across the entire project.

Common things you'll need to fix:

- `req.body` is `any` by default — cast or validate it
- Array methods may return `undefined` (e.g. `find`) — handle the `undefined` case
- Numeric operations on values that might be strings — use `Number()` or type guards

Topics: `--noEmit`, `any`, type narrowing, strict null checks.

---

## Checklist

Use this to track your progress:

- [ ] **1.1** `split` endpoint + test
- [ ] **1.2** `repeat` endpoint + test
- [ ] **1.3** `trim` endpoint + test
- [ ] **1.4** `includes` endpoint + test
- [ ] **1.5** `padStart` endpoint + test
- [ ] **1.6** `slice` endpoint + test
- [ ] **1.7** `replace` endpoint + test
- [ ] **1.8** `startsWith/endsWith` endpoint + test
- [ ] **2.1** `map` endpoint + test
- [ ] **2.2** `filter` endpoint + test
- [ ] **2.3** `reduce` endpoint + test
- [ ] **2.4** `find` endpoint + test
- [ ] **2.5** `sort` endpoint + test
- [ ] **2.6** `flat` endpoint + test
- [ ] **2.7** `some/every` endpoint + test
- [ ] **2.8** `findIndex` endpoint + test
- [ ] **2.9** `reverse` endpoint + test
- [ ] **2.10** `at` endpoint + test
- [ ] **2.11** `flatMap` endpoint + test
- [ ] **3.1** `pick` endpoint + test
- [ ] **3.2** `merge` endpoint + test
- [ ] **3.3** `unique` endpoint + test
- [ ] **3.4** `intersection` endpoint + test
- [ ] **3.5** `wordFrequency` endpoint + test
- [ ] **3.6** `keys/values/entries` endpoint + test
- [ ] **3.7** `fromEntries` endpoint + test
- [ ] **3.8** `safeGet` endpoint + test
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
- [ ] **7.1** Type request/response bodies for all endpoints
- [ ] **7.2** Type condition/operation helpers as union types
- [ ] **7.3** Type the pipeline with discriminated unions
- [ ] **7.4** Rewrite Playwright tests in TypeScript
- [ ] **7.5** `tsc --noEmit` passes with zero errors
