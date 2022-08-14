# DigIO Programming Task

## Languages

- `JavaScript` / `NodeJS`

## Prerequisites

- `node (v16.16.0)`
- `npm (v8.11.0)`

## Context and requirement

The task is to parse a log file containing HTTP requests and to report on its contents. For a given log file we want to know,

- The number of unique IP addresses
- The top 3 most visited URLs
- The top 3 most active IP addresses

## Data

- The actual data can be found in the `./data` folder.
- The mock data for testing purpose can be found in the `./app/models/__tests__/mock-data` folder.
- Example:
  ```bash
  177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
  ```

## Sample results

```bash
------------------------------------------------------
The number of unique IP addresses
       11
------------------------------------------------------
The top 3 most visited URLs
       /faq/   [2 visit(s)]
       /docs/manage-websites/  [2 visit(s)]
       /intranet-analytics/    [1 visit(s)]
------------------------------------------------------
The top 3 most active IP addresses
       168.41.191.40   [4 request(s)]
       177.71.128.21   [3 request(s)]
       50.112.00.11    [3 request(s)]
------------------------------------------------------
```

## Dev files

The dev files can be found in `main.js` and the `app` folder.

## Test files

The test files can be found in `app/**/__tests__/*.js`

## Instructions

### Installation

```bash
npm install
```

### Run program

```bash
npm start
```

### Testing

Testing using `Jest` framework.

```bash
npm run test
```

Check coverage.

```bash
npm run coverage
```

### Linting and formatting

Linting provided by ESLint and Prettier.

```bash
npm run lint
```

## Dev description

- The implementation follows `Object-Oriented Programming (OOP)` method around the interconnection of three main component types: `Model`, `View`, and `Controller`. In this task, controllers are mixed with models (e.g. `app/models/log-parser.js` and `app/models/analytics.js`) due to its modest scale, and `main.js` is considered as a view. Their corresponding `unit testing` are created and implemented.
  &nbsp;
- Helper functions (e.g. `readFromFile()` and `groupArrayByKey()`) are refactored in the `app/util` folder, which encourages reuse elsewhere in the project. Their corresponding `unit testing` are created and implemented.
  &nbsp;
- The `coverage` of testing is strictly checked, and the rate is ensured at `100%` considering the small scale of this task. For larger projects, the targeted coverage rate could moderate.
  &nbsp;
- `EventEmitter` is widely used in this application to handle events (e.g. `data`, `end`, `error`, etc.). This object exposes, among many others, the `on` and `emit` methods.

  - `emit` is used to trigger an event.
  - `on` is used to add a callback function that is going to be executed when the event is triggered.
    &nbsp;

- Use of `async` and `await` enables asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains. It also enables the use of ordinary `try` and `catch` blocks around asynchronous code.
  &nbsp;
- The `REGEX` patterns for validating `log` lines are considered as `constant` and stored in `app/util/constant.js` because they should remain the same and not be allowed to modify through other `modules` / `functions` other than itself.

## Limitations and improvement

- This application is not strong at validating inputs for functions due to the nature of `JavaScript` - it does not support static/strong typing. However, `TypeScript` would be a good alternative with which type correctness can be checked at compile time.
  &nbsp;
- More `ECMAScript` features can be implemented to `NodeJS` in this application which encourages consistency between frontend and backend if it will be built in `JavaScript Framework` (e.g. `ReactJS` and `NodeJS`).
  &nbsp;
  For example,

  ```bash
  // old

  const { LogParser } = require("./app/models/log-parser.js");


  // new (w/ ECMAScript)

  import { LogParser } from "./app/models/log-parser.js";
  ```
