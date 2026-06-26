---
name: commit-convention
description: Guide the user to write a conventional commit message following the Conventional Commits spec. Use when the user wants to commit, write a commit message, or asks what commit message to use.
---

# Commit Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Format

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

## Types

| Type | When to use |
|------|-------------|
| `feat` | New feature for the user |
| `fix` | Bug fix for the user |
| `refactor` | Code change that is neither a fix nor a feature |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, dependencies |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons — no logic change |
| `perf` | Performance improvement |
| `ci` | CI/CD configuration |

## Rules

- **Summary**: imperative, lowercase, no period, max 72 chars
- **Scope**: optional, lowercase, describes the affected area (e.g. `auth`, `outfit`, `ranking`)
- **Breaking change**: add `!` after type/scope or `BREAKING CHANGE:` in footer
- **Body**: explain the *why*, not the *what* — the diff shows what changed

## Examples

```
feat(auth): add Google OAuth login

fix(ranking): correct ELO score calculation on tie

refactor(outfit): extract image attribution component

chore: upgrade Vitest to v4

feat(circle)!: rename League to Circle

BREAKING CHANGE: all API references to `league` must use `circle`
```

## Steps

1. Run `git diff --staged` to review what is staged
2. Identify the type and scope from the changes
3. Write the summary line
4. Add a body if the *why* is not obvious
5. Commit:

```bash
git commit -m "$(cat <<'EOF'
type(scope): summary

Body if needed.
EOF
)"
```
