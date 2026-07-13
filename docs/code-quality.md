# Code Quality & Pre-commit Architecture

This project enforces quality with two lanes: a fast **gate** on every commit and
slower checks before code is shared.

## Tooling

| Tool                                                 | Role                                                 |
| ---------------------------------------------------- | ---------------------------------------------------- |
| ESLint 9 (`next/core-web-vitals`, `next/typescript`) | Static analysis / lint rules                         |
| `eslint-plugin-simple-import-sort`                   | Deterministic import/export ordering (auto-fix)      |
| `eslint-plugin-unused-imports`                       | Strips dead imports, flags unused vars (`^_` escape) |
| `eslint-config-prettier`                             | Disables ESLint rules that conflict with Prettier    |
| Prettier 3 + `prettier-plugin-tailwindcss`           | Formatting + Tailwind class sorting                  |
| TypeScript (`tsc --noEmit`)                          | Type checking                                        |
| Husky 9                                              | Git hook runner                                      |
| lint-staged 16                                       | Runs linters on staged files only                    |
| commitlint + config-conventional                     | Enforces Conventional Commits                        |

## Hook lanes

| Hook         | Runs                                                                       | Why                                                                           |
| ------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged` → Prettier + `eslint --max-warnings=0 --fix` on staged files | Fast, deterministic gate. Staged files must be warning-clean.                 |
| `commit-msg` | `commitlint`                                                               | Rejects messages that break `type: subject` (e.g. `feat:`, `fix:`, `chore:`). |
| `pre-push`   | `pnpm typecheck`                                                           | Full `tsc` is too slow for every commit; catch type errors before sharing.    |

## Scripts

| Command             | Does                                                   |
| ------------------- | ------------------------------------------------------ |
| `pnpm lint`         | Lint the repo                                          |
| `pnpm lint:fix`     | Lint and auto-fix                                      |
| `pnpm typecheck`    | `tsc --noEmit`                                         |
| `pnpm format`       | Format the repo with Prettier                          |
| `pnpm format:check` | Verify formatting without writing                      |
| `pnpm check`        | `format:check && lint && typecheck` — full local suite |

## Conventional Commit types

`feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
`ci`, `revert`. Format: `type(optional-scope): subject`.

## First-time setup

```bash
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional \
  eslint-config-prettier eslint-plugin-simple-import-sort eslint-plugin-unused-imports
```

`pnpm install` runs the `prepare` script (`husky`), which activates the hooks in
`.husky/`. To bypass a hook in an emergency use `git commit --no-verify` (avoid
this — fix the underlying issue instead).
