# Code Quality & Pre-commit Architecture (Template)

Portable version of the code-quality setup. Replace the `{{PLACEHOLDERS}}` when
dropping into a new project. Project-specific values live only in the marked
lines; everything else is reusable as-is.

> Placeholders: `{{PKG_MANAGER}}` (e.g. pnpm / npm / yarn),
> `{{ESLINT_EXTENDS}}` (e.g. `next/core-web-vitals`, `next/typescript`),
> `{{INSTALL_DEPS}}` (the dev-dependency list for this project).

This project enforces quality with two lanes: a fast **gate** on every commit and
slower checks before code is shared.

## Tooling

| Tool                               | Role                                                 |
| ---------------------------------- | ---------------------------------------------------- |
| ESLint 9 ({{ESLINT_EXTENDS}})      | Static analysis / lint rules                         |
| `eslint-plugin-simple-import-sort` | Deterministic import/export ordering (auto-fix)      |
| `eslint-plugin-unused-imports`     | Strips dead imports, flags unused vars (`^_` escape) |
| `eslint-config-prettier`           | Disables ESLint rules that conflict with Prettier    |
| Prettier 3 (+ framework plugins)   | Formatting                                           |
| TypeScript (`tsc --noEmit`)        | Type checking                                        |
| Husky 9                            | Git hook runner                                      |
| lint-staged 16                     | Runs linters on staged files only                    |
| commitlint + config-conventional   | Enforces Conventional Commits                        |

## Hook lanes

| Hook         | Runs                                                                       | Why                                                                           |
| ------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged` → Prettier + `eslint --max-warnings=0 --fix` on staged files | Fast, deterministic gate. Staged files must be warning-clean.                 |
| `commit-msg` | `commitlint`                                                               | Rejects messages that break `type: subject` (e.g. `feat:`, `fix:`, `chore:`). |
| `pre-push`   | `{{PKG_MANAGER}} typecheck`                                                | Full `tsc` is too slow for every commit; catch type errors before sharing.    |

## Scripts

| Command                        | Does                                                   |
| ------------------------------ | ------------------------------------------------------ |
| `{{PKG_MANAGER}} lint`         | Lint the repo                                          |
| `{{PKG_MANAGER}} lint:fix`     | Lint and auto-fix                                      |
| `{{PKG_MANAGER}} typecheck`    | `tsc --noEmit`                                         |
| `{{PKG_MANAGER}} format`       | Format the repo with Prettier                          |
| `{{PKG_MANAGER}} format:check` | Verify formatting without writing                      |
| `{{PKG_MANAGER}} check`        | `format:check && lint && typecheck` — full local suite |

## Conventional Commit types

`feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
`ci`, `revert`. Format: `type(optional-scope): subject`.

## First-time setup

```bash
{{INSTALL_DEPS}}
```

Installing runs the `prepare` script (`husky`), which activates the hooks in
`.husky/`. To bypass a hook in an emergency use `git commit --no-verify` (avoid
this — fix the underlying issue instead).
