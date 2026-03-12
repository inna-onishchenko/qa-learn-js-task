# QA JavaScript Practice

A hands-on task for QA engineers learning JavaScript fundamentals and test automation.

## What is this?

You completed [Sections 1–3 of the Udemy JS course](https://www.udemy.com/course/the-complete-javascript-course/) and know the basics: variables, types, functions, loops, arrays, objects. Now it's time to use that knowledge in a setting closer to your day-to-day work.

In this repo you will:

1. **Build API endpoints** on an Express server — each endpoint exercises a specific JS concept (string methods, array methods, destructuring, Sets, Maps, etc.).
2. **Write Playwright tests** for every endpoint you build — this is your first taste of real test automation.
3. **Build small UI features** and test them with Playwright browser tests.

The repo is structured as an **npm workspaces monorepo** — the same setup we use in our actual projects:

```
packages/
  app/    → Express server (API + static HTML)
  e2e/    → Playwright test suite
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A code editor (VS Code recommended)
- Completed Sections 1–3 of the JS course

## Getting started

```bash
# 1. Fork this repo and clone your fork
git clone <your-fork-url>
cd qa-learn-js-task

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx -w e2e playwright install chromium

# 4. Start the dev server
npm run dev
# → http://localhost:3000

# 5. Run tests (starts server automatically)
npm test
```

## How to work through the tasks

Open **[TASK.md](./TASK.md)** — it contains all the tasks organized into 6 parts:

| Part | What you build | What you practice |
|------|---------------|-------------------|
| 1. String Endpoints | `split`, `repeat`, `trim`, `includes`, `padStart` | Loops, string indexing, conditionals |
| 2. Array Endpoints | `map`, `filter`, `reduce`, `find`, `sort`, `flat` | Loops, accumulator pattern, recursion |
| 3. Objects & Data Structures | `pick`, `merge`, `unique`, `intersection`, `wordFrequency`, `safeGet` | Destructuring, spread/rest, Set, Map, `?.`, `??` |
| 4. Chaining & Composition | `pipeline`, `transform` | `.map()`, `.filter()`, `.reduce()` chaining |
| 5. Frontend | Interactive UI cards | DOM manipulation, Playwright browser tests |
| 6. Error Handling | Validate inputs, return proper errors | Defensive coding, HTTP status codes, negative testing |

### Workflow for each task

1. Read the task in TASK.md.
2. Create a route file in `packages/app/src/routes/` and register it in `packages/app/src/index.js`.
3. Create a test file in `packages/e2e/tests/`.
4. Run `npm test` — green means move on.

### Tips

- **Start with Part 1.** The tasks build on each other — Part 4 reuses operations from Part 2.
- **Read the "Implementation requirement"** notes carefully — some tasks require specific JS features (e.g. "use `Set`", "use destructuring").
- **Write tests for edge cases**, not just the happy path. Part 6 makes this explicit, but get in the habit early.
- **Commit after each task.** Small, focused commits are a good habit.

## Project structure

```
qa-learn-js-task/
├── package.json                 ← workspace root
├── TASK.md                      ← all tasks and checklist
├── README.md                    ← you are here
├── .gitignore
└── packages/
    ├── app/
    │   ├── package.json
    │   ├── src/
    │   │   ├── index.js         ← Express entry point
    │   │   └── routes/          ← your route files go here
    │   └── public/
    │       └── index.html       ← dashboard page
    └── e2e/
        ├── package.json
        ├── playwright.config.js
        └── tests/
            └── health.spec.js   ← example test
```

## Useful links

- [Express — routing](https://expressjs.com/en/guide/routing.html)
- [Playwright — API testing](https://playwright.dev/docs/api-testing)
- [Playwright — writing tests](https://playwright.dev/docs/writing-tests)
- [MDN — JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
