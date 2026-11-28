# How migration tasks are done

The remaining migration work is a numbered list of tasks (P0-01 … P10-06) in the master
tracker (`reports/eon8-master-task-plan.xlsx`, kept outside git). Each task follows the same
steps so one change cannot quietly break another page.

## 1. Pick

- Take the next task in phase order whose **Depends on** tasks are done and whose **Needs**
  (a decision, an account, the VPS…) is available. One task at a time.
- A task waiting on someone is set to **Blocked** with what it needs; move on to the next one.

## 2. Check first

- Measure the live WordPress site and the new build for the thing the task is about, and write
  the evidence (numbers, screenshots) in the tracker **before** changing code.
- The live site is **read-only**: open pages like a visitor, one at a time with pauses
  (the host allows only 20 processes). Never change WordPress or cPanel without written approval.
- Useful tools:
  - `node tests/style-audit.mjs capture <url> <out.json> --slow` measures fonts, sizes,
    alignment, logo, favicon and animations on 24 page types at 375 / 768 / 1440 px;
    `node tests/style-audit.mjs compare live.json new.json out.csv` lists the differences.
  - `tests/live-urls.txt` lists every old WordPress URL.

## 3. Change

- Work on the phase branch `phase/NN-name`, cut from `merge/backend-frontend`.
- One commit per task; the message starts with the task ID, for example
  `P4-03 Service pages: heading sizes and alignment as on eon8.com`.
- Anything else found on the way becomes a new task row, not an extra change in this commit.

## 4. Prove nothing else broke

Run all of these on a local test server with a fresh database (see `docs/BACKEND.md` → Tests):

| Check | Command | Must be |
|---|---|---|
| Types | `npm run typecheck` | no errors |
| Lint | `npm run lint` | no errors |
| Build | `npm run build` | succeeds |
| Backend | `npm run test:e2e` | all pass (168 today) |
| Old URLs | `npm run test:urls -- http://127.0.0.1:4180` | 0 failures (308 URLs) |
| Screenshots | `npm run test:visual` | 0 changed, or only the pages the task meant to change |

`npm run test:visual` takes full-page screenshots of one page per page type (25 types) at 375,
768, 1024 and 1440 px with the Chrome installed on the computer and compares them with
`.visual/baseline/` (not in git). Differences are saved as images in `.visual/diff/`.

- A task that is **meant** to change how pages look: check the diff images show only the
  intended change, then save a new baseline for those pages:
  `node tests/visual.mjs baseline <label…>` (labels: home, service, blog-post…).
- A task that should **not** change how pages look must end with "0 changed".
- First time on a computer: `npm run test:visual:baseline` on the current branch before
  starting work.

## 5. Record

Update the tracker row: status **Done**, evidence (before/after numbers or screenshots) and the
commit id.

## 6. Close the phase

When every task in the phase is done or explicitly accepted:

1. Merge the phase branch into `merge/backend-frontend` (no fast-forward).
2. Run all the checks above on the merged branch.
3. Push only when Sandeep says so. Nothing goes to `main` before go-live.

## Rules that always apply

- No passwords, keys or tokens in chat, code, commits or the tracker. Server secrets live in
  `.env` on the server and in a password manager.
- `reports/` stays out of git (it contains server and security details).
- Run checks against local or staging servers only; the test tools refuse the public site
  where they would write data.
